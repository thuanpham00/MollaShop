import { memo } from "react"
import { Outlet } from "react-router-dom"
import Footer from "src/Components/Footer"
import RegisterHeader from "src/Components/RegisterHeader"

interface Props {
  children?: React.ReactNode
}

function RegisterLayoutInner({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      {children}
      {/* các component con được thể hiện trong outlet */}
      <Outlet />
      <Footer />
    </div>
  )
}

const RegisterLayout = memo(RegisterLayoutInner) // ngăn chặn component re-render lại khi ko cần thiết
export default RegisterLayout

// vì RegisterHeader và Footer là 2 components chung của layout nên bỏ vào đây tiện lợi
