# Network Service

Bu proje için geliştirilmiş, Axios tabanlı dinamik HTTP istek yönetim sistemi.

## Özellikler

- ✅ **HTTP Metodları**: GET, POST, PUT, DELETE, PATCH
- ✅ **Interceptor Desteği**: Request, Response ve Error interceptor'ları
- ✅ **Retry Mekanizması**: Otomatik yeniden deneme
- ✅ **Çoklu İstek**: Promise.all ile paralel istekler
- ✅ **TypeScript Desteği**: Tam tip güvenliği
- ✅ **Hata Yönetimi**: Kapsamlı hata yakalama ve işleme
- ✅ **Yapılandırılabilir**: Dinamik config güncelleme
- ✅ **ESLint Uyumlu**: Kod kalitesi standartları

## Kurulum

```bash
npm install axios
```

## Temel Kullanım

### 1. Basit İstekler

```typescript
import { get, post, put, del, patch } from './network';

// GET isteği
const user = await get<User>('/users/123');

// POST isteği
const newUser = await post<User>('/users', { name: 'John', email: 'john@example.com' });

// PUT isteği
const updatedUser = await put<User>('/users/123', { name: 'Jane' });

// DELETE isteği
const result = await del<{ success: boolean }>('/users/123');

// PATCH isteği
const patchedUser = await patch<User>('/users/123', { status: 'active' });
```

### 2. Dinamik İstek

```typescript
import { request } from './network';

const response = await request<ResponseType>('POST', '/api/endpoint', data);
```

### 3. Çoklu İstek

```typescript
import { all } from './network';

const requests = [
  () => get<User>('/users/1'),
  () => get<User>('/users/2'),
  () => get<User>('/users/3')
];

const users = await all(requests);
```

### 4. Retry Mekanizması

```typescript
import { requestWithRetry } from './network';

const user = await requestWithRetry<User>(
  'GET',
  '/users/123',
  undefined,
  { retryCount: 3, retryDelay: 1000 }
);
```

## Gelişmiş Kullanım

### Network Service Instance

```typescript
import { networkService } from './network';

// Yapılandırma güncelle
networkService.updateConfig({
  baseURL: 'https://api.example.com',
  timeout: 15000,
  headers: {
    'Authorization': 'Bearer token',
    'X-API-Version': 'v1'
  }
});

// Request interceptor ekle
networkService.addRequestInterceptor((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor ekle
networkService.addResponseInterceptor((response) => {
  console.log('API Response:', response.data);
  return response;
});

// Error interceptor ekle
networkService.addErrorInterceptor((error) => {
  if (error.response?.status === 401) {
    // Unauthorized - logout yap
    localStorage.removeItem('auth-token');
    window.location.href = '/login';
  }
  return error;
});
```

### Özel Network Service Oluşturma

```typescript
import { NetworkService } from './network';

const customNetwork = new NetworkService({
  baseURL: 'https://custom-api.example.com',
  timeout: 20000,
  withCredentials: true
});

// Özel instance ile istek yap
const response = await customNetwork.get<User>('/users/123');
```

## Yapılandırma Seçenekleri

```typescript
interface NetworkConfig {
  baseURL?: string;           // API base URL
  timeout?: number;           // İstek timeout süresi (ms)
  headers?: Record<string, string>; // Varsayılan headers
  withCredentials?: boolean;  // CORS credentials
}
```

## İstek Yapılandırması

```typescript
interface RequestConfig {
  url?: string;               // İstek URL'i
  method?: string;            // HTTP metodu
  baseURL?: string;           // Base URL override
  headers?: Record<string, string>; // Headers
  params?: Record<string, unknown>; // Query parametreleri
  data?: unknown;             // Request body
  timeout?: number;           // Timeout override
  withCredentials?: boolean;  // Credentials override
  showLoader?: boolean;       // Loading göstergesi
  retryCount?: number;        // Retry sayısı
  retryDelay?: number;        // Retry gecikmesi (ms)
}
```

## Hata Yönetimi

```typescript
interface ApiError {
  message: string;            // Hata mesajı
  status: number;             // HTTP status kodu
  code?: string;              // Hata kodu
  details?: unknown;          // Detay bilgileri
}

// Hata yakalama
try {
  const user = await get<User>('/users/123');
} catch (error) {
  if (error.status === 404) {
    console.log('Kullanıcı bulunamadı');
  } else if (error.code === 'NETWORK_ERROR') {
    console.log('Ağ hatası');
  }
}
```

## Response Format

```typescript
interface ApiResponse<T> {
  data: T;                    // Response verisi
  status: number;             // HTTP status kodu
  message?: string;           // Response mesajı
  success: boolean;           // İşlem başarı durumu
}
```

## Örnekler

Detaylı kullanım örnekleri için `example.ts` dosyasına bakın.

## Notlar

- Tüm metodlar Promise döner
- Hata durumunda ApiError fırlatılır
- Interceptor'lar sırayla çalışır
- Retry mekanizması sadece network hatalarında çalışır
- TypeScript generic'leri ile tip güvenliği sağlanır
