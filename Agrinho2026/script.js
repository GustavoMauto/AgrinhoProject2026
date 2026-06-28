
class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('menuToggle');
        this.navMenu = document.getElementById('navMenu');
        this.init();
    }

    init() {
        if (!this.menuToggle) return;

        this.menuToggle.addEventListener('click', () => this.toggle());
        
   
        this.navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                this.close();
            }
        });
    }

    toggle() {
        const isActive = this.navMenu.classList.contains('active');
        isActive ? this.close() : this.open();
    }

    open() {
        this.navMenu.classList.add('active');
        this.menuToggle.classList.add('active');
        this.menuToggle.setAttribute('aria-expanded', 'true');
    }

    close() {
        this.navMenu.classList.remove('active');
        this.menuToggle.classList.remove('active');
        this.menuToggle.setAttribute('aria-expanded', 'false');
    }
}


class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.duration = 2000; 
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    this.startAnimation(entry.target);
                    entry.target.setAttribute('data-animated', 'true');
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    startAnimation(counter) {
        const targetValue = parseInt(counter.getAttribute('data-target'));
        let currentValue = 0;
        const increment = targetValue / (this.duration / 50);

        const animation = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                counter.textContent = targetValue.toLocaleString('pt-BR');
                clearInterval(animation);
            } else {
                counter.textContent = Math.floor(currentValue).toLocaleString('pt-BR');
            }
        }, 50);
    }
}


class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.formMessage = document.getElementById('formMessage');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
    
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.validateField(field));
        });
    }

    validateField(field) {
        const isValid = this.isFieldValid(field);
        field.style.borderColor = isValid ? '' : '#d32f2f';
        return isValid;
    }

    isFieldValid(field) {
        const value = field.value.trim();

        if (field.hasAttribute('required') && !value) {
            return false;
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        }

        if (field.type === 'tel' && value) {
            const telRegex = /^\(?[\d\s\-\+\(\)]{8,}$/;
            return telRegex.test(value);
        }

        return true;
    }

    handleSubmit(e) {
        e.preventDefault();

        const fields = this.form.querySelectorAll('input, textarea');
        let allValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                allValid = false;
            }
        });

        if (!allValid) {
            this.showMessage('Por favor, preencha todos os campos corretamente.', 'error');
            return;
        }

    
        this.submitForm();
    }

    submitForm() {
      
        console.log('Formulário enviado:', new FormData(this.form));

        this.showMessage('✓ Mensagem enviada com sucesso! Obrigado por entrar em contato.', 'success');
        
      
        setTimeout(() => {
            this.form.reset();
            this.formMessage.classList.remove('success');
        }, 3000);
    }

    showMessage(text, type) {
        this.formMessage.textContent = text;
        this.formMessage.className = `form-message ${type}`;
        
        
        setTimeout(() => {
            this.formMessage.classList.remove(type);
        }, 5000);
    }
}



class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');

            
                if (href === '#' || href === '') return;

                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                
                    target.focus({ preventScroll: true });
                }
            });
        });
    }
}


class ScrollObserver {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.objetivo-card, .atividade-item, .galeria-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease-in-out';
            observer.observe(el);
        });
    }
}


class AccessibilityControls {
    constructor() {
        this.themeBtn = document.getElementById('toggleTheme');
        this.contrastBtn = document.getElementById('toggleContrast');
        this.increaseBtn = document.getElementById('increaseText');
        this.decreaseBtn = document.getElementById('decreaseText');
        this.resetBtn = document.getElementById('resetAccessibility');
        this.toggleBtn = document.getElementById('accessibilityToggle');
        this.headerPanel = document.getElementById('accessibilityHeaderPanel');
        this.message = document.getElementById('accessibilityMessage');
        this.baseFontSize = 16;
        this.fontScale = 1;
        this.minScale = 0.9;
        this.maxScale = 1.3;
        this.scaleStep = 0.1;
        this.init();
    }

    init() {
        if (!this.themeBtn || !this.contrastBtn || !this.toggleBtn || !this.headerPanel) return;

        this.themeBtn.addEventListener('click', () => this.toggleTheme());
        this.contrastBtn.addEventListener('click', () => this.toggleContrast());
        this.increaseBtn.addEventListener('click', () => this.changeFontScale(this.fontScale + this.scaleStep));
        this.decreaseBtn.addEventListener('click', () => this.changeFontScale(this.fontScale - this.scaleStep));
        this.resetBtn.addEventListener('click', () => this.resetAccessibility());
        this.toggleBtn.addEventListener('click', () => this.togglePanel());
        document.addEventListener('click', (event) => this.handleDocumentClick(event));

        this.loadPreferences();
    }

    loadPreferences() {
        const storedTheme = localStorage.getItem('agrinhoTheme');
        const storedContrast = localStorage.getItem('agrinhoContrast') === 'true';
        const storedScale = parseFloat(localStorage.getItem('agrinhoFontScale'));

        if (storedTheme) {
            this.setTheme(storedTheme, false);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setTheme('dark', false);
        } else {
            this.setTheme('light', false);
        }

        if (!Number.isNaN(storedScale)) {
            this.changeFontScale(storedScale, false);
        }

        this.setContrast(storedContrast, false);
        this.updateButtons();
    }

