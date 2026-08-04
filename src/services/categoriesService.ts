import { apiClient } from '../api/apiClient.js';
import type { CategoriesResponseApi } from '../interfaces/categoriesResponseApi.js';
import type { ProductResponseApi } from '../interfaces/productResponseApi.js';
import type { ResponseInterface } from '../interfaces/responseInterface.js';

const URI = '/products/categories';

export class categoriesService {

    static getAll = async (): Promise<ResponseInterface> => {
        const response: ResponseInterface = await apiClient(URI);
        if (!response.ok) {
            return Promise.reject(`HTTP error! status:` + response.status);
        }
        return response;
    }
}