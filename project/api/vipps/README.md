# Vipps API (stub)

Enkel stub for å lagre Vipps-innstillinger og simulere betalinger.

- `GET /api/vipps/settings` – hent lagrede nøkler og miljø
- `POST /api/vipps/settings` – oppdater innstillinger (se `settings.js`)
- `POST /api/vipps/payments` – opprett en dummy-betaling som returnerer redirect-URL basert på `callback_url`

Payload for lagring:

```json
{
  "merchant_serial_number": "...",
  "client_id": "...",
  "client_secret": "...",
  "subscription_key": "...",
  "callback_url": "https://...",
  "environment": "test" | "production",
  "active": true
}
```

Ved medlemsbetaling henter klienten `GET /api/vipps/settings` for aktuell streamer, kaller `POST /api/vipps/payments` med `amount`, `orderId` og `returnUrl`, og sender brukeren til `redirectUrl` som returneres.
