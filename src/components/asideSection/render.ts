import type { AsideOptions } from '../../interfaces/asideOptions';
import styles from './style.css?inline';

export class Render {
    private root: ShadowRoot;
    private type: string;
    private title: string
    private options: AsideOptions[];

    constructor(root: ShadowRoot, title: string, type: string, options: AsideOptions[]) {
        this.root = root;
        this.type = type;
        this.title = title;
        this.options = options;
    }

    render(){
        const htmlString = `
            <section>
                <h3>${this.title}</h3>
                ${this.options.map(({ label, checked }) => `<label><input type="${this.type}" ${checked ? 'checked' : ''} /> ${label}</label>`).join('')}
            </section>
        `;
        // Parseamos la cadena a un DocumentFragment (conjunto de nodos DOM)
        const fragmento: DocumentFragment = document.createRange().createContextualFragment(htmlString);

        // Reemplazamos todo el contenido del contenedor por los nodos del fragmento
        this.root.replaceChildren(fragmento);

        const style: HTMLStyleElement = document.createElement('style');
        style.textContent = styles;
        this.root.appendChild(style);

        return this.root;
    }
}