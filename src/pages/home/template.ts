import '../../components';

import styles from './style.css?inline';

export class Template{
    private root: HTMLElement; 
    private title: string = 'Tienda on-line';
    private optionsCategories: string;
    private productsArray: any[] | string;
    private activaPage: number = 1;
    private totalPages: number;
    

    constructor(root: HTMLElement, title: string, optionsCategories: string, productsArray: any[] | string, activaPage: number){
        this.root = root;
        this.title = title;
        this.optionsCategories = optionsCategories;
        this.productsArray = productsArray;
        this.activaPage = activaPage;
        this.totalPages = productsArray?.total ? Math.round(productsArray?.total / productsArray?.limit) : 1;
    }

    render(){
        const htmlString: string = `
            <div class="home-page-shell">

                <main class="home-content-layout">
                    <aside class="home-filters-panel">
                        <h2>Filtros</h2>
                        <aside-section 
                            title="Categorias"
                            type="checkbox" 
                            options='[${this.optionsCategories}]'>
                        </aside-section>

                        <aside-section 
                            title="marcas"
                            type="checkbox" 
                            options='[{"label":"Samsung","type":"checkbox","checked":true},{"label":"Apple","type":"checkbox"},{"label":"Sony","type":"checkbox"}]'>
                        </aside-section>

                        <aside-section 
                            title="precios"
                            type="radio" 
                            options='[{"label":"Menor a $50.000","type":"radio","checked":true},{"label":"$50.000 - $100.000","type":"radio"},{"label":"Más de $100.000","type":"radio"}]'>
                        </aside-section>
                    </aside>
                    

                    <section class="home-products-section">
                        <div class="home-section-title">
                            <h2>Productos destacados</h2>
                            <p>Descubre las mejores opciones del día</p>
                        </div>
                        
                        <div class="home-products-grid">
                        ${Array.isArray(this.productsArray?.products) ? 
                            this.productsArray.products.map((product: any) => `
                            <product-card
                                img="${product.thumbnail}"
                                title="${product.title}"
                                description="${product.description}"
                                price="${product.price}"
                            ></product-card>
                            `).join('') : this.productsArray }
                        </div>

                        <pagination-nav total-pages="${this.totalPages}" active-page="${this.activaPage}"></pagination-nav> 
                    </section>
                </main>

                <footer-section 
                    title="${this.title}"
                    created="03/08/2026"
                    phone="+56 9 1234 5678"
                    email="contacto@tiendaonline.cl"/>
            </div>
        `;

        const fragment = document.createRange().createContextualFragment(htmlString);
        this.root.replaceChildren(fragment);

        const style = document.createElement('style');
        style.textContent = styles;
        this.root.appendChild(style);

        return this.root;
    }
}