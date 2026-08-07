import { apiClient } from '../api/apiClient.js';
import type { CategoriesResponseApi } from '../interfaces/categoriesResponseApi.js';
import type { ResponseInterface } from '../interfaces/responseInterface.js';
import { handleError } from '../utils/errorHandler.js';

const URI = '/products/categories';

export class categoriesService {
    static getAll = async (): Promise<ResponseInterface<CategoriesResponseApi['data']>> => {
        try{
            return await apiClient<CategoriesResponseApi['data']>(URI);
        } catch (error) {
           return handleError<CategoriesResponseApi['data']>(error, 'No se pudieron cargar las categorías');
        }
    }
}
