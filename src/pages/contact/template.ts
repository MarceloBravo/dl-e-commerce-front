import styles from './style.css?inline';

export class Template{
    private host: HTMLElement;

    constructor(host: HTMLElement){
        this.host = host;
    }

    render(){
        const htmlString: string = `<div class="contact-page__container">
            <h2>Contacto</h2>
            <form>
                <div>
                    <label for="input-name">Nombre</label>
                    <input type="text" id="input-name" name="name" maxlength="20" class="contact-page__input"/>
                </div>
                <div>
                    <label for="input-email">Email</label>
                    <input type="email" id="input-email" name="email" maxlength="150" class="contact-page__input"/>
                </div>
                <div>
                    <label for="input-phone">Teléfono de concato</label>
                    <input type="text" id="input-phone" name="phone" maxlength="20" class="contact-page__input"/>
                </div>
                <div>
                    <label for="input-message">Mensaje</label>
                    <textarea id="input-message" name="message" class="contact-page__textarea"></textarea>
                </div>
                <button type="submit" class="btn btn-submit contact-page__submit">Enviar</button>
            </form>
        </div>`;

        const fragment = document.createRange().createContextualFragment(htmlString);
        this.host.replaceChildren(fragment);

        const style = document.createElement('style');
        style.textContent = styles;
        this.host.appendChild(style);

        return this.host;
    }
}