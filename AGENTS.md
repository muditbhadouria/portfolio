# Repository Guidelines

## Project Structure & Module Organization

- `index.html` holds the full single-page portfolio layout, organized into semantic sections (hero, about, skills, projects, experience, contact).
- `styles.css` contains the global theme, responsive layout utilities, and component styles; grouped by page sections for quick scanning.
- `script.js` provides light interaction (mobile nav toggle, section highlighting, smooth scroll, footer year helper).
- `assets/` is reserved for images or downloadable assets; keep subfolders by asset type (e.g., `assets/images/`).

## Development & Preview Commands

- `open index.html` (macOS) or `start index.html` (Windows) opens the static site in your default browser.
- `python3 -m http.server 8000` (run from repo root) serves the site locally with HTTP to mimic production paths; stop with `Ctrl+C`.

## Coding Style & Naming Conventions

- Use two-space indentation for HTML, CSS, and JavaScript to match the existing files.
- Use single quotes in JavaScript instead of double quotes.
- Prefer semantic HTML elements (`section`, `nav`, `article`) and hyphenated class names (`hero-card`).
- In CSS, colocate section-specific rules under comment headers if adding new blocks; keep variables in `:root`.
- JavaScript should remain vanilla ES6; export-free modular helpers can live near usage inside `script.js` unless the file grows beyond 300 lines.

## Testing Guidelines

- No automated tests are configured. Manually verify responsive layouts at 320px, 768px, and 1280px breakpoints before opening a PR.
- If you introduce JS-heavy features, add lightweight browser-based checks (e.g., console asserts) and document them in the PR.

## Commit & Pull Request Guidelines

- Follow the concise, present-tense style used in `Initial portfolio scaffold` (e.g., `Add project carousel interaction`).
- Group related changes per commit; avoid bundling style updates with structural rewrites.
- Pull requests should include: a short summary, screenshots or screen recordings for visible changes, and notes on manual testing.
- Reference related GitHub issues with `Fixes #123` syntax when applicable; ensure the site builds on GitHub Pages before requesting review.

## Deployment Notes

- GitHub Pages deploys from `main` using the repository root. After merging, allow a minute for Pages to update and then validate the live URL.
- Custom domains require adding a `CNAME` file at repo root and configuring DNS records per GitHub’s guidance.
