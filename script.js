document.addEventListener('DOMContentLoaded', () => {

    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });

    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                toggle.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, (entry.target.dataset.delay || 0) * 1000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(el => observer.observe(el));
    }

    const nav = document.querySelector('.site-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.style.boxShadow = window.scrollY > 10
            ? '0 4px 20px rgba(26,8,0,0.35)'
            : 'none';
        });
    }

    const counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
        const counterObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count);
                    const duration = 1800;
                    const step = target / (duration / 16);
                    let current = 0;
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
                            clearInterval(timer);
                        } else {
                            el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
                        }
                    }, 16);
                    counterObs.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => counterObs.observe(c));
    }

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const hero = document.querySelector('.hero-bg');
    if (hero) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            hero.style.transform = `translateY(${y * 0.3}px)`;
        }, { passive: true });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    const shopCards  = document.querySelectorAll('.shop-card');
    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                shopCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = '';
                        card.classList.remove('hidden');
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn  = contactForm.querySelector('[type="submit"]');
            const orig = btn.textContent;
            btn.textContent = 'Sending…';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = '✓ Message Sent';
                btn.style.background = '#4A7C4A';
                setTimeout(() => {
                    btn.textContent = orig;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1200);
        });
    }

    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.textContent = '✓ Subscribed!';
            btn.style.background = '#4A7C4A';
            setTimeout(() => {
                btn.textContent = 'Subscribe';
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    });

    const slider = document.querySelector('.testimonial-track');
    if (slider) {
        const slides = slider.querySelectorAll('.testimonial-slide');
        const dots   = document.querySelectorAll('.t-dot');
        let current  = 0;
        const goTo   = (n) => {
            slides[current].classList.remove('active');
            dots[current]?.classList.remove('active');
            current = (n + slides.length) % slides.length;
            slides[current].classList.add('active');
            dots[current]?.classList.add('active');
        };
        document.querySelector('.t-prev')?.addEventListener('click', () => goTo(current - 1));
        document.querySelector('.t-next')?.addEventListener('click', () => goTo(current + 1));
        dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
        setInterval(() => goTo(current + 1), 5000);
    }
});

(function() {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 18);
    function updateCD() {
        const now  = new Date();
        const diff = deadline - now;
        if (diff <= 0) return;
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        document.getElementById('cd-days').textContent  = String(d).padStart(2,'0');
        document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
        document.getElementById('cd-mins').textContent  = String(m).padStart(2,'0');
    }
    updateCD();
    setInterval(updateCD, 60000);
})();

document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});