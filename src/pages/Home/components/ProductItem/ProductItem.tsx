import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import ProductRating from "src/Components/ProductRating"
import { path } from "src/constants/path"
import { AppContext } from "src/contexts/auth.context"
import { ProductItem as typeProductItem } from "src/types/product.type"
import { formatCurrency, generateNameId } from "src/utils/utils"

interface Props {
  item: typeProductItem
}

export default function ProductItem({ item }: Props) {
  const { darkMode } = useContext(AppContext)
  const [currentImg, setCurrentImg] = useState(item.images[0])

  const handleChangeImgNew = () => {
    setCurrentImg(item.images[1])
  }

  const handleChangeImgOld = () => {
    setCurrentImg(item.images[0])
  }

  const handleScroll = () => {
    window.scrollTo({ top: 0 })
  }

  return (
    <div
      className={`w-full border ${darkMode ? "border-gray-500" : ""} p-5 rounded-sm hover:shadow-xl`}
    >
      <div
        onMouseEnter={handleChangeImgNew}
        onMouseLeave={handleChangeImgOld}
        className="duration-200 transition"
      >
        <img src={currentImg} alt={item.name} />
      </div>
      <div className="py-3 text-center">
        <span className={`mt-1 ${darkMode ? "text-[#fff]" : "text-gray-400"} block`}>
          {item.category.name}
        </span>
        <div className="flex justify-center mt-1">
          <ProductRating rating={item.rating} />
        </div>
        <div
          className={`mt-1 w-full font-medium text-xs md:text-sm ${darkMode ? "text-[#fff]" : "text-[#000]"} block px-10 truncate `}
        >
          {" "}
          {item.name}
        </div>
        <span className={`${darkMode ? "text-[#fff]" : "text-gray-700"} mt-1 mb-4 block`}>
          {formatCurrency(item.price)}đ
        </span>
        <Link
          onClick={handleScroll}
          className={`mt-4 px-3 py-2 bg-transparent border duration-200 ${darkMode ? "border-white hover:bg-white/20 text-white hover:text-white/80" : "border-black hover:bg-black/10 text-black"} rounded`}
          to={`${path.home}${generateNameId({ name: item.name, id: item._id })}`}
        >
          Xem thêm
        </Link>
      </div>
    </div>
  )
}
