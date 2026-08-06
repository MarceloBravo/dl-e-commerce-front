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

        const { total, active } = this.normalizePagesNumbers(totalPages, activePage);
        const pageNumbers = this.getPageNumbers(total, active);
        const firstDisabled = active === 1 || total === 0;
        const lastDisabled = active === total || total === 0;
        const lastPage = total > 0 ? total : 1;

        const render = new Render(root, pageNumbers, active, firstDisabled, lastDisabled, lastPage);
        render.render();

        this.attachListeners(root);
    }

    private normalizePagesNumbers(totalPages: number, activePage: number) {
        const total = Math.max(0, Math.floor(totalPages));
        let active = Math.max(1, Math.floor(activePage));

        if (total > 0) {
            active = Math.min(active, total);
        } else {
            active = 1;
        }

        return { total, active };
    }

    private getPageNumbers(total: number, active: number) {
        if (total <= 5) {
            return Array.from({ length: total }, (_, index) => index + 1);
        }

        const maxStart = total - 4;
        let start = active - 2;

        if (start < 1) {
            start = 1;
        }

        if (start > maxStart) {
            start = maxStart;
        }

        return Array.from({ length: 5 }, (_, index) => start + index);
    }

    private attachListeners(root: ShadowRoot) {
        const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('button[data-page]'));

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const targetPage = Number(button.dataset.page);

                if (!Number.isNaN(targetPage)) {
                    this.setAttribute('active-page', String(targetPage));

                    const event = new CustomEvent('page-change', {
                        detail: { page: targetPage },
                        bubbles: true,
                        composed: true
                    });

                    this.dispatchEvent(event);
                }
            });
        });

        // Also handle keyboard or other interactions in the future if needed
    }
}

if (!customElements.get('pagination-nav')) {
    customElements.define('pagination-nav', Pagination);
}
