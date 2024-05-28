import { useContext, useEffect } from "react"
import useRouterElements from "./useRouterElements"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { LocalStorageEventTarget } from "./utils/auth"
import { AppContext, AppProvider } from "./contexts/auth.context"
import { HelmetProvider } from "react-helmet-async"
import ErrorBoundary from "./Components/ErrBoundary"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // chặn refetch api khi chuyển tab
      retry: 0 // gọi lỗi 1 lần khi bị 401 (hết hạn token - sai token)
    }
  }
})
function App() {
  const elementRoutes = useRouterElements()
  const { reset } = useContext(AppContext)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener("ClearLS", reset)

    return () => {
      LocalStorageEventTarget.removeEventListener("ClearLS", reset) // destroy event
    }
  }, [reset]) // nếu reset thay đổi thì nó tham chiếu tới chạy lại useEffect và re-render lại

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ErrorBoundary>
            {elementRoutes}
            <ToastContainer />
          </ErrorBoundary>
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
