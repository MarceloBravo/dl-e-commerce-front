import styles from './style.css?inline';

export class Render {
    private root: ShadowRoot;
    private label: string;
    private created: string;
    private phone: string;
    private email: string;

    constructor(root: ShadowRoot, label: string, created: string, phone: string, email: string) {
        this.root = root;
        this.label = label;
        this.created = created;
        this.phone = phone;
        this.email = email;
    }

    render(){
        const htmlString = `
            <footer class="site-footer">
                <div>
                    <h2>${this.label}</h2>
                    <p>Creado el ${this.created}</p>
                </div>
                <div>
                    <p>📞 ${this.phone}</p>
                    <p>✉️ ${this.email}</p>
                </div>
            </footer>
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