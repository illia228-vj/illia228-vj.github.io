// Чекаємо поки весь DOM завантажиться
document.addEventListener('DOMContentLoaded', function() {
    
    // Анімація навігації при скролі
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Анімація карток при скролі
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        observer.observe(card);
    });

    // Інтерактивні кнопки
    const colorChanger = document.getElementById('color-changer');
    const mover = document.getElementById('mover');
    const grower = document.getElementById('grower');
    const targetBox = document.getElementById('target-box');

    let isMoved = false;
    let isGrown = false;

    colorChanger.addEventListener('click', function() {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        targetBox.style.backgroundColor = randomColor;
        
        // Додаємо анімацію пульсації
        targetBox.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            targetBox.style.animation = '';
        }, 500);
    });

    mover.addEventListener('click', function() {
        if (!isMoved) {
            targetBox.style.transform = 'translateX(200px) rotate(360deg)';
            isMoved = true;
        } else {
            targetBox.style.transform = 'translateX(0) rotate(0)';
            isMoved = false;
        }
    });

    grower.addEventListener('click', function() {
        if (!isGrown) {
            targetBox.style.transform = 'scale(1.5)';
            targetBox.style.backgroundColor = '#e74c3c';
            isGrown = true;
        } else {
            targetBox.style.transform = 'scale(1)';
            targetBox.style.backgroundColor = '#9b59b6';
            isGrown = false;
        }
    });

    // Лічильник
    const counter = document.getElementById('counter');
    const increaseBtn = document.getElementById('increase');
    const decreaseBtn = document.getElementById('decrease');
    
    let count = 0;

    increaseBtn.addEventListener('click', function() {
        count++;
        updateCounter();
        animateCounter('up');
    });

    decreaseBtn.addEventListener('click', function() {
        count--;
        updateCounter();
        animateCounter('down');
    });

    function updateCounter() {
        counter.textContent = count;
        
        // Зміна кольору в залежності від значення
        if (count > 0) {
            counter.style.color = '#2ecc71';
        } else if (count < 0) {
            counter.style.color = '#e74c3c';
        } else {
            counter.style.color = 'white';
        }
    }

    function animateCounter(direction) {
        counter.style.transform = 'scale(1.2)';
        if (direction === 'up') {
            counter.style.color = '#2ecc71';
        } else {
            counter.style.color = '#e74c3c';
        }
        
        setTimeout(() => {
            counter.style.transform = 'scale(1)';
            setTimeout(() => {
                counter.style.color = count > 0 ? '#2ecc71' : count < 0 ? '#e74c3c' : 'white';
            }, 300);
        }, 300);
    }

    // Плавна прокрутка для навігації
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Додаткові плаваючі анімації для коробок
    const floatingBoxes = document.querySelectorAll('.floating-box');
    
    floatingBoxes.forEach((box, index) => {
        box.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease, float 3s ease-in-out infinite';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
        });
    });

    // Анімація заголовка при завантаженні
    const heroTitle = document.querySelector('.hero-content h1');
    const heroText = document.querySelector('.hero-content p');
    
    setTimeout(() => {
        heroTitle.style.animation = 'fadeIn 1s ease forwards';
    }, 500);
    
    setTimeout(() => {
        heroText.style.animation = 'fadeIn 1s ease forwards';
    }, 1000);

    // Ефект паралаксу для герой секції
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});