# Matterworm site

The website of the **Matterworm Foundation**, the creator of the open [Matter](https://github.com/Matterworm/Matter) project.
Plain static HTML, one stylesheet, one small script. No framework, no build step.
The pages themselves load nothing from other sites (Lexend and Josefin Sans are self-hosted under the SIL OFL, see `fonts/`; Josefin Sans is used only for the Matterworm wordmark, everything else is Lexend).

This is a separate repository from `Matter` on purpose: the project is the research, this is the organization's site.

## Layout

```
index.html                 home
baby.html                  the project and its first prototype
research.html              research hub, then: recursive-meta-adaptive-learning, efficiency, why-rust, hardware, method
docs.html                  build, run it on your platform, commands, concepts, code map, contributing
progress.html              roadmap, what we do not know yet, timeline
about.html                 the Matterworm Foundation, the founder and founding member, how we work
blog/index.html            blog index
blog/beginning.html        first post (blog/entry-exam.html and blog/platforms.html follow it)
404.html
css/site.css  js/site.js   styling (dark first, light via prefers-color-scheme) and progressive enhancements
assets/                    logo mark, favicon, social preview, blog art (point-based SVG covers and matching PNG social previews)
```

All links are relative, so the site works from any folder or sub-path.

## Preview

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

then open <http://127.0.0.1:8765/>.

Internal links have no `.html` extension (`/about`, `/blog/`), which GitHub Pages resolves to the matching file. Python's
`http.server` does not, so on that local server the nav links will 404 unless you add `.html` by hand; the home page,
styling and any direct `*.html` URL still work.

## Editing notes

- The header and footer are repeated in every page (no templating), so a navigation change means editing each file
  (`grep -l 'id="site-nav"' *.html blog/*.html`). Pages in `blog/` use `../` prefixes.
- Every number on the site comes from the Matter repository's docs (`README.md`, `baby/README.md`) or from a real run of `baby school` / `baby ask`. When the project's numbers change, update them here.
  Keep the caveats next to them.
- Do not guess what the name "Matter" means; the project keeps that open.
- Hardware is described only roughly on purpose. Do not add personal or device-specific details.
- `404.html` uses root-relative links (`/css/site.css`), because a 404 can be served at any path; it only renders correctly when the site is served from the domain root (`https://matterworm.github.io/`).
- Address: the site is the organization's GitHub Pages site, `https://matterworm.github.io/`, so this repository is named `matterworm.github.io` and there is no `CNAME` file. `<link rel="canonical">`, `og:` tags, `sitemap.xml`, `feed.xml` and `robots.txt` use that absolute URL. When a custom domain is bought: add a `CNAME` file, replace the address in those files, and set the domain in the repository's Pages settings.
- `assets/og-image.png` (1200x630) is the social preview; it was rendered from an SVG with the brand fonts and is not regenerated automatically.
- `assets/motion-adaptive.svg`, `motion-energy.svg`, and `motion-honesty.svg` are shared by the home and research cards and their matching page headers. The research hub adds `motion-rust.svg` (code and a gear), `motion-hardware.svg` (a laptop and its processor), and `motion-progress.svg` (a path through milestones). These decorative, conceptual animations use fine points, pale blue activity, and coral error marks; they are not run transcripts or measured results. They work without JavaScript, adapt to the color scheme, and show still compositions when reduced motion is requested.

## Icons

Icons are Lucide, with Phosphor (regular weight) only where Lucide has no equivalent (the GitHub mark). They live in an inline SVG sprite at the top of every page
(`<svg ...><symbol id="zap">...`) and are used as `<svg class="icon"><use href="#zap"/></svg>`. To add an icon, copy its symbol into the sprite on every page.

## Licensing

- **Code** (HTML, CSS, JS): MIT, see `LICENSE`.
- **Text and original blog art**: CC BY 4.0, see `LICENSE-content`.
- **The Matterworm mark and wordmark, and the names "Matterworm", "Matterworm Foundation" and "Matter"**: not licensed, all rights reserved.
  Quote and link freely; do not present your work as the Matterworm Foundation's. The blog art contains the mark; remove or replace it if you adapt the art.
- **Fonts**: SIL OFL 1.1 (`fonts/`).
- **Icons**: [Lucide](https://lucide.dev) (ISC) and, for the GitHub mark only, [Phosphor](https://phosphoricons.com) regular (MIT); see `LICENSE-icons`.
- The **Matter** project's code is a separate repository under AGPL-3.0-only.

## Hosting

GitHub Pages, deploying `main` from the repository root, at `https://matterworm.github.io/` (Settings > Pages: deploy from the `main` branch, root folder, no custom domain for now).
