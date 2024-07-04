import { memo } from "react"
import { Outlet } from "react-router-dom"
import Footer from "src/Components/Footer"
import Header from "src/Components/Header"

interface Props {
  children?: React.ReactNode
}

function MainLayoutInner({ children }: Props) {
  console.log("re-render")
  return (
    <div>
      {/* có thể dùng children nếu cần thiết */}
      <Header />
      {children}
      {/* các component con được thể hiện trong outlet */}
      <Outlet />
      <Footer />
    </div>
  )
}

const MainLayout = memo(MainLayoutInner)
// ngăn chặn việc component MainLayout re-render khi không cần thiết
// vì sao nó re-render là do sử dụng routes

export default MainLayout
