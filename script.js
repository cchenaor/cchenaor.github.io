// ========================================
// MENÚ HAMBURGUESA - MOBILE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('nav-mobile');
    const navMobileLinks = document.querySelectorAll('.nav-link-mobile');
    
    // Alternar menú al hacer clic en hamburguesa
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMobile.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    navMobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMobile.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMobile.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
        }
    });
});

// ========================================
// SCROLL SUAVE (SMOOTH SCROLL)
// ========================================

// Los enlaces ya tienen href="#id" por lo que el navegador realiza
// scroll suave automáticamente gracias a "scroll-behavior: smooth" en CSS.
// Sin embargo, aquí agregamos lógica adicional para mayor control si es necesario.

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Solo procesar si el href no es solo "#"
        if (href !== '#' && href !== '') {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Scroll con offset para considerar el header fijo
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Prevenir comportamiento por defecto si es necesario
                // e.preventDefault();
            }
        }
    });
});

// ========================================
// ANIMACIONES AL HACER SCROLL
// ========================================

// Usar Intersection Observer para activar animaciones cuando
// los elementos entran en el viewport

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Opcional: remover observer después de que se haya animado
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos con clase fade-in
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

// Ejecutar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', setupScrollAnimations);

// ========================================
// AÑO ACTUAL EN FOOTER
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// ========================================
// MANEJO DEL FORMULARIO DE CONTACTO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contacto-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Recopilar datos del formulario
            const formData = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                empresa: document.getElementById('empresa').value,
                pais: document.getElementById('pais').value,
                mensaje: document.getElementById('mensaje').value
            };
            
            // Opción 1: Usar mailto (redirección a cliente de email)
            // Descomenta la siguiente línea para usar mailto
            /*
            const mailtoLink = `mailto:contacto@aracafe.com?subject=Nueva consulta de ${formData.nombre}&body=${encodeURIComponent(
                `Nombre: ${formData.nombre}\nEmail: ${formData.email}\nEmpresa: ${formData.empresa}\nPaís: ${formData.pais}\n\nMensaje:\n${formData.mensaje}`
            )}`;
            window.location.href = mailtoLink;
            */
            
            // Opción 2: Enviar a servicio externo (ejemplo con Formspree)
            // Descomenta y reemplaza YOUR_FORM_ID con tu ID de Formspree
            /*
            fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            }).then(response => {
                if (response.ok) {
                    alert('¡Gracias! Tu consulta ha sido enviada exitosamente.');
                    contactForm.reset();
                } else {
                    alert('Hubo un error al enviar el formulario. Intenta nuevamente.');
                }
            }).catch(error => {
                console.error('Error:', error);
                alert('Error de conexión. Intenta nuevamente más tarde.');
            });
            */
            
            // Opción 3: Mostrar mensaje de éxito simulado (para desarrollo)
            console.log('Datos del formulario:', formData);
            alert('¡Gracias por tu consulta! Nos pondremos en contacto pronto.\n\nNota: Este es un sitio de demostración. Para integración real, conecta el formulario a tu servidor o servicio de email.');
            contactForm.reset();
        });
    }
});

// ========================================
// EFECTOS ADICIONALES (OPCIONAL)
// ========================================

// Efecto de parallax suave en el hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-background');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// Mantener el header visible con transición al hacer scroll
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Opcional: agregar sombra al header cuando se scrollea
    if (currentScroll > 10) {
        header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ========================================
// VALIDACIÓN BÁSICA DE FORMULARIO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#ff6b6b';
                this.title = 'Por favor ingresa un email válido';
            } else {
                this.style.borderColor = '';
                this.title = '';
            }
        });
    }
});

// ========================================
// ACTIVAR BOTÓN DE ENVÍO SOLO CON CAMPOS COMPLETOS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contacto-form');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
    
    if (contactForm && submitButton) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        function checkFormValid() {
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                }
            });
            
            // Validación adicional para email
            const emailInput = contactForm.querySelector('#email');
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    isValid = false;
                }
            }
            
            submitButton.style.opacity = isValid ? '1' : '0.6';
            submitButton.style.cursor = isValid ? 'pointer' : 'not-allowed';
        }
        
        inputs.forEach(input => {
            input.addEventListener('input', checkFormValid);
            input.addEventListener('change', checkFormValid);
        });
        
        // Verificación inicial
        checkFormValid();
    }
});

// ========================================
// LOG DE EVENTOS (OPCIONAL - PARA DEBUGGING)
// ========================================

console.log('✓ Script.js cargado correctamente');
console.log('✓ Menú hamburguesa: disponible');
console.log('✓ Scroll suave: habilitado');
console.log('✓ Animaciones al scroll: activas');
console.log('✓ Validación de formulario: activa');