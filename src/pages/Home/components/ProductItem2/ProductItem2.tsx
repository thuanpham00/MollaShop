import { Link } from "react-router-dom"
import { formatCurrency } from "src/utils/utils"
import { ProductFeatured } from "../../Home"
import { useContext } from "react"
import { AppContext } from "src/contexts/auth.context"

interface Props {
  item: ProductFeatured
  className?: string
  classNameImage?: string
  classNameTitle?: string
}

export default function ProductItem2({
  item,
  className = "h-[320px] md:h-[616px] flex flex-col md:pt-16 items-center rounded-sm shadow-sm p-4 md:p-12",
  classNameImage = "h-[200px] md:h-[400px] object-cover",
  classNameTitle = "mt-2 md:mt-8 mr-auto font-medium text-sm md:text-lg"
}: Props) {
  const { darkMode } = useContext(AppContext)

  const handleScrollTop = () => {
    window.scroll({ top: 0 })
  }

  return (
    <Link
      onClick={handleScrollTop}
      to={item.link}
      className={`${className}${darkMode ? " bg-[#252323]" : " bg-[#f9f9f9]"}`}
    >
      <img src={item.img} alt={item.name} className={classNameImage} />
      <div className={`${classNameTitle}${darkMode ? " text-[#fff]/90" : " text-[#000]"}`}>
        {item.name}
      </div>
      <div
        className={`mr-auto ${darkMode ? "text-[#fff]/70" : "text-gray-500"} font-normal text-xs md:text-sm`}
      >
        Đã bán {item.sold}
      </div>
      <div className="mr-auto flex items-center md:flex-col lg:flex-row">
        <div className="text-sm md:text-base lg:text-lg font-semibold text-red-500">
          {formatCurrency(item.price)}đ
        </div>
        <div
          className={`ml-1 lg:ml-3 text-xs md:text-sm lg:text-base font-medium line-through ${darkMode ? "text-[#fff]/80" : "text-[#000]"}`}
        >
          {formatCurrency(item.priceBeforeDiscount)}đ
        </div>
      </div>
    </Link>
  )
}
