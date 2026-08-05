import styles from './style.css?inline';

export class Render {
    private root: ShadowRoot;
    private img: string;
    private title: string;
    private description: string;
    private price: string;

    constructor(root: ShadowRoot, img: string, title: string, description: string, price: string) {
        this.root = root;
        this.img = img;
        this.title = title;
        this.description = description;
        this.price = price;
    }

    render(){
         const htmlString = `
            <article class="product-card">
                <img src="${this.img}" alt="${this.title}">
                <h3>${this.title}</h3>
                <p>${this.description}</p>
                <span>$${this.price}</span>
            </article>
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