# Deployment Guide untuk Render

## 1. Setup di Render Dashboard

1. **Buat New Web Service**
   - Connect ke GitHub repository
   - Pilih repository `upwork-furigana-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`

## 2. Environment Variables

Set environment variables berikut di Render dashboard:

### Required Variables:
```
YAHOO_API_KEY=Yahoo AppID: dj00aiZpPWc2Vk1NOFVsWmx5SCZzPWNvbnN1bWVyc2VjcmV0Jng9MGE-8
```

### Optional Variables:
```
NODE_ENV=production
YAHOO_API_URL=https://jlp.yahooapis.jp/FuriganaService/V2/furigana
CORS_ORIGIN=*
```

## 3. Cara Set Environment Variables di Render

1. Buka service di Render dashboard
2. Klik tab "Environment"
3. Klik "Add Environment Variable"
4. Set key: `YAHOO_API_KEY`
5. Set value: `Yahoo AppID: dj00aiZpPWc2Vk1NOFVsWmx5SCZzPWNvbnN1bWVyc2VjcmV0Jng9MGE-8`
6. Klik "Save Changes"
7. Deploy ulang service

## 4. Troubleshooting

### Error 401: Authentication parameters incompleted
- Pastikan `YAHOO_API_KEY` sudah diset dengan benar
- Pastikan format: `Yahoo AppID: [your-api-key]`
- Deploy ulang setelah set environment variable

### Environment Variable tidak terbaca
- Cek log startup untuk melihat apakah API key terbaca
- Pastikan tidak ada spasi ekstra di value
- Restart service setelah set environment variable

### CORS Error
- Set `CORS_ORIGIN=*` untuk development
- Set `CORS_ORIGIN=https://yourdomain.com` untuk production

## 5. Test Deployment

Setelah deploy, test dengan:

```bash
# Health check
curl https://your-app-name.onrender.com/health

# Test furigana API
curl -X POST https://your-app-name.onrender.com/api/furigana \
  -H "Content-Type: application/json" \
  -d '{"text": "こんにちは", "grade": 1}'
```

## 6. Update Flutter App

Update URL di `yahoo_jlp_controller_backend.dart`:

```dart
// Production URL
final String backendUrl = "https://your-app-name.onrender.com/api/furigana";
```

## 7. Monitoring

- Cek log di Render dashboard untuk debugging
- Monitor response time dan error rate
- Set up alerts jika diperlukan
