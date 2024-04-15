import { Link, useMatch } from "react-router-dom"

export default function RegisterHeader() {
  const isLogin = useMatch("/login") // dùng để check trang login và register nào match trùng thì xử lý
  return (
    <header className="bg-primaryBlue">
      <div className="container">
        <div className="py-10 flex items-end">
          <Link to="/">
            <img
              src="https://websitedemos.net/electronic-store-04/wp-content/uploads/sites/1055/2022/03/electronic-store-logo.svg"
              alt="Ảnh logo"
              className="w-52 h-10 object-cover"
            />
          </Link>
          <h1 className="text-white ml-5 text-2xl">{isLogin ? "Đăng nhập" : "Đăng ký"}</h1>
        </div>
      </div>
    </header>
  )
} 
