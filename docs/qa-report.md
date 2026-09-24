# QA report

Date: 2026-09-24
Phase: Full source implementation

## Source-level checks

- Bilingual route structure: implemented.
- Light and dark modes: implemented.
- Responsive layout from 320px: implemented in CSS.
- Mobile menu with ARIA state and Escape handling: implemented.
- Search interface: implemented.
- Contact form: all requested contact fields required, privacy acknowledgement required, server-side CAPTCHA verification required when configured.
- Newsletter: double opt-in flow implemented with sandbox confirmation output, consent record and suppression behavior.
- Job application: PDF/DOCX allowlist, size limit, extension and file-signature validation, private storage outside the public directory, role-protected reviewer download.
- Admin authentication: implemented with scrypt password hashing, signed HttpOnly session cookie, inactivity expiry and role checks.
- Audit log: implemented for admin login, logout and CV downloads.
- Secrets: no production secrets committed. `.env.example` provided.
- Social media: no unverified accounts rendered. `content/socials.json` is ready for later company input.
- Supplied logos and photographs copied without alteration.
- No stock people or competitor assets added.
- Placeholder content markers are kept outside public rendering.

## Automated checks included

- Placeholder scanner: `npm run check:placeholders`.
- Build: `npm run build`.
- Link-check script: `npm run check:links`.
- Playwright suite scaffold: `npm run test:e2e`.
- Dependency audit: `npm run audit`.

## Environment limitation during this build

The execution environment timed out twice while running `npm install`. Therefore a completed dependency installation and production Vite build could not be claimed from this environment.

Run `npm install` locally in VS Code, then run `npm run check` before deployment.

## Still required before public launch

- Company legal identity confirmation.
- Official phone, email and physical address.
- Domain confirmation.
- Company registration and tax details where required.
- Privacy contact and legal representative.
- Written photo ownership/license and subject consent records.
- Approved French expert biographies and titles.
- Approved legal texts and legal review in both languages.
- CAPTCHA production keys.
- Production email provider and data-processing review.
- Recruitment retention period and deletion schedule.
- Actuality, Insights, Projects and job content approved by the company.
- Production database/object storage review if JSON storage is replaced for deployment.
- Full browser, screen-reader, Lighthouse, axe-core and HTTP integration testing.
