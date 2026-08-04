import type { Links } from '../../interfaces/links';
import { Render } from './render';

/**
 * Componente personalizado para la barra de navegación del e-commerce.
 *
 * Acepta atributos como `ShopName` y `slogan` para personalizar el contenido.
 */
export class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    /**
     * Atributos observados para reaccionar a cambios en el DOM.
     */
    static get observedAttributes() {
        return [
            'ShopName', // Atributo para el nombre de la tienda
            'shop-name', // Atributo alternativo para el nombre de la tienda
            'slogan', // Atributo para el eslogan de la tienda
            'links' // Atributo para los enlaces de la barra de navegación Ej.: [{"title":"Inicio","href":"#"}, {"title":"Ofertas","href":"#"}]
        ];
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
    render() {
        const root: ShadowRoot | null = this.shadowRoot;

        if (!root) {
            return;
        }
        
        const title: string = this.getAttribute('ShopName') || this.getAttribute('shop-name') || 'Tienda on-line';
        const slogan: string = this.getAttribute('slogan') || 'Encuentra lo mejor para tu hogar';
        const linksAttr: string | null = this.getAttribute('links');
        const items: Links[] = linksAttr ? JSON.parse(linksAttr) as Links[] : [
            { title: 'Inicio', href: '#' },
            { title: 'Ofertas', href: '#' },
            { title: 'Contacto', href: '#' }
        ];
        
        const render = new Render(root, title, slogan, items);
        render.render();
    }
}

if (!customElements.get('nav-bar')) {
    customElements.define('nav-bar', NavBar);
}