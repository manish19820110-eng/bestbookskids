/* ============================================================
   BestBooksKids – browse.js  (books.html only)
   ============================================================ */

// Read URL params on page load
const params = new URLSearchParams(window.location.search);
const paramAge = params.get('age') || '';
const paramSubject = params.get('subject') || '';
const paramGenre = params.get('genre') || '';

// Pre-check filters from URL
document.addEventListener('DOMContentLoaded', () => {
  if (paramAge) {
    const radio = document.querySelector(`input[name="age"][value="${paramAge}"]`);
    if (radio) radio.checked = true;
  }
  if (paramSubject) {
    const cb = document.querySelector(`input[value="${paramSubject}"]`);
    if (cb) cb.checked = true;
  }
  if (paramGenre) {
    const cb = document.querySelector(`input[value="${paramGenre}"]`);
    if (cb) cb.checked = true;
  }
  applyFilters();
});

window.applyFilters = function () {
  const ageVal = document.querySelector('input[name="age"]:checked')?.value || '';
  const levelVal = document.querySelector('input[name="level"]:checked')?.value || '';
  const priceVal = document.querySelector('input[name="price"]:checked')?.value || '';
  const ratingVal = parseFloat(document.querySelector('input[name="rating"]:checked')?.value || '0');
  const sortVal = document.getElementById('sortBy')?.value || 'popular';

  const checkedSubjects = [...document.querySelectorAll('input[type=checkbox]:checked')]
    .filter(cb => ['science','maths','english','history','coding','gk'].includes(cb.value))
    .map(cb => cb.value);

  const checkedGenres = [...document.querySelectorAll('input[type=checkbox]:checked')]
    .filter(cb => ['fantasy','adventure','moral','biography','comics','mythology'].includes(cb.value))
    .map(cb => cb.value);

  let filtered = ALL_BOOKS.filter(b => {
    if (ageVal && b.ageGroup !== ageVal) return false;
    if (levelVal && b.level !== levelVal) return false;
    if (priceVal && b.price !== priceVal) return false;
    if (ratingVal && b.rating < ratingVal) return false;
    if (checkedSubjects.length && !checkedSubjects.includes(b.subject)) return false;
    if (checkedGenres.length && !checkedGenres.includes(b.genre)) return false;
    return true;
  });

  // Sorting
  if (sortVal === 'rating') filtered.sort((a,b) => b.rating - a.rating);
  else if (sortVal === 'newest') filtered.reverse();
  else if (sortVal === 'price-low') {
    const order = { low:0, mid:1, high:2 };
    filtered.sort((a,b) => order[a.price] - order[b.price]);
  } else if (sortVal === 'price-high') {
    const order = { low:0, mid:1, high:2 };
    filtered.sort((a,b) => order[b.price] - order[a.price]);
  }

  const grid = document.getElementById('browseGrid');
  const countEl = document.getElementById('resultsCount');

  if (countEl) countEl.textContent = `Showing ${filtered.length} book${filtered.length !== 1 ? 's' : ''}`;

  if (grid) {
    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted)">
        <div style="font-size:3rem;margin-bottom:1rem">📭</div>
        <p style="font-size:16px;font-weight:600">No books match your filters</p>
        <p style="font-size:14px;margin-top:8px">Try removing a filter or <button onclick="clearFilters()" style="background:none;border:none;color:var(--green-600);font-weight:600;cursor:pointer;font-size:14px">clearing all filters</button></p>
      </div>`;
    } else {
      grid.innerHTML = filtered.map(b => bookCardHTML(b)).join('');
    }
  }
};

window.clearFilters = function () {
  document.querySelectorAll('input[name="age"]')[0].checked = true;
  document.querySelectorAll('input[name="level"]')[0].checked = true;
  document.querySelectorAll('input[name="price"]')[0].checked = true;
  document.querySelectorAll('input[name="rating"]')[0].checked = true;
  document.querySelectorAll('input[type=checkbox]').forEach(cb => cb.checked = false);
  document.getElementById('sortBy').value = 'popular';
  applyFilters();
};
