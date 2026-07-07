import axios from "axios";

export type AppError = {
  error: string;
  status?: number;
  details?: string[];
};

type ErrorPayload = {
  error?: string;
  message?: string;
  status?: number;
  details?: string | string[];
};

const toDetailsArray = (details?: string | string[]): string[] | undefined => {
  if (!details) return undefined;
  return Array.isArray(details) ? details : [details];
};

export const normalizeError = (error: unknown): AppError => {
  const fallback: AppError = {
    error: "Something went wrong.",
  };

  // Axios / API errors
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ErrorPayload | undefined;

    return {
      error:
        data?.message ||
        data?.error ||
        error.message ||
        "Request failed.",
      status: data?.status ?? error.response?.status,
      details: toDetailsArray(data?.details),
    };
  }

  // Native JS Error
  if (error instanceof Error) {
    return {
      error: error.message || (error as any)?.error || "Internal error.",
    };
  }

  // Plain object (rejectWithValue payload / custom thrown object)
  if (typeof error === "object" && error !== null) {
    const e = error as ErrorPayload;

    if ("error" in e || "message" in e || "details" in e || "status" in e) {
      return {
        error: e.message || e.error || "Something went wrong.",
        status: e.status,
        details: toDetailsArray(e.details),
      };
    }
  }

  // String error
  if (typeof error === "string") {
    return { error };
  }

  return fallback;
};