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

  constructor({ baseUrl }: RestClientOptions) {
    this._baseUrl = baseUrl;
  }

  private _getFullUrl(url: string): string {
    return `${this._baseUrl}${url}`;
  }

  private _requestFacade<T>(
    method: string,
    { url, body, headers }: RestClientMethodOptions,
  ): Promise<RestClientResponse<T>> {
    const fetchPromise = fetch(this._getFullUrl(url), {
      method,
      headers,
      body,
    });
    return new Promise<RestClientResponse<T>>(async (resolve, reject) => {
      const response = await fetchPromise;
      let data;
      try {
        data = await response.json();
      } catch (err) {
        data = null;
      }
      const returnObj = {
        headers: response.headers,
        data,
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
      };
      if (response.ok) {
        return resolve(returnObj);
      }
      return reject(returnObj);
    });
  }

  setBaseUrl(baseUrl: string): void {
    this._baseUrl = baseUrl;
  }

  async get<T>(
    options: RestClientMethodOptions,
  ): Promise<RestClientResponse<T>> {
    return this._requestFacade('GET', options);
  }

  async post<T>(
    options: RestClientMethodOptions,
  ): Promise<RestClientResponse<T>> {
    return this._requestFacade('POST', options);
  }

  async put<T>(
    options: RestClientMethodOptions,
  ): Promise<RestClientResponse<T>> {
    return this._requestFacade('PUT', options);
  }

  async delete<T>(
    options: RestClientMethodOptions,
  ): Promise<RestClientResponse<T>> {
    return this._requestFacade('DELETE', options);
  }
}
