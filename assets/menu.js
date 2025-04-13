function genNavbar() {
    const navbarHTML = `

          <div class="container">
              <div class="navbar-brand">
                  <a class="navbar-item" href="index.html">
                      Bonsaiki
                  </a>
      
                  <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBonsaiki">
                      <span aria-hidden="true"></span>
                      <span aria-hidden="true"></span>
                      <span aria-hidden="true"></span>
                      <span aria-hidden="true"></span>
                  </a>
              </div>
      
              <div id="navbarBonsaiki" class="navbar-menu">
                  <div class="navbar-start">
                      <a class="navbar-item" href="index.html">
                          Inicio
                      </a>
                      <a class="navbar-item" href="catalogo.html">
                          Catálogo
                      </a>
                      <a class="navbar-item" href="blog.html">
                          Blog
                      </a>
                      <a class="navbar-item" href="index.html#contacto">
                          Contacto
                      </a>
                  </div>
              </div>
          </div>

    `;
    return navbarHTML;
  }
  

export function initMenu() {
    const navMain = document.getElementById("nav_main");
    if (navMain) {
        navMain.innerHTML = genNavbar();
    } else {
        console.error("No se encontró el elemento con el id 'nav_main'.");
    }
}