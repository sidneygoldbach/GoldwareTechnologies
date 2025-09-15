// Goldware Technologies - JavaScript Principal

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização das funcionalidades
    initializeNavigation();
    initSmoothScroll();
    initHeaderScroll();
    initContactForm();
    initAnimations();
    initializeLanguageSystem();
});

// Mobile menu functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
    }
}

// Scroll Suave para Âncoras
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Efeito de Scroll no Header
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Esconder/mostrar header baseado na direção do scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Formulário de Contato
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter dados do formulário
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Validação básica
            if (!name || !email || !message) {
                showNotification('Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Simular envio do formulário
            showNotification('Enviando mensagem...', 'info');
            
            // Criar link mailto
            const subject = encodeURIComponent('Nova mensagem do site Goldware Technologies');
            const body = encodeURIComponent(
                `Nome: ${name}\n` +
                `Email: ${email}\n` +
                `Mensagem: ${message}`
            );
            
            const mailtoLink = `mailto:sidney@goldbach.com.br?subject=${subject}&body=${body}`;
            
            // Abrir cliente de email
            window.location.href = mailtoLink;
            
            // Limpar formulário
            this.reset();
            
            // Mostrar mensagem de sucesso
            setTimeout(() => {
                showNotification('Mensagem preparada! Seu cliente de email foi aberto.', 'success');
            }, 500);
        });
    }
}

// Validação de Email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de Notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Cores baseadas no tipo
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        case 'info':
        default:
            notification.style.backgroundColor = '#3b82f6';
            break;
    }
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Animações de Entrada
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-form');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Utilitários
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Função para scroll suave para o topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Adicionar botão de voltar ao topo (opcional)
function addBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ffd700, #ffed4e);
        border: none;
        color: #1a1a1a;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
    `;
    
    backToTopBtn.addEventListener('click', scrollToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(backToTopBtn);
}

// Initialize language system
function initializeLanguageSystem() {
    // Initialize the language system from translations.js
    if (typeof initLanguageSystem === 'function') {
        initLanguageSystem();
    }
    
    // Set up language selectors
    const languageSelect = document.getElementById('languageSelect');
    const mobileLangSelect = document.getElementById('mobileLangSelect');
    
    if (languageSelect && typeof changeLanguage === 'function') {
        languageSelect.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
            // Sync mobile selector
            if (mobileLangSelect) {
                mobileLangSelect.value = e.target.value;
            }
        });
    }
    
    if (mobileLangSelect && typeof changeLanguage === 'function') {
        mobileLangSelect.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
            // Sync desktop selector
            if (languageSelect) {
                languageSelect.value = e.target.value;
            }
        });
    }
}

// Inicializar botão de voltar ao topo
addBackToTopButton();