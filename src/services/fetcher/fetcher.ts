import fetch, { RequestInit, Response } from 'node-fetch';

type RequestType = 'GET' | 'OPTIONS';

type FetcherOptions = Omit<RequestInit, 'body' | 'method'>;

export interface FetcherService {
  get: (uri: string, options?: FetcherOptions) => Promise<Response>;
}

/**
 * Provides a reusable instance that allows the base url and default options to be configured
 * for using node-fetch
 */
class Fetcher implements FetcherService {
  private readonly baseUrl: string;

  private readonly baseOptions?: FetcherOptions;

  constructor(baseUrl: string, baseOptions: FetcherOptions) {
    this.baseUrl = baseUrl;
    this.baseOptions = baseOptions;
  }

  private processRequest(uri: string, type: RequestType, options?: RequestInit): Promise<Response> {
    const { headers = {}, ...rest } = options || {};
    const { headers: baseHeaders, ...baseRest } = this.baseOptions;
    return fetch(`${this.baseUrl}${uri}`, {
      ...baseRest,
      ...rest,
      method: type,
      headers: {
        ...baseHeaders,
        ...headers,
      },
    });
  }

  get(uri: string, options?: FetcherOptions): Promise<Response> {
    return this.processRequest(uri, 'GET', options);
  }
}

const fetcher = {
  create: (baseUrl: string, options?: FetcherOptions): FetcherService => {
    return new Fetcher(baseUrl, options);
  },
};

export default fetcher;
