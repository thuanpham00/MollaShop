import { useContext, useEffect } from "react"
import useRouterElements from "./useRouterElements"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { LocalStorageEventTarget } from "./utils/auth"
import { AppContext } from "./contexts/auth.context"

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
    <div>
      <ToastContainer />
      {elementRoutes}
    </div>
  )
}

export default App
