import styles from './style.css?inline';

export class Template{
    private host: HTMLElement;

    constructor(host: HTMLElement){
        this.host = host;
    }

    render(){
        const htmlString: string = `
            <div class="page-404__card">
                <div class="page-404__content">
                    <h2 class="page-404__code">404</h2>
                    <h3 class="page-404__heading">¡Vaya! La página que buscas no existe.</h3>
                    <p class="page-404__description">Parece que el enlace está roto o que la página ha sido movida.</p>
                </div>
                <a id="btn-back" class="page-404__action" href="/home" data-link>
                    Volver al Inicio
                </a>
            </div>
        `;

        const fragment = document.createRange().createContextualFragment(htmlString);
        const style = document.createElement('style');
        style.textContent = styles;

        this.host.replaceChildren(style, fragment);

        return this.host;
    }
}