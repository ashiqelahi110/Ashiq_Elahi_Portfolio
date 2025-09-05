# Translation Guidelines

Strings in `i18n/*.json` are sanitized before being injected into the page.

- Plain text is inserted using `textContent`.
- If basic formatting is needed, only `<strong>`, `<em>` and line breaks `<br>` are allowed.
- Any other HTML tags or attributes will be stripped for security.
- Do **not** include scripts, event handlers, or style attributes.

This ensures translators can safely provide emphasis without exposing users to cross-site scripting (XSS) risks.
