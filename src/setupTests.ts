import '@testing-library/jest-dom';
import { setupServer, SetupServer } from 'msw/node';
import { handlers } from '@/mocks/handlers';

export const server: SetupServer = setupServer(...handlers);

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  vi.clearAllMocks();
  server.resetHandlers();
});
// Clean up after the tests are finished.
afterAll(() => {
  server.close();
  vi.resetAllMocks();
});

vi.mock('zustand');
