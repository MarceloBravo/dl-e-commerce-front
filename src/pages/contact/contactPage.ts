import { Template } from './template';

/***
 * Página de contacto no implementa Ligth DOM y no ShadowDOM
*/
export class ContactPage extends HTMLElement{

    constructor(){
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

    /**
     * Se ejecuta cuando el componente se inserta en el DOM.
     */
    connectedCallback() {
        this.classList.add('contact-page');
        this.render();
    }

    render(){
        (new Template(this)).render();
    }

}

if (!customElements.get('contact-page')) {
    customElements.define('contact-page', ContactPage);
}