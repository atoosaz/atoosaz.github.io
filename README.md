# atoosaz.github.io

Personal website of **Atoosa Ayazbakhsh Ziyabari**: M.Sc. researcher in Mechanical Engineering at the University of Alberta, working on robotics, machine learning and rehabilitation.

**Live:** https://atoosaz.github.io

## Structure

```
index.html                  Home page (About, Experience, Education, Projects, Publications)
archive.html                Full project archive (table)
404.html                    Not-found page
favicon.svg
assets/
  css/style.css             All styles (colours are CSS variables at the top)
  js/main.js                Cursor spotlight + active-section nav highlighting
  img/projects/             Project thumbnails (16:10)
  img/og.png                Link-preview image for social sites
  Atoosa_Ayazbakhsh_Ziyabari_Resume.pdf
```

## Editing

- **Add an experience or project:** copy an existing `<li>…</li>` block in `index.html` and change the text. Cards with a link use `<a>` in the title; cards without a link use `<span class="plain">`.
- **Project thumbnails:** drop a 16:10 image (e.g. 640×400) into `assets/img/projects/` and point the card's `<img class="thumb">` at it.
- **Archive:** add a `<tr>` to the table in `archive.html`.
- **Résumé:** replace `assets/Atoosa_Ayazbakhsh_Ziyabari_Resume.pdf` with a new file of the same name.
- **Colours:** change the variables in `:root` at the top of `assets/css/style.css`.

To preview locally, run `python3 -m http.server` in this folder and open http://localhost:8000.
