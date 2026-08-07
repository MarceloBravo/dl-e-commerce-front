import { ProductService } from '../../services/productService';
import { categoriesService } from '../../services/categoriesService';
import type { ResponseInterface } from '../../interfaces/responseInterface';
import { Template } from './template';
import type { ProductResponseApi } from '../../interfaces/productResponseApi';


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
        const products: ResponseInterface = await ProductService.getAll(limit, page);
        const categories: ResponseInterface = await categoriesService.getAll();

        const optionsCategories: string = !Array.isArray(categories.data) ? `{"label": "${categories.data}", "type": "checkbox", "checked": false}` : categories.data.map((category: any) => `{"label":"${category.slug}","type":"checkbox","checked":false}`).join(',') ?? [];
        const productsArray: string | ProductResponseApi[] = !Array.isArray(products.data) ? products.data : products.data ?? [];
        //const productsPages: number = (!Array.isArray(productsArray) || productsArray.length === 0) ? 1 : products.data.total;
        
        console.log('Products:', products);
        console.log('Array Products:', productsArray);
        return {optionsCategories, productsArray};
    }

    /**
     * Se ejecuta cuando el componente se inserta en el DOM.
     */
    connectedCallback() {
        this.classList.add('contact-page');
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

        const {optionsCategories, productsArray} = await this.loadData(10, page);
        const template = new Template(this, title, optionsCategories, productsArray, page);
        template.render();


        const pagination = this.querySelector('pagination-nav');
        pagination?.addEventListener('page-change', (event) => {
            const { page } = (event as CustomEvent).detail;
            this.render(page);
        });
    }
}

if (!customElements.get('home-page')) {
    customElements.define('home-page', HomePage);
}