const apiUrl = " https://53da-217-117-235-38.ngrok-free.app";  // Используй URL, полученный от ngrok

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Ошибка при загрузке данных:", error);
    });
// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // Раскрываем приложение на полную высоту

// Найдём контейнер для списка книг в разметке
const bookListEl = document.querySelector('.book-list');

// Получение списка книг с бэкенда
fetch('http://localhost:5000/books')
  .then(response => response.json())
  .then(books => {
    // Очищаем контейнер перед вставкой карточек
    bookListEl.innerHTML = '';

    // Генерируем HTML для каждой книги и вставляем в контейнер
    books.forEach(book => {
      const bookCardHTML = `
        <div class="card">
          <img src="${book.cover}" alt="Обложка книги ${book.title}" class="cover" />
          <h3 class="title">${book.title}</h3>
          <p class="author">${book.author}</p>
          <p class="price">${book.price} руб.</p>
          <div class="description">
            <p class="desc-text">${book.description}</p>
            <p class="chapters">Глав: ${book.chapters}</p>
          </div>
          <div class="buttons">
            <button class="details-btn">Подробнее</button>
            <button class="buy-btn">Купить</button>
          </div>
        </div>
      `;
      bookListEl.insertAdjacentHTML('beforeend', bookCardHTML);
    });

    // Обработчик для кнопок "Подробнее" – показать/скрыть описание
    document.querySelectorAll('.details-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.card');
        const desc = card.querySelector('.description');
        if (desc.classList.contains('open')) {
          desc.classList.remove('open');
          btn.textContent = 'Подробнее';
        } else {
          desc.classList.add('open');
          btn.textContent = 'Скрыть';
        }
      });
    });

    // Обработчик для кнопок "Купить" – пока просто демонстрационное сообщение
    document.querySelectorAll('.buy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        alert('Спасибо за покупку! (Демо)');
      });
    });
  })
  .catch(error => {
    console.error('Error fetching books:', error);
    bookListEl.textContent = 'Ошибка загрузки данных.';
  })
  .finally(() => {
    // Сообщаем Telegram, что WebApp готов к отображению
    tg.ready();
  });
