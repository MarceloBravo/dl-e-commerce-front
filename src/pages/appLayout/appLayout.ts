// src/components/AppLayout.ts
import '../../components/navBar';

/**
 * Layout principal que encargado de cargar dinámicamente las páhginas de la aplicación en el elememnto router-outlet
 * Contiene el el header con la barra de navegación superior estática, la cual es única para toda la aplicación
 */
export class AppLayout extends HTMLElement {    
  connectedCallback() {
    this.innerHTML = `
        <nav-bar 
            ShopName="${this.title}" 
            slogan="Encuentra lo mejor para tu hogar"
            links='[{"title":"Inicio","href":"home"},{"title":"Ofertas","href":"404"},{"title":"Contacto","href":"contact"}]'
        ></nav-bar>
        <div id="router-outlet"></div>
    `;
  }
}
customElements.define('app-layout', AppLayout);