// 1. Animaciones de entrada al hacer scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});


// 2. Sistema de Menú Móvil Premium
const initMobileMenu = () => {
    const burger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (!burger || !nav) return;
    
    // Función para abrir/cerrar menú
    const toggleMenu = () => {
        burger.classList.toggle('is-active');
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Accesibilidad ARIA
        const expanded = burger.classList.contains('is-active');
        burger.setAttribute('aria-expanded', expanded);
    };
    
    // Evento click en el botón hamburguesa
    burger.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer click en cualquier enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !burger.contains(e.target)) {
            toggleMenu();
        }
    });
};

// Inyectar clase para bloquear el scroll del body cuando el menú está abierto
const injectNoScrollStyle = () => {
    const style = document.createElement('style');
    style.textContent = `
        .no-scroll {
            overflow: hidden;
            height: 100vh;
        }
    `;
    document.head.appendChild(style);
};


// 3. Lógica para los Acordeones Interactivos (NUEVO)
const initAccordions = () => {
    // Busca todos los acordeones
    const accordions = document.querySelectorAll('.premium-accordion');

    accordions.forEach(acc => {
        // Escucha cuando se abre/cierra uno
        acc.addEventListener('toggle', (event) => {
            if (acc.open) {
                // Si este se abre, cierra todos los demás (Efecto exclusivo)
                accordions.forEach(otherAcc => {
                    if (otherAcc !== acc && otherAcc.open) {
                        otherAcc.open = false;
                    }
                });
            }
        });
    });
};


// Inicializar scripts cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    injectNoScrollStyle();
    initMobileMenu();
    initAccordions(); // Activa los acordeones
});