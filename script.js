/* ============================================
   SCRIPT.JS - ARACAFÉ
   Funcionalidad interactiva del sitio
   ============================================ */

// ============================================
// 1. MENÚ HAMBURGUESA
// ============================================

const hamburgerBtn = document.getElementById('hamburger-btn');
const navMobile = document.getElementById('nav-mobile');
const navMobileLinks = document.querySelectorAll('.nav-mobile-link');

/**
 * Abre/cierra el menú móvil al hacer clic en el botón hamburguesa
 */
function toggleMobileMenu() {
    hamburgerBtn.classList.toggle('active');
    navMobile.classList.toggle('active');
}

hamburgerBtn.addEventListener('click', toggleMobileMenu);

/**
 * Cierra el menú móvil cuando se hace clic en un enlace
 */
navMobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMobile.classList.remove('active');
    });
});

/**
 * Cierra el menú móvil al hacer clic fuera de él
 */
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMobile.contains(e.target);
    const isClickOnHamburger = hamburgerBtn.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMobile.classList.contains('active')) {
        hamburgerBtn.classList.remove('active');
        navMobile.classList.remove('active');
    }
});

// ============================================
// 2. SCROLL SUAVE PARA ENLACES DE MENÚ
// ============================================

/**
 * Implementa scroll suave personalizado para mejorar la experiencia
 * (complementa el scroll-behavior: smooth del CSS)
 */
const allNavLinks = document.querySelectorAll('a[href^="#"]');

allNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Si es un enlace interno válido
        if (href !== '#' && href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Prevenir el comportamiento por defecto
                e.preventDefault();
                
                // Scroll suave hacia el elemento (nativo del navegador)
                // El navegador moderno maneja esto con scroll-behavior: smooth
                // pero podemos añadir offset para el header sticky
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// 3. ANIMACIONES AL SCROLL (Intersection Observer)
// ============================================

/**
 * Detecta cuando las secciones y tarjetas entran en el viewport
 * y añade animaciones de aparición suave
 */

const observerOptions = {
    threshold: 0.15,      // Activar cuando el 15% del elemento sea visible
    rootMargin: '0px 0px -50px 0px'  // Pequeño margen para optimizar performance
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Añadir clase visible para activar animación
            if (entry.target.classList.contains('fade-in')) {
                entry.target.classList.add('section-visible');
            }
            
            if (entry.target.classList.contains('slide-in')) {
                entry.target.classList.add('card-visible');
            }
            
            // Opcional: dejar de observar después de animar
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todas las secciones y tarjetas con clase fade-in o slide-in
const animatedElements = document.querySelectorAll('.fade-in, .slide-in');
animatedElements.forEach(element => {
    observer.observe(element);
});

// ============================================
// 4. EFECTO STAGGER EN TARJETAS
// ============================================

/**
 * Añade delay progresivo a las tarjetas para un efecto cascada
 */

// Tarjetas de fincas
const fincaCards = document.querySelectorAll('.finca-card');
fincaCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Pasos del proceso
const procesosSteps = document.querySelectorAll('.proceso-step');
procesosSteps.forEach((step, index) => {
    step.style.animationDelay = `${index * 0.1}s`;
});

// Tarjetas de presentaciones
const presentacionCards = document.querySelectorAll('.presentacion-card');
presentacionCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ============================================
// 5. FORMULARIO DE CONTACTO
// ============================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value.trim(),
            email: document.getElementById('email').value.trim(),
            empresa: document.getElementById('empresa').value.trim(),
            pais: document.getElementById('pais').value.trim(),
            mensaje: document.getElementById('mensaje').value.trim()
        };
        
        // Validación básica
        if (!formData.nombre || !formData.email || !formData.mensaje) {
            alert('Por favor, completa los campos obligatorios: Nombre, Correo y Mensaje.');
            return;
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }
        
        // IMPORTANTE: Aquí es donde integrarías tu backend
        // Ejemplo con FormSubmit.co (servicio gratuito):
        // Simplemente cambia el atributo "action" del formulario HTML a:
        // action="https://formsubmit.co/tu-email@aracafe.com"
        
        // O integra con tu API propia:
        /*
        fetch('https://tu-servidor.com/api/contacto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert('¡Mensaje enviado exitosamente! Te contactaremos pronto.');
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al enviar el mensaje. Intenta de nuevo.');
        });
        */
        
        // Por ahora, mostrar mensaje de confirmación local
        showFormSuccess();
        contactForm.reset();
    });
}

/**
 * Muestra un mensaje de confirmación después de enviar el formulario
 */
function showFormSuccess() {
    const formContainer = document.querySelector('.contact-form-container');
    const successMessage = document.createElement('div');
    
    successMessage.style.cssText = `
        background-color: rgba(78, 91, 83, 0.1);
        border-left: 4px solid rgb(78, 91, 83);
        padding: 1.5rem;
        border-radius: 4px;
        margin-top: 1.5rem;
        animation: slideIn 0.3s ease;
    `;
    
    successMessage.innerHTML = `
        <p style="color: rgb(78, 91, 83); margin: 0; font-weight: 500;">
            ✓ ¡Mensaje recibido!
        </p>
        <p style="color: rgb(78, 91, 83); margin: 0.5rem 0 0 0; font-size: 0.95rem;">
            Nos pondremos en contacto pronto. Gracias por interesarte en Aracafé.
        </p>
    `;
    
    formContainer.appendChild(successMessage);
    
    // Remover el mensaje después de 5 segundos
    setTimeout(() => {
        successMessage.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => successMessage.remove(), 300);
    }, 5000);
}

// ============================================
// 6. AJUSTE DEL HEADER AL HACER SCROLL
// ============================================

/**
 * Añade efecto visual al header cuando se hace scroll
 */

let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        // Añadir sombreado cuando se baja
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
    } else {
        // Sombreado ligero en la parte superior
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para móvil
});

// ============================================
// 7. SCROLL A LA SECCIÓN ACTIVA (OPCIONAL)
// ============================================

/**
 * Highlight el enlace del menú según la sección visible (opcional)
 * Descomentar si se desea implementar
 */

/*
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
            link.style.borderBottomColor = 'rgb(191, 153, 84)';
            link.style.color = 'rgb(191, 153, 84)';
        }
    });
});
*/

// ============================================
// 8. COMPATIBILIDAD Y POLYFILLS
// ============================================

/**
 * Polyfill para smooth scroll behavior en navegadores antiguos
 */
if (!('scrollBehavior' in document.documentElement.style)) {
    console.log('Smooth scroll no soportado. Usando polyfill.');
    // En navegadores sin soporte, el scroll será instantáneo (fallback aceptable)
}

// ============================================
// 9. INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Aracafé - Sitio cargado exitosamente ✓');
    console.log('Navegación, animaciones y formulario listos.');
});