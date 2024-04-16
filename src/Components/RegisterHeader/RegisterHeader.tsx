import { Link, useMatch } from "react-router-dom"

export default function RegisterHeader() {
  const isLogin = useMatch("/login") // dùng để check trang login và register nào match trùng thì xử lý
  return (
    <header className="bg-primaryOrange">
      <div className="container">
        <div className="py-10 flex items-end">
          <Link to="/">
            <span className="w-full text-3xl font-extrabold text-white">Brand Shop</span>
          </Link>
          <h1 className="text-white ml-5 text-2xl">{isLogin ? "Đăng nhập" : "Đăng ký"}</h1>
        </div>
      </div>
    </header>
  )
}
