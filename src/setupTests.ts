import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { server } from './test-utils/mocks/server';

Object.assign(global, { TextDecoder, TextEncoder });

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
