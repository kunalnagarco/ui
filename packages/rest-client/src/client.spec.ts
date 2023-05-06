import { RestClient } from './client';

const baseUrl = 'https://api.github.com';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(
    jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      }),
    ) as jest.Mock,
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('should call the constructor and set the baseUrl', () => {
  const restClient = new RestClient({
    baseUrl,
  });
  expect(restClient['_baseUrl']).toStrictEqual('https://api.github.com');
});

it('should set the baseUrl to the updated value', () => {
  const restClient = new RestClient({
    baseUrl,
  });
  expect(restClient['_baseUrl']).toStrictEqual('https://api.github.com');
  restClient.setBaseUrl('https://www.google.com');
  expect(restClient['_baseUrl']).toStrictEqual('https://www.google.com');
});
