import { apiClient } from '../api/apiClient.js';
import type { ProductResponseApi } from '../interfaces/productResponseApi.js';
import type { ResponseInterface } from '../interfaces/responseInterface.js';
import { handleError } from '../utils/errorHandler.js';

const URI = '/products';

export class ProductService {

  static getAll = async (limit?: number, page?: number): Promise<ResponseInterface<ProductResponseApi>> => {
    try {
      let strURI: string = URI;
      if(limit && page){
        const skip: number = (page - 1) * limit;
        strURI +=  `?limit=${limit}&skip=${skip}`;
      }
      return await apiClient<ProductResponseApi>(strURI);
    } catch (error) {
      return handleError<ProductResponseApi>(error, 'No se pudieron cargar los productos');
    }
  };

  static getById = async (id: number): Promise<ResponseInterface<ProductResponseApi>> => {
    try {
      return await apiClient<ProductResponseApi>(`${URI}/${id}`);
    } catch (error) {
      return handleError<ProductResponseApi>(error, `No se pudo cargar el producto con id ${id}`);
    }
  };
}
