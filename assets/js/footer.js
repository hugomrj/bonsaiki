
export function genFooter() {
    const footerHTML = `
            <div class="content has-text-centered">
                <p>© 2025 Bonsai Ki. Desarrollado por <a href="https://hugomrj.github.io/seti/" target="_blank">SeTI Servicios Tecnológicos Integrados</a>.</p>
                <p><a href="#inicio">Volver arriba</a></p>
            </div>

    `;
    return footerHTML;
}





export function initFooter() {
    const footerContainer = document.querySelector("footer"); // Seleccionar directamente el elemento <footer>
    if (footerContainer) {
        footerContainer.innerHTML = genFooter(); // Insertar el contenido generado dentro del footer
    }
}