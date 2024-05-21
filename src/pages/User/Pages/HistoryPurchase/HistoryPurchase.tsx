import { keepPreviousData, useQuery } from "@tanstack/react-query"
import classNames from "classnames"
import { useContext } from "react"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
import { Link, createSearchParams } from "react-router-dom"
import useQueryParams from "src/Hooks/useSearchParams"
import { purchaseApi } from "src/apis/purchase.api"
import { path } from "src/constants/path"
import { purchaseStatus } from "src/constants/purchaseStatus"
import { AppContext } from "src/contexts/auth.context"
import { PurchasListStatus } from "src/types/purchase.type"
import { formatCurrency, generateNameId } from "src/utils/utils"

const purchaseTab = [
  {
    status: purchaseStatus.all,
    name: "Tất cả"
  },
  {
    status: purchaseStatus.waitForConfirmation,
    name: "Chờ xác nhận"
  },
  {
    status: purchaseStatus.waitForGetting,
    name: "Chờ lấy hàng"
  },
  {
    status: purchaseStatus.inProgress,
    name: "Đang giao"
  },
  {
    status: purchaseStatus.delivered,
    name: "Đã giao"
  },
  {
    status: purchaseStatus.canceled,
    name: "Đã hủy"
  }
]
// tạo array rồi map ra hoặc tạo component chung
// status lấy từ url xuống
// nhấp vô thẻ Link nào thì nó điều hướng tới trang đó (từ url - status)
// và đồng thời status từ url truyền vô query fetch ra data

export default function HistoryPurchase() {
  const { t } = useTranslation("profile")
  const { darkMode } = useContext(AppContext)
  const queryParam: { status?: string } = useQueryParams() // đọc từ url lấy xuống
  const status: number = Number(queryParam.status) || purchaseStatus.all

  const getPurchasesListQuery = useQuery({
    queryKey: ["purchaseList", { status }],
    queryFn: () => {
      return purchaseApi.getPurchases({ status: status as PurchasListStatus }) //
    },
    placeholderData: keepPreviousData // giữ lại giá trị cũ
  })
  const purchaseList = getPurchasesListQuery.data?.data.data
  // console.log(purchaseList)

  // nhỏ hơn 700px xuất hiện thanh scroll ngang
  return (
    <div>
      <Helmet>
        <title>Lịch sử mua hàng</title>
        <meta name="description" content="Lịch sử mua hàng | E-commerce shop" />
      </Helmet>

      <div className="overflow-auto">
        <div className="min-w-[700px]">
          <div className={`${darkMode ? "bg-[#252323]" : "bg-[#fff]"} flex sticky top-0`}>
            {purchaseTab.map((item, index) => (
              <Link
                key={index}
                to={{
                  pathname: path.historyPurchase,
                  search: createSearchParams({ status: item.status.toString() }).toString()
                }}
                className={classNames(
                  "flex flex-1 items-center justify-center border-b-2 py-4 text-center",
                  {
                    "border-b-primaryOrange text-primaryOrange": status === item.status,
                    "border-b-black/10 text-gray-900": !darkMode && status !== item.status,
                    "border-b-white/90 text-white": darkMode && status !== item.status
                  }
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div>
            {purchaseList?.map((item) => (
              <div
                key={item._id}
                className="mt-4 rounded-sm border-red/10 p-6 text-gray-500 shadow-sm"
              >
                <Link
                  to={`${path.home}${generateNameId({ name: item.product.name, id: item.product._id })}`}
                  className="flex"
                >
                  <div className="flex-shrink-0">
                    <div className="h-20 w-20 object-cover">
                      <img src={item.product.image} alt={item.product.name} />
                    </div>
                  </div>
                  <div
                    className={`${darkMode ? "text-[#fff]" : ""} ml-3 flex-grow overflow-hidden`}
                  >
                    <div className="truncate">{item.product.name}</div>
                    <div className="mt-3">x{item.buy_count}</div>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`${darkMode ? "text-[#fff]" : "text-gray-500"} truncate line-through`}
                    >
                      {formatCurrency(item.product.price_before_discount)}đ
                    </span>
                    <span className="ml-3 truncate text-red-500">
                      {formatCurrency(item.product.price)}đ
                    </span>
                  </div>
                </Link>
                <div className="flex items-center justify-end">
                  <span>{t("historyPurchase.totalPrice")} </span>
                  <span className="ml-3 text-xl text-red-500">
                    {formatCurrency(item.product.price * item.buy_count)}đ
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
