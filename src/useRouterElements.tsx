import { Navigate, Outlet, useRoutes } from "react-router-dom"
import { path } from "./constants/path"
import Login from "./pages/Login"
import Register from "./pages/Register"
import RegisterLayout from "./Layouts/RegisterLayout"
import MainLayout from "./Layouts/MainLayout"
import Profile from "./pages/Profile"
import { useContext } from "react"
import { AppContext } from "./contexts/auth.context"
import Home from "./pages/Home"
import ProductList from "./pages/ProductList"

// <Outlet /> giúp truy cập vào route con
// <Navigate /> điều hướng trang khi xử lý bằng js
function ProjectedRouter() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
  // nếu chưa đăng nhập thì đăng nhập
  // nếu đăng nhập rồi thì vào trong
}

function RejectedRouter() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
  // nếu chưa đăng nhập thì vào
  // nếu đăng nhập rồi thì vào trang chủ
}

export default function useRouterElements() {
  const elementRouter = useRoutes([
    // nó là 1 tập hợp array gồm các route
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: path.productList,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: "",
      element: <ProjectedRouter />, // thêm 1 lớp check điều kiện authenticated
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: "",
      element: <RejectedRouter />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return elementRouter
}
