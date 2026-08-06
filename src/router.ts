// src/router.ts
type RouteMap = Record<string, string>;

export class Router {
  private routes: RouteMap;
  private appOutlet: HTMLElement;

  constructor(routes: RouteMap, outletId: string) {
    this.routes = routes;
    this.appOutlet = document.getElementById(outletId)!;

    // Escuchar los botones de "Atrás / Adelante" del navegador
    window.addEventListener('popstate', () => this.handleRoute());
  }

  // Navegar a una nueva ruta sin refrescar
  public navigate(path: string): void {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  // Renderizar el Web Component según el path actual
  public handleRoute(): void {
    const currentPath = window.location.pathname;
    const tagName = this.routes[currentPath] || this.routes['404'];

    // Limpia el contenedor e inyecta la etiqueta HTML del nuevo Web Component
    this.appOutlet.innerHTML = `<${tagName}></${tagName}>`;
  }
}