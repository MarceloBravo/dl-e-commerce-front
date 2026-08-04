import type { CategoriesResponseApi } from "../interfaces/categoriesResponseApi";
import type { ProductResponseApi } from "../interfaces/productResponseApi";
import type { ResponseInterface } from "../interfaces/responseInterface";

const BASE_URL = 'https://dummyjson.com';


export const apiClient = async (endpoint: string, options: RequestInit = {}): Promise<ResponseInterface> => {
  try{
      const url = `${BASE_URL}${endpoint}`;

      const response = await fetch(`${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const ok = response.ok;
    const status = response.status;
    const resp = await response.json();
    resp.data = resp;
    resp.ok = ok;
    resp.status = status;
    return resp;
  } catch (error) {
    console.error('Error in apiClient:', error);
    return Promise.reject(
      { 
        data: error instanceof Error ? error.message : 'Unknown error', 
        ok: false, 
        status: error.status || 500 
      }
    );
  }
}