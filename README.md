# atoosaz.github.io

Personal website of **Atoosa Ayazbakhsh Ziyabari**: M.Sc. researcher in Mechanical Engineering at the University of Alberta, working on robotics, machine learning and rehabilitation.

**Live:** https://atoosaz.github.io

## Structure

```
index.html                  Home page (About, Research, Experience, Education, Projects, Skills, Publications)
about.html                  About me & hobbies (travelling, painting, Pilates, web design)
archive.html                Full project archive (table)
404.html                    Not-found page
favicon.svg
assets/
  css/style.css             All styles (colours are CSS variables at the top)
  js/main.js                Light/dark toggle + cursor spotlight + active-section nav highlighting
  img/projects/             Project thumbnails (16:10)
  img/about/                Photos for the About page (3:4 portrait)
  img/og.png                Link-preview image for social sites
  Atoosa_Ayazbakhsh_Ziyabari_Resume.pdf
```

## Editing

- **Add an experience or project:** copy an existing `<li>…</li>` block in `index.html` and change the text. Cards with a link use `<a>` in the title; cards without a link use `<span class="plain">`.
- **Project thumbnails:** drop a 16:10 image (e.g. 640×400) into `assets/img/projects/` and point the card's `<img class="thumb">` at it.
- **Archive:** add a `<tr>` to the table in `archive.html`.
- **Skills:** add or remove a `<li><div class="pill">…</div></li>` line in the Skills section of `index.html`; copy a whole `<div>…</div>` row to add a new category.
- **Résumé:** replace `assets/Atoosa_Ayazbakhsh_Ziyabari_Resume.pdf` with a new file of the same name.
- **Colours:** change the variables in `:root` (dark, the default) and `:root[data-theme="light"]` (light) at the top of `assets/css/style.css`.
- **New pages:** copy the one-line `<script>` above the stylesheet link in the `<head>` of an existing page, so a visitor's light-mode choice applies without a dark flash.

To preview locally, run `python3 -m http.server` in this folder and open http://localhost:8000.
