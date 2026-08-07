import { ProductService } from '../../services/productService';
import { categoriesService } from '../../services/categoriesService';
import type { ResponseInterface } from '../../interfaces/responseInterface';
import type { ProductResponseApi } from '../../interfaces/productResponseApi';
import type { CategoriesResponseApi } from '../../interfaces/categoriesResponseApi';
import { Template } from './template';
import { LoadStatus } from '../../enum/loadStatusEnum';


export class HomePage extends HTMLElement {

    constructor() {
        super();
    }

    /**
     * Atributos observados para reaccionar a cambios en el DOM.
     */
    static get observedAttributes() {
        return [
            'title' // Atributo para el título de la página
        ];
    }

    loadData = async (limit: number = 10, page: number = 1) => {
        const products: ResponseInterface<ProductResponseApi> = await ProductService.getAll(limit, page);
        const categories: ResponseInterface<CategoriesResponseApi['data']> = await categoriesService.getAll();

        const optionsCategories: string = categories.ok
            ? categories.data.map((category) => `{"label":"${category.name}","type":"checkbox","checked":false}`).join(',')
            : `{"label": "No fue posible cargar las categorías", "type": "checkbox", "checked": false}`;

        const productsData: ProductResponseApi | string = products.ok ? products.data : products.data;

        return { optionsCategories, productsData };
    }

    /**
     * Se ejecuta cuando el componente se inserta en el DOM.
     */
    connectedCallback() {
        this.render();
    }

    /**
     * Re-renderiza el componente cuando cambian sus atributos observados.
     */
    attributeChangedCallback(_attrName: string, oldValue: string | null, newValue: string | null) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    /**
     * Genera el HTML y aplica el CSS del componente dentro de su shadow DOM.
     */
    render = async (page: number = 1) => {
        const title: string = this.getAttribute('title') || 'Home';

        this.replaceChildren();
        const spinner = document.createElement('spinner-component');
        this.appendChild(spinner);

        const { optionsCategories, productsData } = await this.loadData(10, page);
        const loadStatus = typeof productsData === 'string' ? LoadStatus.ERROR : LoadStatus.SUCCESS;

        const template = new Template(this, title, optionsCategories, productsData, page, loadStatus);
        template.render();

        const pagination = this.querySelector('pagination-nav');
        pagination?.addEventListener('page-change', (event) => {
            const { page: nextPage } = (event as CustomEvent<{ page: number }>).detail;
            this.render(nextPage);
        });
    }
}

if (!customElements.get('home-page')) {
    customElements.define('home-page', HomePage);
}
