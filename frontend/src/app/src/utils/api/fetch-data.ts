import axios, { Method } from "axios";

import { BackendTypes } from "../../types/data.interface";

export const fetchData = async <T extends BackendTypes | BackendTypes[]>(
  url: string,
  method: Method,
  params?: Record<string, string | number>,
  data?: unknown
): Promise<T> => {
  try {
    const response = await axios<T>({ method: method, url: url, params, data });

    return response.data;
  } catch (error) {
    console.error(`Responde error ${error}`);
    throw error;
  }
};