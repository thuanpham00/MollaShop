import { useContext, useEffect, useMemo, useState } from "react"
import { AppContext } from "src/contexts/auth.context"
import { ProductItem as ProductItemType } from "src/types/product.type"
import ProductItem from "../ProductItem"
import { CSSTransition, TransitionGroup } from "react-transition-group"

interface Props {
  title?: string
  desc?: string
  className?: string
  productList: ProductItemType[]
  timeScroll: number
}

export default function SlideListProduct({
  title,
  desc,
  className = "mt-4 lg:mt-8 p-4",
  productList,
  timeScroll
}: Props) {
  const { darkMode } = useContext(AppContext)
  const [scrollAuto, setScrollAuto] = useState<boolean>(true)
  const [currentImageIndex, setCurrentImageIndex] = useState([0, 4])
  const currentListProduct = useMemo(
    () => (productList ? productList.slice(...currentImageIndex) : []),
    [currentImageIndex, productList]
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let lastTimeClick: number = 0
  const handlePrevImg = () => {
    if (currentImageIndex[0] > 0) {
      setCurrentImageIndex((prev) => [prev[0] - 1, prev[1] - 1])
    }
    setScrollAuto(false)
    lastTimeClick = Date.now()
  }

  const handleNextImg = () => {
    if (currentImageIndex[1] < (productList as ProductItemType[]).length) {
      setCurrentImageIndex((prev) => [prev[0] + 1, prev[1] + 1])
    }
    setScrollAuto(false)
    lastTimeClick = Date.now()
  }

  useEffect(() => {
    if (scrollAuto) {
      const interval = setInterval(() => {
        if (currentImageIndex[1] < (productList as ProductItemType[]).length) {
          setCurrentImageIndex((prev) => [prev[0] + 1, prev[1] + 1])
        } else if (currentImageIndex[1] === (productList as ProductItemType[]).length) {
          setCurrentImageIndex([0, 4])
        }
      }, timeScroll)

      return () => clearInterval(interval) // giải phóng bộ nhớ khi không dùng
    }
    const time = Date.now()
    const timeScrollContinue = time - lastTimeClick
    if (timeScrollContinue > 3000) {
      setScrollAuto(true) // quá 3s ko click nữa nó tự động chạy
    }
  }, [timeScroll, currentImageIndex, productList, lastTimeClick, scrollAuto])

  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <h2
          className={`flex-shrink-0 uppercase text-xl md:text-3xl font-semibold ${darkMode ? "text-[#fff]/90" : "text-[#000]"} text-left -tracking-normal`}
        >
          {title}
        </h2>
      </div>
      <h3 className={`text-base ${darkMode ? "text-[#fff]/70" : "text-gray-500"} capitalize mt-1`}>
        {desc}
      </h3>

      <div className="mt-4 flex relative">
        <button
          aria-label="buttonLeft"
          onClick={handlePrevImg}
          className="ml-3 absolute top-1/2 left-0 flex-shrink-0 flex items-center justify-center hover:bg-gray-100 duration-200 rounded-full w-10 h-10 hover:text-black/80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div className="flex items-center flex-nowrap gap-4 overflow-hidden">
          <TransitionGroup component={null}>
            {currentListProduct.map((item) => (
              <CSSTransition key={item._id} timeout={500} classNames="slide">
                <div className="flex-1 max-w-[160px] md:max-w-[290px]">
                  <ProductItem item={item} />
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>

        <button
          aria-label="buttonRight"
          onClick={handleNextImg}
          className="mr-3 absolute top-1/2 right-0 flex-shrink-0 flex items-center justify-center hover:bg-gray-400 duration-200 rounded-full w-10 h-10 hover:text-black/80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
