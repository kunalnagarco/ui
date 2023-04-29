/**
 * Options when initializing the constructor
 */
interface RestClientOptions {
  baseUrl: string;
}

/**
 * Arguments passed to the REST methods
 */
interface RestClientMethodOptions {
  url: string;
  body?: BodyInit | XMLHttpRequestBodyInit;
  headers?: HeadersInit;
}

/**
 * Response received from the REST methods
 */
interface RestClientResponse<T> {
  headers: Headers;
  ok: boolean;
  status: number;
  statusText: string;
  data: T;
}

/**
 * Public API for the client
 */
export interface RestClientContract {
  get: <T>(options: RestClientMethodOptions) => Promise<RestClientResponse<T>>;
  post: <T>(options: RestClientMethodOptions) => Promise<RestClientResponse<T>>;
  put: <T>(options: RestClientMethodOptions) => Promise<RestClientResponse<T>>;
  delete: <T>(
    options: RestClientMethodOptions,
  ) => Promise<RestClientResponse<T>>;
  setBaseUrl: (baseUrl: string) => void;
}

export class RestClient implements RestClientContract {
  private _baseUrl: string;
}
