import { useContext, useEffect } from "react"
import useRouterElements from "./useRouterElements"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { LocalStorageEventTarget } from "./utils/auth"
import { AppContext } from "./contexts/auth.context"
import { HelmetProvider } from "react-helmet-async"
import ErrorBoundary from "./Components/ErrBoundary"

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
      <ErrorBoundary>
        {elementRoutes}
        <ToastContainer />
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App
