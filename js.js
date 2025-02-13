document.addEventListener('DOMContentLoaded', () => {
    const loginModalOverlay = document.getElementById('loginModalOverlay');
    const registerModalOverlay = document.getElementById('registerModalOverlay');
    const authButton = document.getElementById('authButton');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    

    const toggleModal = (modal) => {
        if (modal) {
            modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
        }
    };

    if (authButton) {
        authButton.addEventListener('click', () => toggleModal(loginModalOverlay));
    }

    if (switchToRegister) {
        switchToRegister.addEventListener('click', () => {
            toggleModal(loginModalOverlay);
            toggleModal(registerModalOverlay);
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', () => {
            toggleModal(registerModalOverlay);
            toggleModal(loginModalOverlay);
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            alert(`Вход выполнен: ${email}`);
            toggleModal(loginModalOverlay);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            alert(`Регистрация выполнена: ${name} (${email})`);
            toggleModal(registerModalOverlay);
        });
    }

    [loginModalOverlay, registerModalOverlay].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) toggleModal(modal);
            });
        }
    });

    const newsContainer = document.getElementById('newsContainer');
    const addNewsBtn = document.querySelector('.add-news-btn');
    const newsModalOverlay = document.getElementById('newsModalOverlay');
    const cancelBtn = document.querySelector('.cancel-btn');
    const newsForm = document.getElementById('newsForm');

    if (newsContainer && addNewsBtn && newsModalOverlay && cancelBtn && newsForm) {
        const initialNews = [
            { title: "День открытых дверей", description: "Приглашаем всех абитуриентов на день открытых дверей 15 октября." },
            { title: "Новый курс по веб-разработке", description: "Стартует новый курс по современным технологиям веб-разработки." },
            { title: "Студенческая конференция", description: "Регистрация на ежегодную студенческую научную конференцию открыта." },
            { title: "Обновление библиотеки", description: "В библиотеку поступили новые учебники по программированию." },
            { title: "Спортивные соревнования", description: "Команда нашего вуза заняла первое место в региональных соревнованиях." }
        ];

        const renderNewsItem = (title, description) => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <h3>${title}</h3>
                <p>${description}</p>
                <button class="delete-btn">Удалить</button>
            `;
            newsItem.querySelector('.delete-btn').addEventListener('click', () => newsItem.remove());
            newsContainer.prepend(newsItem);
        };

        initialNews.forEach(news => renderNewsItem(news.title, news.description));

        addNewsBtn.addEventListener('click', () => toggleModal(newsModalOverlay));
        cancelBtn.addEventListener('click', () => toggleModal(newsModalOverlay));

        newsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('newsTitle').value;
            const description = document.getElementById('newsDescription').value;
            if (title && description) {
                renderNewsItem(title, description);
                newsForm.reset();
                toggleModal(newsModalOverlay);
            }
        });
    }
    

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            alert(`Спасибо, ${name}! Ваше сообщение отправлено.`);
            contactForm.reset();
        });
    }
});