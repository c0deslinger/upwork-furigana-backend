# Contoh Penggunaan Backend dari Flutter App

## 1. Update Controller Flutter

Ganti `yahoo_jlp_controller.dart` dengan `yahoo_jlp_controller_backend.dart`:

```dart
// Di file yang menggunakan controller
import 'package:your_app/controllers/yahoo_jlp_controller_backend.dart';

// Ganti controller
final yahooController = Get.put(YahooJlpControllerBackend());

// Gunakan seperti biasa
final result = await yahooController.fetchYahooJlpData("こんにちは");
```

## 2. Konfigurasi URL Backend

Update URL di `yahoo_jlp_controller_backend.dart`:

```dart
// Development (localhost)
final String backendUrl = "http://localhost:3000/api/furigana";

// Production (ganti dengan domain server Anda)
// final String backendUrl = "https://your-backend-domain.com/api/furigana";
```

## 3. Test Koneksi Backend

```dart
// Test apakah backend berjalan
bool isBackendRunning = await yahooController.testBackendConnection();
if (isBackendRunning) {
  print("Backend is running!");
} else {
  print("Backend is not accessible");
}
```

## 4. Contoh Request dan Response

### Request dari Flutter:
```json
{
  "text": "こんにちは",
  "grade": 1
}
```

### Response dari Backend (sama dengan Yahoo API):
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

## 5. Keuntungan Menggunakan Backend

1. **Keamanan**: API key Yahoo tidak terekspos di aplikasi Flutter
2. **Fleksibilitas**: Bisa menambah caching, rate limiting, dll
3. **Monitoring**: Bisa track penggunaan API
4. **Error Handling**: Centralized error handling
5. **CORS**: Tidak ada masalah CORS di mobile app

## 6. Deployment

1. Deploy backend ke server (Heroku, Vercel, Railway, dll)
2. Update URL di Flutter app
3. Set environment variables di server
4. Test koneksi

## 7. Troubleshooting

### Backend tidak bisa diakses:
- Cek apakah server berjalan
- Cek firewall/port
- Cek URL di Flutter app

### Yahoo API Error:
- Cek API key di `config.env`
- Cek quota Yahoo API
- Cek format request

### CORS Error:
- Update `CORS_ORIGIN` di `config.env`
- Restart server setelah update config
