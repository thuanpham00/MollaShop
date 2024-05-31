import { afterAll, afterEach, beforeAll } from "vitest"
import { setupServer } from "msw/node"
import { authRequest } from "./src/msw/auth.msw"

const server = setupServer(...authRequest)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
