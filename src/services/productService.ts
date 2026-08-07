import { apiClient } from '../api/apiClient.js';
import type { ResponseInterface } from '../interfaces/responseInterface.js';
import { handleError } from '../utils/errorHandler.js';

const URI = '/products';

export class ProductService {

  static getAll = async (limit?: number, page?: number): Promise<ResponseInterface> => {
    try {
      let strURI: string = URI;
      if(limit && page){
        const skip: number = (page - 1) * limit;
        strURI +=  `?limit=${limit}&skip=${skip}`;
      }
      return await apiClient(strURI);
    } catch (error) {
      return handleError(error, 'No se pudieron cargar los productos');
    }
  };

  static getById = async (id: number): Promise<ResponseInterface> => {
    try {
      return await apiClient(`${URI}/${id}`);
    } catch (error) {
      return handleError(error, `No se pudo cargar el producto con id ${id}`);
    }
  };
}