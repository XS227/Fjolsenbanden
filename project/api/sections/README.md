# Sections API (stub)

Dette kataloget er et plassholder for endepunkter som lagrer og leverer seksjonsdata i JSON-format.

## Dataformat

Alle seksjoner følger modellen i `project/models/SectionModel.js` med feltene:

- `id` (int)
- `key` (string)
- `title` (string)
- `content` (JSON) – alt innholdet til seksjonen
- `order` (int)
- `visible` (bool)

## Eksempel payload

```json
{
  "id": 1,
  "key": "hero",
  "title": "Hero",
  "order": 1,
  "visible": true,
  "content": {
    "title": "Fjolsenbanden – Spillglede for hele familien",
    "subtitle": "Livestreams, premier og trygg gamingcommunity",
    "cta_text": "Bli med!",
    "cta_link": "#player-cards"
  }
}
```

API-et bør støtte `GET /api/sections` (liste), `GET /api/sections/:key` og `POST /api/sections/:key` for å oppdatere innholdet.
