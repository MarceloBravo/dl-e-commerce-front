import type { Links } from '../../interfaces/links';
import styles from './style.css?inline';

export class Render {
    root: ShadowRoot;
    title: string;
    slogan: string;
    items: Links[];

    constructor(root: ShadowRoot, title: string, slogan: string, items: Links[]) {
        this.root = root;
        this.title = title;
        this.slogan = slogan;
        this.items = items;
    }

    render(){
        
        const htmlString: string = `
                <header class="topbar">
                    <div class="brand-block">
                    <span class="brand-mark">🛍️</span>
                    <div>
                        <h1>${this.title}</h1>
                        <p>${this.slogan}</p>
                    </div>
                    </div>
                    <nav class="top-nav">
                    ${this.items.map(({ title, href }) => `<a href="${href}" data-link>${title}</a>`).join('')}
                    </nav>
                    <button class="cart-btn" type="button" aria-label="Carrito">🛒 2</button>
                </header>
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