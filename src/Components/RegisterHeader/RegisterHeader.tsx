import { Link, useMatch } from "react-router-dom"
import logo from "../../img/Black Simple Clothing Brand Logo.png"

export default function RegisterHeader() {
  const isLogin = useMatch("/login") // dùng để check trang login và register nào match trùng thì xử lý
  return (
    <header className="bg-primaryOrange">
      <div className="container">
        <div className="py-10 flex items-end">
          <Link to="/">
            <img src={logo} className="w-full object-cover"/>
          </Link>
          <h1 className="text-white ml-5 text-2xl">{isLogin ? "Đăng nhập" : "Đăng ký"}</h1>
        </div>
      </div>
    </header>
  )
}
