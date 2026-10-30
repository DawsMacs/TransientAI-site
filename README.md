# Matterworm site

The website of the **Matterworm Foundation**, the creator of the open [Matter](https://github.com/Matterworm/Matter) project.
Plain static HTML, one stylesheet, one small script. No framework, no build step.
The pages themselves load nothing from other sites (Lexend and Josefin Sans are self-hosted under the SIL OFL, see `fonts/`; Josefin Sans is used only for the Matterworm wordmark, everything else is Lexend).

This is a separate repository from `Matter` on purpose: the project is the research, this is the organization's site.

## Layout

```
index.html                 home
novice.html                current research snapshot, results and release
baby.html                  frozen reference and historical results
sparse-generative-learning.html  generative research retrospective
research.html              research hub, then: recursive-meta-adaptive-learning, efficiency, why-rust, hardware, method
docs.html                  build, run it on your platform, commands, concepts, code map, contributing
progress.html              roadmap, what we do not know yet, timeline
about.html                 the Matterworm Foundation, the founder and founding member, how we work
blog/index.html            blog index
blog/beginning.html        first post (entry-exam, platforms, and baby-to-novice follow it)
404.html
css/site.css  js/site.js   styling (dark first, light via prefers-color-scheme) and progressive enhancements
assets/                    logo mark, favicon, social preview, blog art (point-based SVG covers and PNG previews; generated PNG art for baby-to-novice)
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
- Every number on the site comes from the Matter repository's docs (`README.md`, `novice/README.md`, `baby/README.md`, `docs/`) or from a real run of `baby school` / `baby ask`. When the project's numbers change, update them here.
  Keep the caveats next to them.
- Do not guess what the name "Matter" means; the project keeps that open.
- Hardware is described only roughly on purpose. Do not add personal or device-specific details.
- `404.html` uses root-relative links (`/css/site.css`), because a 404 can be served at any path; it only renders correctly when the site is served from the domain root (`https://matterworm.org/`).
- Address: the primary domain is `https://matterworm.org/`. `CNAME` contains `matterworm.org`; `<link rel="canonical">`, `og:` tags, `sitemap.xml`, `feed.xml` and `robots.txt` use that absolute URL. The repository keeps its name, `matterworm.github.io`.
- Existing RSS item GUIDs remain stable across domain changes so subscribers do not receive duplicate entries.
- `assets/og-image.png` (1200x630) is the social preview; it was rendered from an SVG with the brand fonts and is not regenerated automatically.
- `assets/motion-adaptive.svg`, `motion-energy.svg`, and `motion-honesty.svg` are shared by the home and research cards and their matching page headers. The research hub adds `motion-rust.svg` (code and a gear), `motion-hardware.svg` (a laptop and its processor), and `motion-progress.svg` (a path through milestones). These decorative, conceptual animations use fine points, pale blue activity, and coral error marks; they are not run transcripts or measured results. They work without JavaScript, adapt to the color scheme, and show still compositions when reduced motion is requested.

- The recursive meta-adaptive learning page includes a 46-second conceptual short (`css/rmal-story.css`, `js/rmal-story.js`) about a robot crossing a changing course. It illustrates the ambition, not a recorded prototype result. Playback starts when the player enters view, pauses when it leaves view or the tab is hidden, and can be paused, replayed, or scrubbed by chapter. Reduced motion defaults to the completed still; playback remains available by choice. Without JavaScript, the still and a text transcript remain available.

- `assets/points-novice.png` is original artwork generated with the built-in image generation tool, using the three existing point-based covers as style references. It serves as the Novice blog cover, index thumbnail, and social preview (1200x630).

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

GitHub Pages, deploying `main` from the repository root. Configure Settings > Pages with `matterworm.org` as the custom domain and enable Enforce HTTPS once GitHub has issued its certificate.

Both domains are registered at Namecheap, with DNS managed through Cloudflare after switching each domain to its assigned Cloudflare nameservers. Preserve any email and verification records when switching DNS providers.

For `matterworm.org`, use these records with TTL Auto and proxy status **DNS only**:

| Type | Name | Target |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | matterworm.github.io |

Verify `matterworm.org` in the Matterworm organization's GitHub Pages settings using GitHub's supplied TXT record, and keep that record. Configure the repository's custom domain before directing website traffic to GitHub. GitHub Pages handles the `www.matterworm.org` redirect to the primary domain.

For `matterworm.com`, create a proxied A record for `@` targeting `192.0.2.1` and a proxied CNAME record for `www` targeting `matterworm.com`. In that Cloudflare zone, create a Single Redirect matching `(http.host in {"matterworm.com" "www.matterworm.com"})`, using the dynamic destination `concat("https://matterworm.org", http.request.uri.path)`, status **301**, and **Preserve query string** enabled. Cloudflare serves this redirect without contacting an origin; activate it after the primary site works over HTTPS and Cloudflare's edge certificate is active for the redirect domain.

DNS and redirect references: [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [GitHub Pages domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages), and [Cloudflare Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/).
