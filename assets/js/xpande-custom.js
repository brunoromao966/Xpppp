/* XPANDE Landing Page - Custom JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    
    // Scroll suave para navegação interna
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 100; // Altura do header fixo
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Indicador de progresso da página
    function updateScrollIndicator() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        const scrollPercentRounded = Math.round(scrollPercent * 100);
        
        document.querySelector('.scroll-indicator').style.width = scrollPercentRounded + '%';
    }
    
    // Atualizar indicador no scroll
    window.addEventListener('scroll', updateScrollIndicator);
    
    // Header com efeito de scroll - APENAS DESKTOP
    const header = document.querySelector('.main-header');
    if (window.innerWidth >= 992) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Animações suaves ao aparecer na viewport
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-block_one, .counter-block_one, .about-one_content-outer');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-in');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executar uma vez no carregamento
    
    // Melhorar UX dos botões
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Bootstrap 5.x Navbar - Auto close on anchor link click (mobile)
    document.querySelectorAll('.navbar-nav .nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function() {
            // Close the navbar collapse on mobile when clicking a navigation link
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    });
    
    // Controlar visibilidade do botão fixo mobile
    const fixedMobileCta = document.querySelector('.fixed-mobile-cta');
    if (fixedMobileCta) {
        function toggleFixedButton() {
            // Mostrar após rolar 300px
            if (window.scrollY > 300) {
                fixedMobileCta.style.display = 'block';
                fixedMobileCta.classList.add('visible');
            } else {
                fixedMobileCta.classList.remove('visible');
                // Ocultar com delay para animação
                setTimeout(() => {
                    if (!fixedMobileCta.classList.contains('visible')) {
                        fixedMobileCta.style.display = 'none';
                    }
                }, 300);
            }
        }
        
        window.addEventListener('scroll', toggleFixedButton);
        toggleFixedButton(); // Executar uma vez no carregamento
    }
    
});

// CSS adicional via JavaScript para animações
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .scroll-indicator {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .scroll-indicator.visible {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Mostrar indicador após um pouco de scroll
window.addEventListener('scroll', function() {
    const indicator = document.querySelector('.scroll-indicator');
    if (window.scrollY > 100) {
        indicator.classList.add('visible');
    } else {
        indicator.classList.remove('visible');
    }
});