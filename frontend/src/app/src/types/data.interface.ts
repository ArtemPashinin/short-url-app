
export interface ShortUrlResponse {
  originalUrl: string;
  createdAt: Date;
  clickCount: number;
}

export interface ShortUrl {
  originalUrl: string;
  alias?: string;
  shortUrl: string;
  expiresAt?: Date;
  clickCount: number;
}

export type BackendTypes = ShortUrl;
