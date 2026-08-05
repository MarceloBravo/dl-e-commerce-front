import { Render } from './render';

export class Pagination extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['total-pages', 'active-page'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(_attrName: string, oldValue: string | null, newValue: string | null) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const root: ShadowRoot | null = this.shadowRoot;

        if (!root) {
            return;
        }

        const totalPages = Number(this.getAttribute('total-pages')) || 0;
        const activePage = Number(this.getAttribute('active-page')) || 1;

        const render = new Render(root, totalPages, activePage);
        render.render();
    }
}

if (!customElements.get('pagination-nav')) {
    customElements.define('pagination-nav', Pagination);
}
