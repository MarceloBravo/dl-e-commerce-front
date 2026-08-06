import { ProductService } from '../../services/productService';
import { categoriesService } from '../../services/categoriesService';
import type { ResponseInterface } from '../../interfaces/responseInterface';

import { Template } from './template';


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

    loadData = async () => {
        const products: ResponseInterface = await ProductService.getAll();
        const categories: ResponseInterface = await categoriesService.getAll();
        const optionsCategories = categories.data.map((category: any) => `{"label":"${category.slug}","type":"checkbox","checked":false}`).join(',') ?? [];
        const productsArray = products.data ?? [];
        
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
    render = async () => {
        const title: string = this.getAttribute('title') || 'Home';

        this.replaceChildren();
        const spinner = document.createElement('spinner-component');
        this.appendChild(spinner);

        const {optionsCategories, productsArray} = await this.loadData();
        const template = new Template(this, title, optionsCategories, productsArray);
        template.render();
    }
}

if (!customElements.get('home-page')) {
    customElements.define('home-page', HomePage);
}