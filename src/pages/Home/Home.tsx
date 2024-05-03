import { useContext } from "react"
import { AppContext } from "src/contexts/auth.context"

export default function Home() {
  const { darkMode } = useContext(AppContext)

  return (
    <div className={`${darkMode ? "bg-[#000]" : "bg-[#fff]"} duration-200`}>
      <div className="w-full flex justify-center">
        <img
          src="https://websitedemos.net/electronic-store-04/wp-content/uploads/sites/1055/2022/03/electronic-store-hero-image.jpg"
          alt="Ảnh"
          className="w-full min-h-[120px] object-contain"
        />
      </div>

      <div className="container relative">
        <div
          className={`${darkMode ? "bg-[#000]" : "bg-[#fff]"} w-full absolute left-0 -bottom-24 md:-bottom-44 lg:-bottom-16 duration-200 pt-2 md:pt-5 pb-2 md:pb-8 px-3 z-10 shadow-lg border border-gray-200`}
        >
          <div className="grid grid-cols-12 gap-4 flex-wrap">
            <div className="col-span-6 lg:col-span-3 border-r-2 border-gray-300 md:p-2">
              <div className="flex items-center gap-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#0573f0"
                    className="w-4 h-4 md:w-8 md:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold text-xs md:text-lg md:line-clamp-1">Free shipping</span>
                  <span className="block font-light text-[10px] md:text-sm text-gray-500">
                    When you spend $80 or more
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-6 lg:col-span-3 lg:border-r-2 lg:border-gray-300 md:p-2">
              <div className="flex items-center gap-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#0573f0"
                    className="w-4 h-4 md:w-8 md:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold text-xs md:text-lg md:line-clamp-1">We are available 24/7</span>
                  <span className="block font-light text-[10px] md:text-sm text-gray-500">
                    Need help? contact us anytime
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-6 lg:col-span-3 border-r-2 border-gray-300 md:p-2">
              <div className="flex items-center gap-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#0573f0"
                    className="w-4 h-4 md:w-8 md:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold text-xs md:text-lg md:line-clamp-1">Satisfied or return</span>
                  <span className="block font-light text-[10px] md:text-sm text-gray-500">
                    Easy 30-day return policy
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-6 lg:col-span-3 md:p-2">
              <div className="flex items-center gap-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#0573f0"
                    className="w-4 h-4 md:w-8 md:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold text-xs md:text-lg md:line-clamp-1">100% secure payments</span>
                  <span className="block font-light text-[10px] md:text-sm text-gray-500">
                    Visa, Mastercard, Stripe, PayPal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`container mt-28 md:mt-44 lg:mt-20 shadow-lg border border-gray-200 ${darkMode ? "bg-[#000]" : "bg-[#fff]"}`}
      >
        <div className="w-full py-8 px-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <div className="w-full">
                <img
                  src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-30-md.png&w=384&q=100"
                  alt="ảnh"
                  className="w-full object-cover"
                />
                <span className="mt-4 block text-center uppercase text-[8px] md:text-sm text-gray-500 font-semibold">
                  5 sản phẩm
                </span>
              </div>
            </div>
            <div className="col-span-4">
              <div className="w-full">
                <img
                  src="https://websitedemos.net/electronic-store-04/wp-content/uploads/sites/1055/2022/03/electronic-store-category-image-02.jpg"
                  alt="ảnh"
                  className="w-full object-cover"
                />
                <span className="mt-4 block text-center uppercase text-[8px] md:text-sm text-gray-500 font-semibold">
                  5 sản phẩm
                </span>
              </div>
            </div>
            <div className="col-span-4">
              <div className="w-full">
                <img
                  src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-16-md.png&w=384&q=100"
                  alt="ảnh"
                  className="w-full object-cover"
                />
                <span className="mt-4 block text-center uppercase text-[8px] md:text-sm text-gray-500 font-semibold">
                  35 sản phẩm
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
