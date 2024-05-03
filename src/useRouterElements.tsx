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
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import CartLayout from "./Layouts/CartLayout"

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
    // điều hướng trang - url
    // nhập url theo path có thể điều hướng trang
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
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
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
        },
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
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
