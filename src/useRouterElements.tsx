import { Navigate, Outlet, useRoutes } from "react-router-dom"
import { path } from "./constants/path"
import { useContext, lazy, Suspense } from "react"
import { AppContext } from "./contexts/auth.context"
import RegisterLayout from "./Layouts/RegisterLayout"
import MainLayout from "./Layouts/MainLayout"
import CartLayout from "./Layouts/CartLayout"
import UserLayout from "./pages/User/Layouts/UserLayout"
//import Login from "./pages/Login"
//import Register from "./pages/Register"
//import Cart from "./pages/Cart"
//import Profile from "src/pages/User/Pages/Profile"
//import Home from "./pages/Home"
//import ProductList from "./pages/ProductList"
//import ProductDetail from "./pages/ProductDetail"
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

/**
 * Để tối ưu re-render thì nên ưu tiên dùng <Outlet /> thay cho {children}
 * Lưu ý là <Outlet /> nên đặt ngay trong component `element` thì mới có tác dụng tối ưu
 * Chứ không phải đặt bên trong children của component `element`
 */

//  ✅ Tối ưu re-render
// export default memo(function RegisterLayout({ children }: Props) {
//  return (
//    <div>
//      <RegisterHeader />
//      {children}
//      <Outlet />
//      <Footer />
//    </div>
//  )
//  })

//  ❌ Không tối ưu được vì <Outlet /> đặt vào vị trí children
// Khi <Outlet /> thay đổi tức là children thay đổi
// Dẫn đến component `RegisterLayout` bị re-render dù cho có dùng React.memo như trên
// <RegisterLayout>
//   <Outlet />
// </RegisterLayout>

export default function useRouterElements() {
  const elementRouter = useRoutes([
    // điều hướng trang - nhập url theo path có thể điều hướng trang

    // component <Suspenses></Suspenses> - dùng kĩ thuật Lazy load - lướt tới đâu load tới đó
    // tối ưu router - fix re-render
    {
      path: "",
      // sử dụng <Outlet/> trong MainLayout để truyền các component con vào
      element: <MainLayout />, // dùng chung đỡ phải bị re-render
      children: [
        {
          path: path.home,
          index: true,
          element: (
            <Suspense>
              <Home />
            </Suspense>
          )
        },
        {
          path: path.productList,
          element: (
            <Suspense>
              <ProductList />
            </Suspense>
          )
        },
        {
          path: path.productDetail,
          index: true,
          element: (
            <Suspense>
              <ProductDetail />
            </Suspense>
          )
        },
        {
          path: "*",
          element: (
            <Suspense>
              <NotFound />
            </Suspense>
          )
        }
      ]
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
          // sử dụng <Outlet/> trong MainLayout để truyền các component con vào
          element: <MainLayout />, // dùng chung đỡ phải bị re-render
          children: [
            {
              path: "",
              // sử dụng <Outlet/> trong UserLayout để truyền các component con vào
              element: <UserLayout />, // dùng chung đỡ phải bị re-render
              children: [
                {
                  path: path.profile,
                  element: (
                    <Suspense>
                      <Profile />
                    </Suspense>
                  )
                },
                {
                  path: path.changePassword,
                  element: (
                    <Suspense>
                      <ChangePassword />
                    </Suspense>
                  )
                },
                {
                  path: path.historyPurchase,
                  element: (
                    <Suspense>
                      <HistoryPurchase />
                    </Suspense>
                  )
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "",
      element: <RejectedRouter />,
      // sử dụng <Outlet/> trong RegisterLayout để truyền các component con vào
      children: [
        {
          path: "",
          element: <RegisterLayout />, // dùng chung đỡ phải bị re-render
          children: [
            {
              path: path.login,
              element: (
                <Suspense>
                  <Login />
                </Suspense>
              )
            },
            {
              path: path.register,
              element: (
                <Suspense>
                  <Register />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ])
  return elementRouter
}
