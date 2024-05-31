import { render, screen, waitFor, type waitForOptions } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { expect } from "vitest"
import App from "./App"
// eslint-disable-next-line import/no-named-as-default
import userEvent from "@testing-library/user-event"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  options?: waitForOptions
) => {
  const { timeout = 1000 } = options || {}
  await waitFor(
    async () => {
      expect(await delay(timeout - 100)).toBe(true)
    },
    {
      ...options,
      timeout
    }
  )
  screen.debug(body as HTMLElement, 99999999)
}

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        retry: false
      }
    },
    logger: {
      log: console.log,
      warn: console.warn,
      // no more errors on the console
      error: () => null
    }
  })
  const Provider = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return Provider
}

const Provider = createWrapper()

export const renderWithRouter = ({ route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route)
  return {
    user: userEvent.setup(),
    ...render(
      <Provider>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    )
  }
}
