export const errorHandler = (error) => {

  const apiError = error?.response?.data;

  let message = "Something went wrong";

  if (apiError) {

    // Validation errors
    if (Array.isArray(apiError.errors) && apiError.errors.length) {

      message = apiError.errors
        .map((e) => `${e.message}\n`)
        .join(", ");

    } else {

      message = apiError.message || message;

    }

  } else {

    // Network error
    message = "Network error. Please check your connection.";

  };

  return message;
};