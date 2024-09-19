type Config = {
  API_URL: string;
  TEST_API_URL: string;
};

const config: Config = {
  API_URL: import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:9999',
  TEST_API_URL: import.meta.env.VITE_TEST_API_URL ?? 'http://localhost-test',
};

export default config;
