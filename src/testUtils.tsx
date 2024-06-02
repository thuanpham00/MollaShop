import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
// eslint-disable-next-line import/no-named-as-default
import userEvent from "@testing-library/user-event"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppProvider, getInitialAppContext } from "./contexts/auth.context"

export const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
} // hàm này dùng để xử lý đợi promise nên cần tạo ra promise

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        retry: false
      }
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
  // Thiết lập route hiện tại của window thành route đã truyền vào (hoặc / nếu không truyền gì).
  const defaultValueAppContext = getInitialAppContext()
  return {
    user: userEvent.setup(),
    ...render(
      <Provider>
        <AppProvider defaultValue={defaultValueAppContext}>
          <App />
        </AppProvider>
      </Provider>,
      { wrapper: BrowserRouter } // giúp chuyển tới route truyền vào và render ra
    )
  }
}

/**Cấu hình sẵn một router với route tùy chọn.
   Cung cấp context cho các component được render.
   Hỗ trợ việc lấy và cập nhật dữ liệu với React Query mà không cần phải thử lại khi có lỗi. */
