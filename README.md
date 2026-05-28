# 📚 BestBooksKids Website

A complete children's book recommendation website for parents, teachers, and students in India.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage with hero, age tabs, featured book, categories |
| `books.html` | Browse & filter page with sidebar filters |
| `book-detail.html` | Full book detail with tabs, reviews, buy links |
| `categories.html` | All subjects & genres |
| `about.html` | About us & affiliate disclosure |

## File Structure

```
bestbookskids/
├── index.html
├── books.html
├── book-detail.html
├── categories.html
├── about.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── browse.js
└── README.md
```

## 🚀 How to Host on GitHub Pages (Step by Step)

### Step 1 – Create a GitHub Account
Go to https://github.com and sign up (free).

### Step 2 – Create a New Repository
1. Click the **+** icon → **New repository**
2. Name it: `bestbookskids` (or any name you like)
3. Set it to **Public**
4. Click **Create repository**

### Step 3 – Upload Your Files
**Option A – Using GitHub Website (Easiest):**
1. On your new repository page, click **Add file → Upload files**
2. Drag and drop ALL your files and folders (`index.html`, `books.html`, `css/`, `js/`, etc.)
3. Make sure to **maintain the folder structure** — upload `css/style.css` inside a `css` folder
4. Scroll down → click **Commit changes**

**Option B – Using Git (Command Line):**
```bash
git init
git add .
git commit -m "Initial website upload"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/bestbookskids.git
git push -u origin main
```

### Step 4 – Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Choose branch: **main**, folder: **/ (root)**
6. Click **Save**

### Step 5 – Get Your Website URL
After 1–2 minutes, your website will be live at:
```
https://YOUR-USERNAME.github.io/bestbookskids/
```

## 🛒 Adding Affiliate Links (Amazon)

1. Sign up at: https://affiliate-program.amazon.in/
2. Once approved, generate links for each book
3. Open `index.html`, `book-detail.html` etc. and replace:
   ```html
   href="https://www.amazon.in/s?k=Harry+Potter+..."
   ```
   with your actual affiliate link.

## ✏️ How to Add More Books

Open `js/main.js` and add to the `BOOKS` object:
```javascript
'9-12': [
  {
    emoji: '🌍',
    title: 'My New Book Title',
    author: 'Author Name',
    age: '10+',
    stars: '★★★★★',
    badge: 'new',           // bestseller | new | award
    subject: 'science',     // science | maths | english | history | coding | gk
    genre: 'adventure',     // fantasy | adventure | moral | biography | comics | mythology
    level: 'intermediate',  // beginner | intermediate | advanced
    price: 'mid',           // low | mid | high
    rating: 4.7
  },
  // ... more books
]
```

## 📞 Contact

For help or custom changes, feel free to reach out.
