
export const API_BACKEND_URL =
  process.env.API_BACKEND_URL || "http://localhost:3000";

export enum METHODS {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

export const API_ROUTES = {
  SHORTEN: "shorten",
  INFO: "info",
  DELETE: "delete",
  ALL: "all",
} as const;

export const ENDPOINTS = {
  BACKEND: {
    SHORTEN: `${API_BACKEND_URL}/${API_ROUTES.SHORTEN}/`,
    INFO: (path: string) => `${API_BACKEND_URL}/${API_ROUTES.INFO}/${path}`,
    DELETE: (path: string) => `${API_BACKEND_URL}/${API_ROUTES.DELETE}/${path}`,
    ALL: (page: number) => `${API_BACKEND_URL}/${API_ROUTES.ALL}/${page}`,
  },
} as const;