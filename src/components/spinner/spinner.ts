import styles from './style.css?inline';

export class Spinner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const shadow = this.shadowRoot;

        if (!shadow) {
            return;
        }

        shadow.innerHTML = `
            <style>${styles}</style>
            <div class="spinner-card" role="status" aria-live="polite">
                <div class="spinner-ring"></div>
                <span class="spinner-label">Cargando...</span>
            </div>
        `;
    }
}

if (!customElements.get('spinner-component')) {
    customElements.define('spinner-component', Spinner);
}
