# Curl Examples untuk Testing API

## 1. Basic Request
```bash
curl -X POST http://localhost:3000/api/furigana \
  -H "Content-Type: application/json" \
  -d '{"text": "こんにちは", "grade": 1}'
```

## 2. Request dengan Pretty Print
```bash
curl -X POST http://localhost:3000/api/furigana \
  -H "Content-Type: application/json" \
  -d '{"text": "こんにちは", "grade": 1}' \
  | python3 -m json.tool
```

## 3. Request dengan Verbose Output
```bash
curl -v -X POST http://localhost:3000/api/furigana \
  -H "Content-Type: application/json" \
  -d '{"text": "こんにちは", "grade": 1}'
```

## 4. Test dengan Text Berbeda
```bash
curl -X POST http://localhost:3000/api/furigana \
  -H "Content-Type: application/json" \
  -d '{"text": "ありがとう", "grade": 1}'
```

## 5. Test dengan Grade Berbeda
```bash
curl -X POST http://localhost:3000/api/furigana \
  -H "Content-Type: application/json" \
  -d '{"text": "おはよう", "grade": 2}'
```

## 6. Test Invalid Input (Empty Text)
```bash
curl -X POST http://localhost:3000/api/furigana \
  -H "Content-Type: application/json" \
  -d '{"text": "", "grade": 1}'
```

## 7. Test Missing Text Parameter
```bash
curl -X POST http://localhost:3000/api/furigana \
  -H "Content-Type: application/json" \
  -d '{"grade": 1}'
```

## 8. Test dengan Text Panjang
```bash
curl -X POST http://localhost:3000/api/furigana \
  -H "Content-Type: application/json" \
  -d '{"text": "今日はとても良い天気ですね。散歩に行きましょう。", "grade": 1}'
```

## 9. Health Check
```bash
curl http://localhost:3000/health
```

## 10. Save Response ke File
```bash
curl -X POST http://localhost:3000/api/furigana \
  -H "Content-Type: application/json" \
  -d '{"text": "こんにちは", "grade": 1}' \
  -o response.json
```

## Expected Log Output

Ketika menjalankan curl command, Anda akan melihat log seperti ini di console server:

```
📥 Incoming request from client:
   URL: /api/furigana
   Method: POST
   Headers: {
  "host": "localhost:3000",
  "user-agent": "curl/8.7.1",
  "accept": "*/*",
  "content-type": "application/json",
  "content-length": "39"
}
   Body: {
  "text": "こんにちは",
  "grade": 1
}
Processing furigana request for text: "こんにちは"
🔍 Yahoo API Request (curl):
curl -X POST https://jlp.yahooapis.jp/FuriganaService/V2/furigana \
  -H "Content-Type: application/json" \
  -H "User-Agent: Yahoo AppID: dj00aiZpPWc2Vk1NOFVsWmx5SCZzPWNvbnN1bWVyc2VjcmV0Jng9MGE-8" \
  -d '{"id":"1234-1","jsonrpc":"2.0","method":"jlp.furiganaservice.furigana","params":{"q":"こんにちは","grade":1}}'
```

## Troubleshooting

### Server tidak berjalan:
```bash
# Start server
cd backend
node server.js
```

### Port 3000 sudah digunakan:
```bash
# Cek process yang menggunakan port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### CORS Error:
- Pastikan `CORS_ORIGIN=*` di `config.env`
- Restart server setelah update config
