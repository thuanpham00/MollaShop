import { useQuery } from "@tanstack/react-query"
import DOMPurify from "dompurify"
import { useEffect, useMemo, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import InputNumber from "src/Components/InputNumber"
import ProductRating from "src/Components/ProductRating"
import { productApi } from "src/apis/products.api"
import { formatCurrency, formatNumberToSocialStyle, rateSale } from "src/utils/utils"

export default function ProductDetail() {
  const { id } = useParams() // lấy id từ url
  const getProductDetailQuery = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return productApi.getProductDetail(id as string)
    }
  })
  const product = getProductDetailQuery.data?.data.data
  const [currentImagesIndex, setCurrentImagesIndex] = useState([0, 5])
  const [activeImage, setActiveImage] = useState("")
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentImagesIndex) : []),
    [product, currentImagesIndex]
  )
  // chặn component re-render biến
  // product thay đổi useMemo mới chạy - còn không - thì không re-render
  const refImg = useRef<HTMLImageElement>(null) // truy cập dom - truy cập đến element

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  if (!product) return null

  const next = () => {
    if (currentImagesIndex[1] < product?.images.length) {
      setCurrentImagesIndex((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const previous = () => {
    if (currentImagesIndex[0] > 0) {
      setCurrentImagesIndex((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect() // lấy tọa độ
    const image = refImg.current as HTMLImageElement
    const { naturalWidth, naturalHeight } = image // width và height ảnh gốc
    const { offsetX, offsetY } = event.nativeEvent // tọa độ thay đổi liên tục
    console.log(offsetX, offsetY)
    if (image) {
      image.style.width = naturalWidth + "px" // zoom ảnh to lên khi mouse move
      image.style.height = naturalHeight + "px"
      image.style.maxWidth = "unset" // max-width mặc định
      const top1 = offsetY * (1 - naturalHeight / rect.height) // kích thước gốc / kích thước phần tử
      const left1 = offsetX * (1 - naturalWidth / rect.width)
      image.style.top = top1 + "px"
      image.style.left = left1 + "px"
    }

    // Event bubble: sự kiện chồng chéo
  }

  const handleResetZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const image = refImg.current as HTMLImageElement
    image.style.top = 0 + "px"
    image.style.left = 0 + "px"
    const rect = event.currentTarget.getBoundingClientRect()
    if (image) {
      image.style.width = rect.width + "px" // width : kích thước phần tử
      image.style.height = rect.height + "px"
    }
  }

  return (
    <div className="bg-gray-100 py-6">
      <div className="container">
        <div className="bg-white p-4 shadow">
          <div className="grid grid-cols-12 gap-9">
            <div className="col-span-5">
              <div
                className="relative w-full pt-[100%] shadow overflow-hidden cursor-zoom-in"
                onMouseMove={handleZoom}
                onMouseLeave={handleResetZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className="absolute pointer-events-none top-0 left-0 w-full h-full object-cover"
                  ref={refImg}
                />
              </div>
              <div className="relative mt-4 grid grid-cols-5 gap-1">
                <button
                  onClick={previous}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-9 w-5 bg-black/20 text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>
                {currentImages.map((img, index) => {
                  const isActive = img === activeImage
                  return (
                    <div className="relative w-full pt-[100%]" key={index} onMouseEnter={() => chooseActive(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className="cursor-pointer w-full h-full object-cover bg-white absolute left-0 top-0"
                      />

                      {isActive && <div className="absolute inset-0 border border-red-500"></div>}
                    </div>
                  )
                })}
                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-5 bg-black/20 text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="col-span-7">
              <h1 className="font-medium uppercase text-xl">{product.name}</h1>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="border-b-orange-500 border-b text-orange-500">{product.rating}</span>
                  <ProductRating rating={product.rating} />
                </div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className="ml-1">Đã bán</span>
                </div>
              </div>
              <div className="mt-8 flex items-center bg-gray-50 px-4 py-3">
                <div className="text-gray-500 line-through">${formatCurrency(product.price_before_discount)}</div>
                <div className="ml-4 text-3xl font-medium text-orange-500">${formatCurrency(product.price)}</div>
                <div className="ml-4 w-[100px] h-[40px] bg-orange-500 text-white flex items-center justify-center">
                  {rateSale(product.price_before_discount, product.price)} GIẢM
                </div>
              </div>

              <div className="mt-8 flex items-center">
                <div className="capitalize text-gray-500">số lượng</div>
                <div className="ml-10 flex items-center">
                  <button className="h-8 w-8 flex items-center border border-gray-200 justify-center hover:bg-gray-200 duration-100 rounded-tl rounded-bl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                  </button>

                  <InputNumber
                    value={1}
                    className=""
                    classNameError="hidden"
                    classNameInput="h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none"
                  />

                  <button className="h-8 w-8 flex items-center border border-gray-200 justify-center hover:bg-gray-200 duration-100 rounded-tr rounded-br">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>

                <div className="ml-5 text-gray-500 text-sm">
                  <span>{product.quantity}</span>
                  <span className="ml-1">Sản phẩm có sẵn</span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-5">
                <button className="flex h-12 items-center justify-center gap-2 capitalize border border-orange-500 text-orange-500 px-4 py-3 bg-orange-50 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  thêm vào giỏ hàng
                </button>

                <button className="h-12 min-w-[5rem] bg-orange-500 text-white px-4 py-3 rounded hover:bg-orange-500/50 duration-400 outline-none">
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 bg-white p-4 shadow">
          <span className="block px-3 py-4 uppercase text-lg rounded bg-gray-50">mô tả sản phẩm</span>
          <div className="mx-4 mt-5 leading-loose text-sm">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
