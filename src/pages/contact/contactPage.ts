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

    configListeners(){
        const button = document.querySelector('#btn-send');
        if(button){
            button.addEventListener('click', (event) => {
                event.preventDefault();
                if(this.validateData()){
                    console.log('Formulario enviado');
                    alert('Formulario enviado');
                }
            });
        }
    }

    validateData(): boolean{
        const inputName: HTMLInputElement | null = document.getElementById("input-name");
        const divNameError: HTMLElement | null = document.getElementById("input-name_error");
        let errors: number = 0;
        if(inputName && divNameError){
            let msgError = inputName.value.trim().length < 3 ? "El nombre debe tener almenos 3 carácteres" : '';
            divNameError.innerHTML = msgError;
            errors += msgError.length > 0 ? 1 : 0;
        }

        const inputEmail: HTMLInputElement | null = document.getElementById("input-email");
        const divEmailError: HTMLElement | null = document.getElementById("input-email_error");
        if(inputEmail && divEmailError){
            let msgError = inputEmail.value.trim().length < 3 ? "El email es obligatorio" : '';
            divEmailError.innerHTML = msgError;
            errors += msgError.length > 0 ? 1 : 0;
        }


        return errors === 0;
    }

    render(){
        (new Template(this)).render();
        this.configListeners();
    }

}

if (!customElements.get('contact-page')) {
    customElements.define('contact-page', ContactPage);
}