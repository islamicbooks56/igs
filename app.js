// =====================
// KİTAP VERİLERİ
// =====================
const books = [
  {
    id: 1,
    title: "İncil'den Güzel Sözler",
    description: '',
    fullUrl: 'https://archive.org/compress/incildensozler/formats=VBR%20MP3&file=/incildensozler.zip',
    downloadBase: 'https://archive.org/download/incildensozler/',
    parts: [
      { part: '1', name: 'Bölüm 1', file: '01-incil.mp3' },
      { part: '2', name: 'Bölüm 2', file: '02-incil.mp3' },
      { part: '3', name: 'Bölüm 3', file: '03-incil.mp3' },
      { part: '4', name: 'Bölüm 4', file: '04-incil.mp3' },
      { part: '5', name: 'Bölüm 5', file: '05-incil.mp3' },
      { part: '6', name: 'Bölüm 6', file: '06-incil.mp3' },
      { part: '7', name: 'Bölüm 7', file: '07-incil.mp3' },
      { part: '8', name: 'Bölüm 8', file: '08-incil.mp3' },
      { part: '9', name: 'Bölüm 9', file: '09-incil.mp3' },
    ]
  },
  {
    id: 2,
    title: 'Kitap 2',
    description: '',
    fullUrl: '',
    downloadBase: '',
    parts: []
  }
];

// =====================
// RENDER
// =====================
function render() {
  const container = document.getElementById('books-container');
  container.innerHTML = '';

  books.forEach(book => {
    if (book.parts.length === 0) return;

    const card = document.createElement('div');
    card.className = 'book-card';

    let partsHTML = '';
    book.parts.forEach(p => {
      const url = book.downloadBase + p.file;
      partsHTML += `
        <div class="part-row">
          <span class="part-name">${p.name}</span>
          <div class="part-actions">
            <button class="btn btn-sm btn-outline-secondary btn-play"
              data-book="${book.id}"
              data-part="${p.part}"
              data-url="${url}">
              <i class="fa-solid fa-play fa-xs"></i>
            </button>
            <a class="btn btn-sm btn-outline-primary"
              href="${url}"
              data-book="${book.id}"
              data-part="${p.part}">
              <i class="fa-solid fa-download fa-xs"></i>
            </a>
          </div>
        </div>
        <div class="audio-wrapper" id="audio-${book.id}-${p.part}">
          <audio id="audio-el-${book.id}-${p.part}" controls></audio>
        </div>
      `;
    });

    card.innerHTML = `
      <div class="book-title">${book.title}</div>
      ${book.description ? `<div class="book-description">${book.description}</div>` : ''}
      <a class="btn btn-sm btn-primary mb-3"
        href="${book.fullUrl}"
        data-book="${book.id}"
        data-part="full">
        <i class="fa-solid fa-download me-1"></i> Tümünü İndir
      </a>
      ${partsHTML}
    `;

    container.appendChild(card);
  });

  bindEvents();
}

// =====================
// BUTON OLAYLARI
// =====================
function bindEvents() {
  document.querySelectorAll('.btn-play').forEach(btn => {
    btn.addEventListener('click', () => {
      const bookId = btn.dataset.book;
      const part = btn.dataset.part;
      const url = btn.dataset.url;
      const wrapperId = `audio-${bookId}-${part}`;
      const audioEl = document.getElementById(`audio-el-${bookId}-${part}`);

      // Diğer tüm playerları kapat
      document.querySelectorAll('.audio-wrapper').forEach(w => {
        if (w.id !== wrapperId) {
          w.classList.remove('active');
          const a = w.querySelector('audio');
          a.pause();
          a.src = '';
        }
      });

      // Bu playerı aç/kapat
      const wrapper = document.getElementById(wrapperId);
      const isOpening = !wrapper.classList.contains('active');
      wrapper.classList.toggle('active');

      if (isOpening) {
        audioEl.src = url;
        audioEl.play();
      } else {
        audioEl.pause();
        audioEl.src = '';
      }
    });
  });
}

// =====================
// BAŞLAT
// =====================
render();
