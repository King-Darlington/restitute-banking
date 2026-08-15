# Self-hosted Supabase on Plesk — Email & Auth Checklist

This note collects the non-functional and operational steps required to run Supabase (Auth + email) on a server managed by Plesk. Use this as a checklist when you self-host Supabase on Plesk or a Plesk-managed VM.

## Summary
- Supabase provides Auth (email/magic links/password reset) and requires an SMTP provider when self-hosted.
- Plesk is a hosting/control panel — it can host the Supabase containers (Docker/Compose) or manage a VM where Supabase runs, but Plesk itself does not replace Supabase services.

## High-level prerequisites
- A server with Docker & Docker Compose (or Podman) available. Plesk can run Docker images if the Docker extension is installed.
- A public domain name and DNS control for the sending domain (for SPF/DKIM/DMARC).
- An SMTP/transactional email provider (Mailgun, SendGrid, Postmark, Amazon SES) or a properly configured SMTP server with good deliverability.
- Valid TLS certificate for the Supabase public URL (Let’s Encrypt via Plesk or your own cert).

## Environment variables (important)
Set these in your Supabase deployment environment (docker-compose .env or service settings). Replace example values.

```
SUPABASE_SITE_URL=https://auth.yourdomain.com
SUPABASE_JWT_SECRET=replace_with_a_strong_secret

# SMTP (used by Auth to send verification / reset emails)
SMTP_HOST=smtp.postmarkapp.com
SMTP_PORT=587
SMTP_USER=server-token-or-username
SMTP_PASS=your-smtp-password
SMTP_FROM_ADDRESS="no-reply@yourdomain.com"

# Optional: sender name and templates
SMTP_FROM_NAME="Restitute Banking"

# Ensure external URL is known to Supabase so links point to the right host
SITE_URL=https://www.yourdomain.com
```

Notes:
- Use credentials from a transactional provider rather than a local Plesk mail server if possible (improves deliverability).
- If your SMTP provider requires TLS, use port 587 or 465 and enable STARTTLS as appropriate.

## DNS records for good deliverability
Add these records for the sending domain (example: yourdomain.com):

- SPF (TXT)
  - Name: yourdomain.com
  - Value: `v=spf1 include:spf.mailgun.org include:sendgrid.net -all` (adjust to provider)

- DKIM (TXT)
  - Provided by your email provider. Add the selector and TXT value exactly as given.

- DMARC (TXT)
  - Name: _dmarc.yourdomain.com
  - Value: `v=DMARC1; p=quarantine; rua=mailto:postmaster@yourdomain.com; ruf=mailto:postmaster@yourdomain.com; pct=100;` (tune policy after testing)

## Plesk-specific tips
- Install Docker extension and deploy Supabase with Docker Compose or use Plesk’s “Docker” interface to run the recommended Supabase images.
- Use Plesk’s SSL/TLS management to issue/renew Let's Encrypt certificates for `SUPABASE_SITE_URL` and any API hosts.
- If using Plesk-managed mail, verify the server IP has proper reverse DNS and that outgoing port 25/465/587 is allowed by your host.

## Example minimal docker-compose excerpt (for reference)
Place these env vars in a `.env` file and reference them from your Compose file. The full Supabase self-hosted stack is more involved — consult Supabase self-host docs for all services.

```
version: '3'
services:
  auth:
    image: supabase/gotrue:latest
    environment:
      - SITE_URL=${SUPABASE_SITE_URL}
      - SMTP_HOST=${SMTP_HOST}
      - SMTP_PORT=${SMTP_PORT}
      - SMTP_USER=${SMTP_USER}
      - SMTP_PASS=${SMTP_PASS}
      - SMTP_FROM_ADDRESS=${SMTP_FROM_ADDRESS}
      - JWT_SECRET=${SUPABASE_JWT_SECRET}
    ports:
      - "9999:9999"
    restart: always

# NOTE: a complete self-hosted setup requires Postgres, Kong/Traefik, Storage, Realtime, etc.
```

## Testing the email & auth flow
1. Ensure `SUPABASE_SITE_URL` matches the URL users will open (used in verification links).
2. Create a test account via the client sign-up flow and confirm you receive an email. Check the auth service logs for SMTP errors.
3. Test password reset and magic link flows.
4. Use an email testing tool (Mailgun/Postmark logs or a mailbox test) to verify DKIM/SPF headers and spam score.

## Troubleshooting
- SMTP connection refused / timeout: check firewall and hosting provider blocks (port 25 frequently blocked). Use port 587 with TLS.
- Emails not delivered: check provider logs for bounces and verify SPF/DKIM.
- Verification links return wrong domain: ensure `SITE_URL`/`SUPABASE_SITE_URL` envs are correct.
- Local Plesk mail shows low deliverability: migrate to a transactional provider.

## Security & compliance notes
- Keep `JWT_SECRET` and SMTP credentials out of source control. Use Plesk secret storage or environment management.
- Rotate service credentials periodically.
- For banking apps consider stricter policies: MFA, device fingerprinting, rate limits, account lockout, and audit logging.

## Operational checklist before production
- Configure SMTP provider and verify DNS records.
- Issue TLS certificates for all public endpoints.
- Set up backups for Postgres (automated snapshot and PITR if available).
- Monitor auth logs, bounce rates, and server health.
- Run penetration testing or security review for authentication flows.

---

If you want, I can:
- Generate a complete `.env.example` and `docker-compose.yml` scaffold for your Plesk deployment, or
- Add a short checklist and test scripts to `package.json` for local verification.
