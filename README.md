# TransientAI site

The website of **TransientAI**, the creator of the open [Transient](https://github.com/DawsMacs/Transient) project.
Plain static HTML, one stylesheet, one small script. No framework, no build step.
The pages themselves load nothing from other sites (Lexend and Josefin Sans are self-hosted under the SIL OFL, see `fonts/`; Josefin Sans is used only for the TransientAI wordmark, everything else is Lexend).

This is a separate repository from `Transient` on purpose: the project is the research, this is the organisation's site.

## Layout

```
index.html                 home
baby.html                  the project and its first prototype
research.html              research hub, then: adaptive-learning, efficiency, why-rust, hardware, method
docs.html                  build, commands, concepts, code map, contributing
progress.html              roadmap, what we do not know yet, timeline
about.html                 TransientAI, the one-person team, how we work
blog/index.html            blog index
blog/beginning.html        first post
404.html
css/site.css  js/site.js   styling (dark first, light via prefers-color-scheme) and progressive enhancements
assets/                    logo mark, favicon, blog art (cover-beginning.svg, blog-banner.svg: plain SVG built from the mark)
```

All links are relative, so the site works from any folder or sub-path.

## Preview

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

then open <http://127.0.0.1:8765/>.

## Editing notes

- The header and footer are repeated in every page (no templating), so a navigation change means editing each file
  (`grep -l 'id="site-nav"' *.html blog/*.html`). Pages in `blog/` use `../` prefixes.
- Every number on the site comes from the Transient repository's docs (`README.md`, `baby/README.md`,
  `TransientHandover.md`) or from a real run of `baby school` / `baby ask`. When the project's numbers change, update them here.
  Keep the caveats next to them.
- Do not guess what the name "Transient" means; the project keeps that open.
- Hardware is described only roughly on purpose. Do not add personal or device-specific details.
- `404.html` uses root-relative links (`/css/site.css`), because a 404 can be served at any path; it only renders correctly when the site is served from the domain root (`https://transientai.org/`).
- Domain: `CNAME` holds `transientai.org`. `<link rel="canonical">`, `og:` tags, `sitemap.xml`, `feed.xml` and `robots.txt` use that absolute URL.
- `assets/og-image.png` (1200x630) is the social preview; it was rendered from an SVG with the brand fonts and is not regenerated automatically.

## Licensing

- **Code** (HTML, CSS, JS): MIT, see `LICENSE`.
- **Text and original blog art**: CC BY 4.0, see `LICENSE-content`.
- **The TransientAI mark and wordmark, and the names "TransientAI" and "Transient"**: not licensed, all rights reserved.
  Quote and link freely; do not present your work as TransientAI's. The blog art contains the mark; remove or replace it if you adapt the art.
- **Fonts**: SIL OFL 1.1 (`fonts/`).
- The **Transient** project's code is a separate repository under AGPL-3.0-or-later.

## Hosting

GitHub Pages, deploying `main` from the repository root, on the custom domain `transientai.org` (DNS settings are in the repository's Pages settings and at the registrar or DNS provider).
