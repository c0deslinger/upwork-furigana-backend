# Furigana Backend API

Express.js backend server yang menjembatani request dari aplikasi Flutter ke Yahoo Furigana API.

## Fitur

- 🚀 Bridge API untuk Yahoo Furigana Service
- 🔒 Security dengan Helmet middleware
- 📊 Logging dengan Morgan
- 🌍 CORS support untuk cross-origin requests
- ⚡ Error handling yang komprehensif
- 🏥 Health check endpoint

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Setup environment variables:
```bash
cp config.env.example config.env
# Edit config.env sesuai kebutuhan
```

3. Jalankan server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Health Check
```
GET /health
```
Response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "Furigana Backend API"
}
```

### Furigana API
```
POST /api/furigana
```

**Request Body:**
```json
{
  "text": "こんにちは",
  "grade": 1
}
```

**Response:**
```json
{
  "id": "1234-1",
  "jsonrpc": "2.0",
  "result": {
    "word": [
      {
        "furigana": "こんにちは",
        "roman": "konnichiha",
        "surface": "こんにちは",
        "subword": [
          {
            "furigana": "こん",
            "roman": "kon",
            "surface": "こん"
          },
          {
            "furigana": "にち",
            "roman": "nichi",
            "surface": "にち"
          },
          {
            "furigana": "は",
            "roman": "ha",
            "surface": "は"
          }
        ]
      }
    ]
  }
}
```

## Environment Variables

- `PORT`: Port server (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `YAHOO_API_URL`: URL Yahoo Furigana API
- `YAHOO_API_KEY`: API key untuk Yahoo
- `CORS_ORIGIN`: CORS origin (default: *)

## Error Handling

Backend ini menangani berbagai jenis error:

- **400**: Invalid input (text tidak ada atau bukan string)
- **503**: Yahoo API tidak dapat diakses
- **500**: Internal server error

## Testing

Test dengan curl:
```bash
# Health check
curl http://localhost:3000/health

# Furigana request
curl -X POST http://localhost:3000/api/furigana \
  -H "Content-Type: application/json" \
  -d '{"text": "こんにちは", "grade": 1}'
```

## Deployment

1. Set environment variables untuk production
2. Install dependencies: `npm install --production`
3. Start server: `npm start`

## Struktur Response

Response mengikuti struktur yang sama dengan Yahoo API:

- `id`: Request ID
- `jsonrpc`: JSON-RPC version
- `result.word[]`: Array kata dengan furigana
  - `furigana`: Teks dengan furigana
  - `roman`: Romanisasi
  - `surface`: Teks asli
  - `subword[]`: Sub-kata breakdown
