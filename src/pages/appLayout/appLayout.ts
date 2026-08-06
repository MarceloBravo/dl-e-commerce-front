// src/components/AppLayout.ts
import '../../components';

export class AppLayout extends HTMLElement {    
  connectedCallback() {
    this.innerHTML = `
        <nav-bar 
            ShopName="${this.title}" 
            slogan="Encuentra lo mejor para tu hogar"
            links='[{"title":"Inicio","href":"home"},{"title":"Ofertas","href":"#"},{"title":"Contacto","href":"contact"}]'
        ></nav-bar>
        <div id="router-outlet"></div>
    `;
  }
}
customElements.define('app-layout', AppLayout);