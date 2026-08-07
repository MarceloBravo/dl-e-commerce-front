import { apiClient } from '../api/apiClient.js';
import type { CategoriesResponseApi } from '../interfaces/categoriesResponseApi.js';
import type { ProductResponseApi } from '../interfaces/productResponseApi.js';
import type { ResponseInterface } from '../interfaces/responseInterface.js';
import { handleError } from '../utils/errorHandler.js';

const URI = '/products/categories';

export class categoriesService {
    static getAll = async (): Promise<ResponseInterface> => {
        try{
            return await apiClient(URI);
        } catch (error) {
           return handleError(error, 'No se pudieron cargar las categorías');
        }
    }
}