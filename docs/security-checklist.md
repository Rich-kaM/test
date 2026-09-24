# Security checklist

Implemented:
- No real secrets in source.
- `.env.example` only.
- Signed, HttpOnly, SameSite session cookie.
- Secure cookie flag in production.
- Scrypt password hashing.
- Session expiry.
- Role-based admin API checks.
- Rate limiting on public submission and login endpoints.
- Server-side CAPTCHA verification.
- Upload size, extension and file-signature validation.
- Uploaded CVs stored outside public web root.
- CV downloads require Recruiter or Admin role.
- Audit records for sensitive admin actions.
- Helmet security headers and CSP baseline.
- Same-origin protection for mutating production endpoints.
- Generic login errors to reduce account enumeration.

Pending before launch:
- External dependency audit.
- Production database least-privilege review.
- Malware scanning service for uploaded documents.
- MFA for administrators.
- Secret rotation procedure.
- Backup encryption and restore test.
- HSTS preload decision.
- Full penetration test.
