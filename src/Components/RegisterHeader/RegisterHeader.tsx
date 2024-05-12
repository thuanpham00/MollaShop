import { Link, useMatch } from "react-router-dom"

export default function RegisterHeader() {
  const isLogin = useMatch("/login") // dùng để check trang login và register nào match trùng thì xử lý
  return (
    <header className="bg-gradient-to-r from-[#667db6] via-[#0082c8] to-[#667db6]">
      <div className="container">
        <div className="py-10 flex items-center">
          <Link to="/">
            <div className="flex w-full lg:w-full text-[#f8edeb] text-5xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#fff"
                className="w-11 h-11"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <div className="font_logo">Molla</div>
            </div>
          </Link>
          <h1 className="text-white ml-5 text-3xl">{isLogin ? "Đăng nhập" : "Đăng ký"}</h1>
        </div>
      </div>
    </header>
  )
}
