import './style.css'
import { NavBar, AsideSection, Footer } from './components';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="page-shell">
    <nav-bar ShopName="Tienda on-line" slogan="Encuentra lo mejor para tu hogar"></nav-bar>

    <main class="content-layout">
      <aside class="filters-panel">
        <h2>Filtros</h2>

        <aside-section 
          title="categorias"
          type="checkbox" 
          options='[{"label":"Electrónica","type":"checkbox","checked":true},{"label":"Hogar","type":"checkbox"},{"label":"Moda","type":"checkbox"}]'>
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
      

      <section class="products-section">
        <div class="section-title">
          <h2>Productos destacados</h2>
          <p>Descubre las mejores opciones del día</p>
        </div>

        <div class="products-grid">
          <article class="product-card">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80" alt="Auriculares inalámbricos" />
            <h3>Auriculares inalámbricos</h3>
            <p>Sonido premium y batería de larga duración.</p>
            <strong>$79.990</strong>
          </article>

          <article class="product-card">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" alt="Reloj inteligente" />
            <h3>Reloj inteligente</h3>
            <p>Monitorea tu salud y tus actividades diarias.</p>
            <strong>$89.990</strong>
          </article>

          <article class="product-card">
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" alt="Audífonos sobre la oreja" />
            <h3>Audífonos premium</h3>
            <p>Diseño cómodo y audio envolvente.</p>
            <strong>$69.990</strong>
          </article>

          <article class="product-card">
            <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80" alt="Smartphone" />
            <h3>Smartphone</h3>
            <p>Rendimiento rápido y cámara de alta calidad.</p>
            <strong>$129.990</strong>
          </article>
        </div>
      </section>
    </main>

    <footer-section 
      title="Tienda on-line"
      created="03/08/2026"
      phone="+56 9 1234 5678"
      email="contacto@tiendaonline.cl"/>
  </div>
`;