import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn(98210, "API Error:", {
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });

    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.warn("Unauthorized - perhaps a token expired or is invalid.");
          break;
        case 403:
          console.warn("Forbidden - you do not have the right permissions.");
          break;
        case 500:
          console.warn("Server error - something went wrong on the server.");
          break;
        default:
          console.warn(`Unhandled status code: ${error.response.status}`);
      }
    } else {
      console.warn("No response from server", JSON.stringify(error));
    }

    return Promise.reject(error);
  }
);

export default API;