    setTheme(theme, save = true) {
        document.body.classList.toggle('theme-dark', theme === 'dark');
        if (save) {
            localStorage.setItem('agrinhoTheme', theme);
        }

        this.themeBtn.textContent = theme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
        this.themeBtn.setAttribute('aria-pressed', theme === 'dark');
        this.showMessage(`Modo ${theme === 'dark' ? 'escuro' : 'claro'} ativado.`);
    }

    toggleTheme() {
        this.setTheme(document.body.classList.contains('theme-dark') ? 'light' : 'dark');
        this.updateButtons();
    }

    setContrast(active, save = true) {
        document.body.classList.toggle('high-contrast', active);
        if (save) {
            localStorage.setItem('agrinhoContrast', active);
        }

        this.contrastBtn.textContent = active ? 'Contraste Normal' : 'Alto Contraste';
        this.contrastBtn.setAttribute('aria-pressed', active);
        this.showMessage(active ? 'Alto contraste ativado.' : 'Contraste normal ativado.');
    }

    toggleContrast() {
        const active = !document.body.classList.contains('high-contrast');
        this.setContrast(active);
        this.updateButtons();
    }

    changeFontScale(scale, save = true) {
        if (scale < this.minScale) {
            scale = this.minScale;
        }
        if (scale > this.maxScale) {
            scale = this.maxScale;
        }

        this.fontScale = Number(scale.toFixed(2));
        document.documentElement.style.fontSize = `${this.baseFontSize * this.fontScale}px`;

        if (save) {
            localStorage.setItem('agrinhoFontScale', this.fontScale);
        }

        this.updateButtons();
        this.showMessage(`Tamanho do texto ajustado para ${Math.round(this.fontScale * 100)}%.`);
    }

    resetAccessibility() {
        this.setTheme('light');
        this.setContrast(false);
        this.changeFontScale(1);
        localStorage.removeItem('agrinhoTheme');
        localStorage.removeItem('agrinhoContrast');
        localStorage.removeItem('agrinhoFontScale');
        this.showMessage('Configurações de acessibilidade restauradas.');
    }

    updateButtons() {
        if (!this.increaseBtn || !this.decreaseBtn) return;
        this.increaseBtn.disabled = this.fontScale >= this.maxScale;
        this.decreaseBtn.disabled = this.fontScale <= this.minScale;
    }

    togglePanel() {
        const isOpen = this.headerPanel.classList.toggle('active');
        this.toggleBtn.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) {
            this.headerPanel.style.display = 'block';
        } else {
            this.headerPanel.style.display = 'none';
        }
    }

    handleDocumentClick(event) {
        if (!this.headerPanel.classList.contains('active')) return;
        if (event.target.closest('#accessibilityHeaderPanel') || event.target.closest('#accessibilityToggle')) return;
        this.closePanel();
    }

    closePanel() {
        this.headerPanel.classList.remove('active');
        this.headerPanel.style.display = 'none';
        this.toggleBtn.setAttribute('aria-expanded', 'false');
    }

    showMessage(text) {
        if (!this.message) return;
        this.message.textContent = text;
        this.message.style.display = 'block';
        clearTimeout(this.messageTimeout);
        this.messageTimeout = setTimeout(() => {
            this.message.style.display = 'none';
        }, 4000);
    }
}


class LazyLoadImages {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.src || img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}


class Analytics {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.trackEvent('botao_clicado', {
                    texto: btn.textContent,
                    classe: btn.className
                });
            });
        });

        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.trackEvent('secao_visualizada', {
                        secao: entry.target.id
                    });
                }
            });
        });

        sections.forEach(section => observer.observe(section));
    }

    trackEvent(eventName, data) {
        console.log(`📊 Evento: ${eventName}`, data);
    }
}


const Utils = {
    debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    scrollToElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            window.scrollTo({
                top: element.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    },

    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                console.log('Copiado!');
            });
        }
    }
};


document.addEventListener('DOMContentLoaded', function() {
    console.log('🌱 Agrinho 2026 - Site iniciado');

    new MobileMenu();
    new CounterAnimation();
    new FormValidator('#formContato');
    new SmoothScroll();
    new ScrollObserver();
    new AccessibilityControls();
    new LazyLoadImages();
    new Analytics();

    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            console.log('⚡ Recursos carregados em background');
        });
    }
});


window.addEventListener('error', function(event) {
    console.error('❌ Erro capturado:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('❌ Promise rejeitada não tratada:', event.reason);
});


if ('serviceWorker' in navigator) {
}


console.log(`
╔════════════════════════════════════════╗
║     🌱 AGRINHO 2026 - Site Ativo      ║
║     Módulos Carregados:                ║
║     ✓ Menu Mobile                      ║
║     ✓ Contadores Animados              ║
║     ✓ Validação de Formulário          ║
║     ✓ Scroll Suave                     ║
║     ✓ Lazy Loading                     ║
║     ✓ Analytics                        ║
╚════════════════════════════════════════╝
`);
