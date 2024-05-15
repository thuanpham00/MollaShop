import { Link } from "react-router-dom"
import { formatCurrency } from "src/utils/utils"
import { ProductFeatured } from "../../Home"

interface Props {
  item: ProductFeatured
  className?: string
  classNameImage?: string
  classNameTitle?: string
}

export default function ProductItem2({
  item,
  className = "h-[320px] md:h-[616px] bg-[#f9f9f9] flex flex-col md:pt-16 items-center rounded-sm shadow-sm p-4 md:p-12",
  classNameImage = "h-[200px] md:h-[400px] object-cover",
  classNameTitle = "mt-2 md:mt-8 mr-auto font-medium text-sm md:text-lg"
}: Props) {
  return (
    <Link
      to="/Điện-thoại-Apple-Iphone-12-64GB--Hàng-chính-hãng-VNA-i-60afb1c56ef5b902180aacb8"
      className={className}
    >
      <img src={item.img} alt={item.name} className={classNameImage} />

      <div className={classNameTitle}>{item.name}</div>
      <div className="mr-auto text-gray-500 font-normal text-xs md:text-base">
        Đã bán {item.sold}
      </div>
      <div className="mr-auto flex items-center md:flex-col lg:flex-row">
        <div className="text-sm md:text-base lg:text-lg font-semibold text-red-500">
          {formatCurrency(item.price)}đ
        </div>
        <div className="ml-1 lg:ml-3 text-xs md:text-sm lg:text-base font-medium line-through">
          {formatCurrency(item.priceBeforeDiscount)}đ
        </div>
      </div>
    </Link>
  )
}
