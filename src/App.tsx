import useRouterElements from "./useRouterElements"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const elementRoutes = useRouterElements()
  return (
    <div>
      <ToastContainer />
      {elementRoutes}
    </div>
  )
}

export default App
