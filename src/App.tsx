import { useContext, useEffect } from "react"
import useRouterElements from "./useRouterElements"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { LocalStorageEventTarget } from "./utils/auth"
import { AppContext, AppProvider } from "./contexts/auth.context"
import { HelmetProvider } from "react-helmet-async"
import ErrorBoundary from "./Components/ErrBoundary"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

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
      <AppProvider>
        <ErrorBoundary>
          {elementRoutes}
          <ToastContainer />
        </ErrorBoundary>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  )
}

export default App
