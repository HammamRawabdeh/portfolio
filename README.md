# Portfolio Website

A clean, professional multi-page portfolio built with **HTML5, CSS3, and vanilla JavaScript** — no frameworks required. Deployable on GitHub Pages in minutes.

---

## File Structure

```
portfolio/
│
├── index.html          → Home page (hero, CTA buttons)
├── projects.html       → Project cards with tech stack & links
├── research.html       → Placeholder "coming soon" page
├── skills.html         → Skills DL lists + certifications
├── leadership.html     → Timeline of experience & roles
├── resume.html         → Resume download page
├── contact.html        → GitHub, Email, LinkedIn links
│
├── css/
│   └── styles.css      → All styles (design tokens, layout, components)
│
├── js/
│   └── script.js       → Nav toggle, animations, scroll progress
│
└── assets/
    ├── images/         → Screenshots, cert images (cert-aws.png, etc.)
    ├── videos/         → Any locally hosted video demos
    └── resume/         → Place resume.pdf and cv.pdf here
```

---

## Quickstart

1. **Clone or download** this folder.
2. Open `index.html` in any browser — no build step needed.
3. Customize (see below).
4. Deploy to GitHub Pages by pushing to a repo and enabling Pages in Settings.

---

## Customization Checklist

### Personal info (all 7 HTML files)
- [ ] Replace `Your Name` with your full name in every `<title>`, nav logo, footer, and hero.
- [ ] Update `Your University` and graduation date in `index.html`.
- [ ] Replace all `yourusername` links with your GitHub/LinkedIn handles.
- [ ] Replace `youremail@example.com` with your real email in `contact.html`.

### Assets
- [ ] Add `assets/resume/resume.pdf` — your resume PDF.
- [ ] Add `assets/resume/cv.pdf` — your full CV PDF (or point both to the same file).
- [ ] Add project screenshots to `assets/images/` and uncomment the `<img>` tags in `projects.html`.
- [ ] Add certificate images to `assets/images/` and uncomment the `<img>` tags in `skills.html`.

### Projects (`projects.html`)
- [ ] Update each project card: title, description, tech stack, GitHub link.
- [ ] Optionally uncomment the `<div class="project-video">` block and add a YouTube embed URL.
- [ ] Add or remove project cards by duplicating / deleting `<article class="card project-card">` blocks.

### Skills (`skills.html`)
- [ ] Update DL items with your actual skills and descriptions.
- [ ] Update certification names and images.

### Leadership (`leadership.html`)
- [ ] Update timeline items with your actual roles, organizations, and achievements.

---

## Design Tokens

All colors, fonts, and spacing are defined as CSS variables at the top of `css/styles.css` inside `:root {}`. To retheme the site, change the values there:

```css
:root {
  --color-accent:  #c9a84c;   /* change to any accent color */
  --color-bg:      #0d0d0d;   /* change for a light theme */
  --color-text:    #f0ead6;   /* primary text color */
  --font-display:  'Playfair Display', Georgia, serif;
  --font-body:     'DM Sans', sans-serif;
}
```

---

## Deploying to GitHub Pages

1. Create a new GitHub repository.
2. Push the `portfolio/` folder contents to the repo root.
3. Go to **Settings → Pages → Source** and select `main` branch, `/ (root)`.
4. Your site will be live at `https://yourusername.github.io/repo-name/`.

> **Note**: Make sure `assets/resume/resume.pdf` exists before deploying, or the download buttons will 404.
