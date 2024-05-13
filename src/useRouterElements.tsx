import { Navigate, Outlet, useRoutes } from "react-router-dom"
import { path } from "./constants/path"
// import Login from "./pages/Login"
// import Register from "./pages/Register"
import RegisterLayout from "./Layouts/RegisterLayout"
import MainLayout from "./Layouts/MainLayout"
//import Profile from "src/pages/User/Pages/Profile"
import { useContext, lazy, Suspense } from "react"
import { AppContext } from "./contexts/auth.context"
//import Home from "./pages/Home"
//import ProductList from "./pages/ProductList"
//import ProductDetail from "./pages/ProductDetail"
//import Cart from "./pages/Cart"
import CartLayout from "./Layouts/CartLayout"
import UserLayout from "./pages/User/Layouts/UserLayout"
//import ChangePassword from "./pages/User/Pages/ChangePassword"
//import HistoryPurchase from "./pages/User/Pages/HistoryPurchase"
//import NotFound from "./pages/NotFound"

const Login = lazy(() => import("./pages/Login")) // - dùng kĩ thuật Lazy load - lướt tới đâu load tới đó
const Register = lazy(() => import("./pages/Register")) // - dùng kĩ thuật Lazy load - lướt tới đâu load tới đó
const Home = lazy(() => import("./pages/Home"))
const ProductList = lazy(() => import("./pages/ProductList"))
const ProductDetail = lazy(() => import("./pages/ProductDetail"))
const Cart = lazy(() => import("./pages/Cart"))
const Profile = lazy(() => import("src/pages/User/Pages/Profile"))
const ChangePassword = lazy(() => import("./pages/User/Pages/ChangePassword"))
const HistoryPurchase = lazy(() => import("./pages/User/Pages/HistoryPurchase"))
const NotFound = lazy(() => import("./pages/NotFound"))
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
    // component <Suspenses></Suspenses> - dùng kĩ thuật Lazy load - lướt tới đâu load tới đó
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <Home />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.productList,
      element: (
        <MainLayout>
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: "",
      element: <ProjectedRouter />, // thêm 1 lớp check điều kiện authenticated
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        },
        {
          path: path.user,
          children: [
            {
              path: path.profile,
              element: (
                <MainLayout>
                  <UserLayout>
                    <Suspense>
                      <Profile />
                    </Suspense>
                  </UserLayout>
                </MainLayout>
              )
            },
            {
              path: path.changePassword,
              element: (
                <MainLayout>
                  <UserLayout>
                    <Suspense>
                      <ChangePassword />
                    </Suspense>
                  </UserLayout>
                </MainLayout>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <MainLayout>
                  <UserLayout>
                    <Suspense>
                      <HistoryPurchase />
                    </Suspense>
                  </UserLayout>
                </MainLayout>
              )
            }
          ]
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
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: "*",
      element: (
        <MainLayout>
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])
  return elementRouter
}
