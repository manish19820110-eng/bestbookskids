/* ============================================================
   BestBooksKids – main.js
   ============================================================ */

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.25)';
  } else {
    navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.18)';
  }
});

// --- Hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// --- Book Data ---
const BOOKS = {
  '3-5': [
    { emoji:'🐻', title:'Goldilocks and the Three Bears', author:'Traditional', age:'3–5', stars:'★★★★★', badge:'bestseller', subject:'stories', genre:'moral', level:'beginner', price:'low', rating:4.9 },
    { emoji:'🦊', title:'Panchatantra Tales', author:'Vishnu Sharma', age:'4+', stars:'★★★★★', badge:'bestseller', subject:'stories', genre:'moral', level:'beginner', price:'low', rating:4.8 },
    { emoji:'🐛', title:'The Very Hungry Caterpillar', author:'Eric Carle', age:'3+', stars:'★★★★★', badge:'award', subject:'science', genre:'story', level:'beginner', price:'mid', rating:5.0 },
    { emoji:'🌙', title:'Goodnight Moon', author:'Margaret Wise Brown', age:'3–5', stars:'★★★★☆', badge:'bestseller', subject:'english', genre:'story', level:'beginner', price:'low', rating:4.6 },
    { emoji:'🐘', title:'Tusk Tusk', author:'David McKee', age:'4+', stars:'★★★★☆', badge:'new', subject:'stories', genre:'moral', level:'beginner', price:'low', rating:4.4 },
  ],
  '6-8': [
    { emoji:'🦁', title:'The Lion Who Learned to Listen', author:'R.K. Narayan', age:'6+', stars:'★★★★★', badge:'bestseller', subject:'stories', genre:'moral', level:'beginner', price:'low', rating:4.9 },
    { emoji:'🚀', title:"George's Secret Key to the Universe", author:'S. Hawking', age:'7+', stars:'★★★★★', badge:'award', subject:'science', genre:'adventure', level:'intermediate', price:'mid', rating:4.8 },
    { emoji:'🧩', title:'Magic Tree House', author:'Mary Pope Osborne', age:'6–8', stars:'★★★★☆', badge:'bestseller', subject:'history', genre:'adventure', level:'beginner', price:'low', rating:4.7 },
    { emoji:'🐼', title:'Geronimo Stilton', author:'Geronimo Stilton', age:'7+', stars:'★★★★★', badge:'bestseller', subject:'english', genre:'adventure', level:'beginner', price:'low', rating:4.8 },
    { emoji:'🌿', title:'The Jungle Book', author:'Rudyard Kipling', age:'8+', stars:'★★★★★', badge:'award', subject:'english', genre:'adventure', level:'intermediate', price:'low', rating:4.9 },
  ],
  '9-12': [
    { emoji:'🔭', title:"A Brief History of Time (Young)", author:'Stephen Hawking', age:'10+', stars:'★★★★★', badge:'award', subject:'science', genre:'biography', level:'advanced', price:'mid', rating:4.9 },
    { emoji:'🧙', title:"Harry Potter and the Philosopher's Stone", author:'J.K. Rowling', age:'10+', stars:'★★★★★', badge:'bestseller', subject:'english', genre:'fantasy', level:'advanced', price:'mid', rating:4.9 },
    { emoji:'🦸', title:'Amar Chitra Katha Collection', author:'Anant Pai', age:'9+', stars:'★★★★★', badge:'bestseller', subject:'history', genre:'mythology', level:'intermediate', price:'low', rating:4.8 },
    { emoji:'🌊', title:'Island of the Blue Dolphins', author:"Scott O'Dell", age:'10+', stars:'★★★★☆', badge:'award', subject:'english', genre:'adventure', level:'intermediate', price:'mid', rating:4.5 },
    { emoji:'🧪', title:'Science Comics: Dinosaurs', author:'Various', age:'9–12', stars:'★★★★☆', badge:'new', subject:'science', genre:'comics', level:'intermediate', price:'mid', rating:4.5 },
  ],
  '13-16': [
    { emoji:'🌌', title:'The Alchemist', author:'Paulo Coelho', age:'13+', stars:'★★★★★', badge:'bestseller', subject:'english', genre:'adventure', level:'advanced', price:'mid', rating:4.9 },
    { emoji:'🦅', title:'Wings of Fire', author:'A.P.J. Abdul Kalam', age:'14+', stars:'★★★★★', badge:'award', subject:'biography', genre:'biography', level:'advanced', price:'low', rating:4.9 },
    { emoji:'🔍', title:'The Complete Sherlock Holmes', author:'Arthur Conan Doyle', age:'13+', stars:'★★★★★', badge:'bestseller', subject:'english', genre:'adventure', level:'advanced', price:'mid', rating:4.8 },
    { emoji:'⚡', title:'Percy Jackson: The Lightning Thief', author:'Rick Riordan', age:'13+', stars:'★★★★★', badge:'bestseller', subject:'history', genre:'fantasy', level:'advanced', price:'mid', rating:4.9 },
    { emoji:'🤖', title:'I, Robot', author:'Isaac Asimov', age:'15+', stars:'★★★★☆', badge:'new', subject:'science', genre:'adventure', level:'advanced', price:'mid', rating:4.6 },
  ]
};

// Flatten all books
const ALL_BOOKS = Object.entries(BOOKS).flatMap(([age, books]) =>
  books.map(b => ({ ...b, ageGroup: age }))
);

// --- Build a book card HTML string ---
function bookCardHTML(b, linkTo = 'book-detail.html') {
  const badgeLabel = { bestseller: 'Best Seller', new: 'New', award: 'Award' }[b.badge] || '';
  return `
    <a href="${linkTo}" class="book-card">
      <div class="book-cover">${b.emoji}<span class="book-badge badge-${b.badge}">${badgeLabel}</span></div>
      <div class="book-info">
        <div class="book-title">${b.title}</div>
        <div class="book-author">${b.author}</div>
        <div class="book-meta">
          <span class="stars">${b.stars}</span>
          <span class="book-age">${b.age}</span>
        </div>
        <div class="book-buy-hint">View Details →</div>
      </div>
    </a>`;
}

// --- Homepage: age tab filtering ---
const booksGrid = document.getElementById('booksGrid');
if (booksGrid) {
  renderHomeBooks('3-5');
}

function renderHomeBooks(age) {
  if (!booksGrid) return;
  booksGrid.innerHTML = (BOOKS[age] || []).map(b => bookCardHTML(b)).join('');
}

window.filterBooks = function(btn, age) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderHomeBooks(age);
};
