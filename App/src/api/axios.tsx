import  axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = "http://localhost:8000";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // sends refreshToken cookie automatically
    headers: {
        "Content-Type": "application/json"
    }
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve(token as string);
    });
    failedQueue = [];
};

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // network error / server down — nothing to retry
        if (!error.response) {
            return Promise.reject(error);
        }

        const isRefreshCall = originalRequest.url?.includes("/auth/refresh-token");

        if (error.response.status === 401 && !originalRequest._retry && !isRefreshCall) {
            if (isRefreshing) {
                // another request already triggered refresh — wait in line
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((newToken) => {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // plain axios, not axiosInstance — refresh is public, no expired
                // access token should be attached, only the httpOnly cookie matters
                const { data } = await axios.post(
                    `${BASE_URL}/api/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = data.accessToken;
                localStorage.setItem("accessToken", newAccessToken);
                axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);