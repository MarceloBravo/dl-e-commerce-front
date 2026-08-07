import { Template } from "./template";

export class Page404 extends HTMLElement {

    constructor(){
        super();
    }

    static get observedAttributes() {
        return [
            'title' // Atributo para el título de la página
        ];
    }

    /**
     * Se ejecuta cuando el componente se inserta en el DOM.
     */
    connectedCallback() {
        this.classList.add('page-404');
        this.render();
    }

    configListeners(){
        const button = this.querySelector('#btn-back');
        if (button instanceof HTMLElement) {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                window.history.pushState({}, '', '/home');
                window.dispatchEvent(new PopStateEvent('popstate'));
            });
        }
    }

    render(){
        (new Template(this)).render();
        this.configListeners();
    }

}

if (!customElements.get('page-404')) {
    customElements.define('page-404', Page404);
}