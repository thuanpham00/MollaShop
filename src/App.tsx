import { useContext, useEffect } from "react"
import useRouterElements from "./useRouterElements"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { LocalStorageEventTarget } from "./utils/auth"
import { AppContext } from "./contexts/auth.context"
import { HelmetProvider } from "react-helmet-async"
import ErrorBoundary from "./Components/ErrBoundary"

/**
 * Khi url thay đổi thì các component nào dùng các hook như
 * useRoutes, useParams, useSearchParams,...
 * sẽ bị re-render
 * ví dụ component `App` dưới đây bị re-render khi mà url thay đổi
 * vì dùng `useRouterElement` (đây là custom hook của `useRoutes`)
 */

function App() {
  const elementRoutes = useRouterElements()
  const { reset } = useContext(AppContext)
  console.log("app")
  useEffect(() => {
    LocalStorageEventTarget.addEventListener("ClearLS", reset)

    return () => {
      LocalStorageEventTarget.removeEventListener("ClearLS", reset) // destroy event
    }
  }, [reset]) // nếu reset thay đổi thì nó tham chiếu tới chạy lại useEffect và re-render lại

  return (
    <HelmetProvider>
      <ErrorBoundary>
        {elementRoutes}
        <ToastContainer />
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App
