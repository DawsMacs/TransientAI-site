# TransientAI site

The website of **TransientAI**, the creator of the open [Transient](https://github.com/DawsMacs/Transient) project.
Plain static HTML, one stylesheet, one small script. No framework, no build step, no trackers, no third-party requests
(Lexend and Josefin Sans are self-hosted under the SIL OFL, see `fonts/`; Josefin Sans is used only for the TransientAI wordmark, everything else is Lexend).

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
- `404.html` uses relative links, so on a static host it only renders fully at the site root; make its links absolute
  once the final domain or sub-path is known.

## Open decisions

- Hosting and domain (GitHub Pages from this repo is the simplest: serve the repository root).
- Licence for the site's text and design (the Transient code is AGPL-3.0-or-later; the site currently says only "© 2026 Daws Macs").
- Social-preview image and absolute `og:` URLs, once the domain is known. An RSS feed likewise needs absolute URLs.
