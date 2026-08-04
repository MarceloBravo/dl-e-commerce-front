import { apiClient } from '../api/apiClient.js';
import type { CategoriesResponseApi } from '../interfaces/categoriesResponseApi.js';
import type { ProductResponseApi } from '../interfaces/productResponseApi.js';
import type { ResponseInterface } from '../interfaces/responseInterface.js';

const URI = '/products';

export class ProductService {

  static getAll = async ()  =>{
    const response: ProductResponseApi | CategoriesResponseApi = await apiClient(URI);
    if (!response.ok) {
      return Promise.reject(`HTTP error! status:` + response.status);
    }
    return response;
  }

  static getById = async (id: number) => {
    const response: ProductResponseApi | CategoriesResponseApi = await apiClient(`${URI}/${id}`);
    if (!response.ok) {
      return Promise.reject(`HTTP error! status: ${response.status}`);
    }
    return response;
  }
}