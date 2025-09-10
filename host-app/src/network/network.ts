import axios from 'axios';
import CONFIGURATION from './config';

// Network yapılandırma arayüzü
export interface NetworkConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  withCredentials?: boolean;
}

// API yanıt arayüzü
export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
  success: boolean;
}

// Hata arayüzü
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: unknown;
}

// HTTP metodları
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// İstek yapılandırması
export interface RequestConfig {
  url?: string; 
  method?: string;
  baseURL?: string;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  data?: unknown;
  timeout?: number;
  withCredentials?: boolean;
  showLoader?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

/**
 * Dinamik Network sınıfı
 * Axios tabanlı HTTP istekleri için kapsamlı bir wrapper
 */
export class NetworkService {
  private axiosInstance: unknown;
  private config: NetworkConfig;
  private requestInterceptors: Array<(config: RequestConfig) => RequestConfig> = [];
  private responseInterceptors: Array<(response: unknown) => unknown> = [];
  private errorInterceptors: Array<(error: unknown) => unknown> = [];

  constructor(customConfig: NetworkConfig = {}) {
    this.config = {
      baseURL: customConfig.baseURL || CONFIGURATION.baseURL,
      timeout: customConfig.timeout || CONFIGURATION.timeout,
      headers: customConfig.headers || CONFIGURATION.headers,
      withCredentials: customConfig.withCredentials,
    };

    this.axiosInstance = axios.create(this.config || CONFIGURATION);   
    this.setupDefaultInterceptors();
  }

  /**
   * Varsayılan interceptor'ları kur
   */
  private setupDefaultInterceptors(): void {
    // Request interceptor
    (this.axiosInstance as any).interceptors.request.use(
      (config: unknown) => {
        // Request interceptor'larını çalıştır
        this.requestInterceptors.forEach(interceptor => {
          config = interceptor(config as RequestConfig);
        });
        return config;
      },
      (error: unknown) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    (this.axiosInstance as any).interceptors.response.use(
      (response: unknown) => {
        // Response interceptor'larını çalıştır
        this.responseInterceptors.forEach(interceptor => {
          response = interceptor(response);
        });
        return response;
      },
      (error: unknown) => {
        // Error interceptor'larını çalıştır
        this.errorInterceptors.forEach(interceptor => {
          return interceptor(error);
        });
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Request interceptor ekle
   */
  public addRequestInterceptor(interceptor: (config: RequestConfig) => RequestConfig): void {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * Response interceptor ekle
   */
  public addResponseInterceptor(interceptor: (response: any) => any): void {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * Error interceptor ekle
   */
  public addErrorInterceptor(interceptor: (error: any) => unknown): void {
    this.errorInterceptors.push(interceptor);
  }

  /**
   * Hata işleme
   */
  private handleError(error: any): ApiError {
    if (error.response) {
      // Sunucu yanıt verdi ama hata kodu ile
      return {
        message: error.response.data?.message || 'Sunucu hatası',
        status: error.response.status,
        code: error.response.statusText,
        details: error.response.data,
      };
    } else if (error.request) {
      // İstek yapıldı ama yanıt alınamadı
      return {
        message: 'Sunucuya ulaşılamıyor',
        status: 0,
        code: 'NETWORK_ERROR',
      };
    } else {
      // İstek oluşturulurken hata oluştu
      return {
        message: error.message || 'Bilinmeyen hata',
        status: 0,
        code: 'REQUEST_ERROR',
      };
    }
  }

  /**
   * GET isteği
   */
  public async get<T = unknown>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await (this.axiosInstance as any).get(url, config);
      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * POST isteği
   */
  public async post<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await (this.axiosInstance as any).post(url, data, config);
      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * PUT isteği
   */
  public async put<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await (this.axiosInstance as any).put(url, data, config);
      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * DELETE isteği
   */
  public async delete<T = unknown>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await (this.axiosInstance as any).delete(url, config);
      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * PATCH isteği
   */
  public async patch<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await (this.axiosInstance as any).patch(url, data, config);
      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Dinamik HTTP isteği
   */
  public async request<T = unknown>(
    method: HttpMethod,
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const requestConfig: RequestConfig = {
      method: method.toLowerCase(),
      url,
      data,
      ...config,
    };

    try {
      const response = await (this.axiosInstance as any).request(requestConfig);
      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Çoklu istek (Promise.all)
   */
  public async all<T = unknown>(requests: Array<() => Promise<ApiResponse<T>>>): Promise<ApiResponse<T>[]> {
    try {
      const responses = await Promise.all(requests.map(req => req()));
      return responses;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Retry mekanizması ile istek
   */
  public async requestWithRetry<T = unknown>(
    method: HttpMethod,
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const maxRetries = config?.retryCount || 3;
    const retryDelay = config?.retryDelay || 1000;
    let lastError: ApiError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await this.request<T>(method, url, data, config);
      } catch (error) {
        lastError = error as ApiError;
        
        if (attempt === maxRetries) {
          break;
        }

        // Sadece network hatalarında retry yap
        if (lastError.code === 'NETWORK_ERROR') {
          await this.delay(retryDelay * Math.pow(2, attempt)); // Exponential backoff
          continue;
        }
        
        break;
      }
    }

    throw lastError!;
  }

  /**
   * Gecikme fonksiyonu
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Yapılandırmayı güncelle
   */
  public updateConfig(newConfig: Partial<NetworkConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Axios instance'ı güncelle
    Object.assign((this.axiosInstance as any).defaults, this.config);
  }

  /**
   * Mevcut yapılandırmayı al
   */
  public getConfig(): NetworkConfig {
    return { ...this.config };
  }

  /**
   * Axios instance'ına doğrudan erişim
   */
  public getAxiosInstance(): unknown {
    return this.axiosInstance;
  }
}

// Varsayılan network service instance'ı
export const networkService = new NetworkService();

// Kullanım kolaylığı için export edilen fonksiyonlar
export const {
  get,
  post,
  put,
  delete: del,
  patch,
  request,
  all,
  requestWithRetry,
} = networkService;

// Varsayılan export
export default networkService;
