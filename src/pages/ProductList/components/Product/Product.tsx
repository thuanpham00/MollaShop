import { useContext } from "react"
import { Link } from "react-router-dom"
import ProductRating from "src/Components/ProductRating"
import { path } from "src/constants/path"
import { AppContext } from "src/contexts/auth.context"
import { ProductItem } from "src/types/product.type"
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from "src/utils/utils"

interface Props {
  item: ProductItem
}
// ${generateNameId({name: item.name, id: item._id})}
export default function Product({ item }: Props) {
  const { darkMode } = useContext(AppContext)
  return (
    <Link to={`${path.home}${generateNameId({ name: item.name, id: item._id })}`}>
      <div className="duration-300 rounded-sm hover:translate-y-[-3px] transition-transform overflow-hidden">
        <div className="w-full pt-[100%] relative">
          <img
            src={item.image}
            alt={item.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <ProductRating rating={item.rating} />
          <div>
            <span className="lowercase">{formatNumberToSocialStyle(item.sold)}</span>
            <span className="ml-1">Đã bán</span>
          </div>
        </div>

        <div className="mt-2 line-clamp-2 font-medium text-base">{item.name}</div>

        <div className="mt-2 flex items-center">
          <div className="flex items-center text-gray-500 line-through">
            <span>{formatCurrency(item.price_before_discount)}</span>
            <span className="text-sm">đ</span>
          </div>
          <div
            className={`flex items-center ml-2 font-medium ${darkMode ? "text-white" : "text-black"}`}
          >
            <span className="text-lg">{formatCurrency(item.price)}</span>
            <span className="text-base">đ</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
