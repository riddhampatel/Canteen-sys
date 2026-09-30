const defaultUrl = import.meta.env.PROD
  ? "https://canteen-backend-inss.onrender.com"
  : "http://localhost:5000";

const rawApiUrl = import.meta.env.VITE_API_URL || defaultUrl;
const cleanApiUrl = rawApiUrl.replace(/\/+$/, "");

export const API_BASE_URL = cleanApiUrl.endsWith("/api")
  ? cleanApiUrl
  : `${cleanApiUrl}/api`;
