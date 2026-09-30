const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const cleanApiUrl = rawApiUrl.replace(/\/+$/, "");

export const API_BASE_URL = cleanApiUrl.endsWith("/api")
  ? cleanApiUrl
  : `${cleanApiUrl}/api`;
