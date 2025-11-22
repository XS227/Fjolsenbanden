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

## Endepunkter

- `GET /api/sections` – liste alle seksjoner
- `GET /api/sections/:key` – les én seksjon
- `POST /api/sections/:key/update` – oppdater tittel/innhold for en seksjon (se `update.js`)

`POST /api/sections/:key/update` forventer payload:

```json
{
  "title": "...",
  "content": { "felt": "verdi" }
}
```

Backend lagrer JSON, returnerer 200 og klienten kan deretter refreshe/modul-laste seksjonen på nytt.
