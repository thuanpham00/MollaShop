import { useMutation, useQuery } from "@tanstack/react-query"
import { Fragment, useContext, useEffect, useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import Button from "src/Components/Button"
import QuantityController from "src/Components/QuantityController"
import { purchaseApi } from "src/apis/purchase.api"
import { path } from "src/constants/path"
import { purchaseStatus } from "src/constants/purchaseStatus"
import { formatCurrency, generateNameId } from "src/utils/utils"
import { produce } from "immer"
import { AppContext } from "src/contexts/auth.context"

// không có tính năng tree-shaking
//import { keyBy } from "lodash"

import keyBy from "lodash/keyBy"
// import chỉ mỗi function keyBy // giảm kích thước file

import { toast } from "react-toastify"
import cartImg from "src/img/cart.png"
import { useTranslation } from "react-i18next"
import { Helmet } from "react-helmet"

type PurchaseType = {
  product_id: string
  buy_count: number
}

export default function Cart() {
  const { t } = useTranslation(["cart", "productDetail"])
  const location = useLocation()
  const chosenPurchaseFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId
  //console.log(chosenPurchaseFromLocation)

  const { darkMode } = useContext(AppContext)
  const { extendedPurchase, setExtendedPurchase } = useContext(AppContext)
  const getPurchasesListQuery = useQuery({
    queryKey: ["purchaseList", { status: purchaseStatus.inCart }],
    queryFn: () => {
      return purchaseApi.getPurchases({ status: purchaseStatus.inCart })
    }
  })
  const purchaseList = getPurchasesListQuery.data?.data.data
  //console.log(purchaseList)

  useEffect(() => {
    setExtendedPurchase((prev) => {
      const extendPurchasesObject = keyBy(prev, "_id")
      //console.log(extendPurchasesObject);
      return (
        purchaseList?.map((purchase) => {
          const isChosenPurchaseFromLocation = chosenPurchaseFromLocation === purchase._id // so sánh nếu id từ state bằng với purchaseId trong mảng thì checked
          return {
            ...purchase,
            disable: false,
            checked:
              isChosenPurchaseFromLocation || Boolean(extendPurchasesObject[purchase._id]?.checked) // giữ nguyên trạng thái checked của item
          }
        }) || []
      )
    })
  }, [purchaseList, chosenPurchaseFromLocation, setExtendedPurchase]) // purchaseList mở rộng thêm 2 thuộc tính checked và disable khi thực hiện tăng số lượng

  useEffect(() => {
    return () => {
      history.replaceState(null, "") // destroy state khi f5 lại
    }
  }, [])

  // biến không bị làm mới khi component render -> tăng performance
  // hàm => useCallBack()
  const isAllChecked = useMemo(
    () => extendedPurchase.every((purchase) => purchase.checked),
    [extendedPurchase]
  )

  // hàm every() chỉ chạy khi tất cả các purchase đều checked = true // nếu có false nó sẽ dùng
  const checkedPurchases = useMemo(
    () => extendedPurchase.filter((purchase) => purchase.checked),
    [extendedPurchase]
  ) // lấy ra các item được checked

  const checkedPriceTotal = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchases]
  )

  const checkedPriceSave = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return (
          result +
          (current.product.price_before_discount - current.product.price) * current.buy_count
        )
      }, 0),
    [checkedPurchases]
  )

  // hàm reduce để tính tổng phần tử thỏa mản điều kiện // 0 là result ban đầu = 0

  const checkedPurchasesCount = checkedPurchases.length

  const handleCheckedPurchase =
    (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setExtendedPurchase(
        produce((draft) => {
          draft[purchaseIndex].checked = event.target.checked // đại diện extendedPurchase previous
        }) // sử dụng thư viện immer
      )
    }

  const handleAllCheck = () => {
    setExtendedPurchase((prev) => prev.map((purchase) => ({ ...purchase, checked: !isAllChecked })))
  }
  // extendedPurchase đã bao gồm purchaseList
  // 1 danh sách duyệt qua từng phần tử, trong mỗi phần tử duyệt vào từng thuộc tính để thực thi

  const updatePurchaseMutation = useMutation({
    mutationFn: (body: PurchaseType) => {
      return purchaseApi.updatePurchases(body)
    },
    onSuccess: () => {
      getPurchasesListQuery.refetch()
    }
  })

  const buyProductMutation = useMutation({
    mutationFn: (body: PurchaseType[]) => {
      return purchaseApi.buyPurchases(body)
    },
    onSuccess: () => {
      getPurchasesListQuery.refetch()
    }
  })

  const deleteProductMutation = useMutation({
    mutationFn: (purchaseId: string[]) => {
      return purchaseApi.deletePurchases(purchaseId)
    },
    onSuccess: () => {
      getPurchasesListQuery.refetch()
    }
  })

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchase[purchaseIndex] // nó là 1 purchaseList mở rộng
      setExtendedPurchase(
        produce((draft) => {
          draft[purchaseIndex].disable = true // khi call api nó disable
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value // draft[purchaseIndex] tượng trưng cho 1 phần tử trong list
      })
    )
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchase[purchaseIndex]._id
    deleteProductMutation.mutate([purchaseId])
  }

  const handleDeleteMany = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deleteProductMutation.mutate(purchaseIds)
  }

  const handleBuyPurchases = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductMutation.mutate(body, {
        onSuccess: () => {
          toast.success("Mua sản phẩm thành công")
        }
      })
    }
  }

  if (!purchaseList) return null
  return (
    <div
      className={`${darkMode ? "bg-gradient-to-r from-[#232526] to-[#414345]" : "bg-neutral-100"} py-4 duration-200`}
    >
      <Helmet>
        <title>Giỏ hàng</title>
        <meta name="description" content="Giỏ hàng - E-commerce shop" />
      </Helmet>

      <div className="container">
        {extendedPurchase && extendedPurchase.length > 0 ? (
          <Fragment>
            <div className="overflow-auto">
              <div className="min-w-[1000px]">
                <div
                  className={`${darkMode ? "bg-[#252323] text-white" : "bg-white"} grid grid-cols-12 rounded-sm py-5 px-9 text-sm capitalize text-gray-500 shadow duration-200`}
                >
                  <div className="col-span-6">
                    <div className="flex items-center">
                      <div className="flex flex-shrink-0 items-center justify-center pr-3">
                        <input
                          type="checkbox"
                          className="w-5 h-5 accent-orange-500"
                          checked={isAllChecked}
                          onChange={handleAllCheck}
                          defaultChecked
                        />
                      </div>
                      <div
                        className={`flex-grow duration-200 ${darkMode ? "text-white" : "text-black"}`}
                      >
                        {t("product")}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="grid grid-cols-5 text-center">
                      <div className="col-span-2">{t("unitPrice")}</div>
                      <div className="col-span-1">{t("quantity")}</div>
                      <div className="col-span-1">{t("price")}</div>
                      <div className="col-span-1">{t("operation")}</div>
                    </div>
                  </div>
                </div>

                <div
                  className={`${darkMode ? "bg-[#252323]" : "bg-white"} my-3 rounded-sm p-5 shadow duration-200`}
                >
                  {extendedPurchase.map((item, index) => {
                    return (
                      <div
                        key={item._id}
                        className={`first:mt-0 mb-5 grid grid-cols-12 rounded-sm border border-gray-200 items-center py-5 px-4 text-center text-sm text-gray-500 duration-200 ${darkMode ? "bg-[#252323] text-white" : "bg-white"}`}
                      >
                        <div className="col-span-6">
                          <div className="flex">
                            <div className="flex flex-shrink-0 items-center justify-center pr-3">
                              <input
                                type="checkbox"
                                className="w-5 h-5 accent-orange-500"
                                checked={item.checked}
                                defaultChecked
                                onChange={handleCheckedPurchase(index)} // do dùng currying nên sẽ return lại (hàm chưa được gọi)
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center">
                                <Link
                                  to={`${path.home}${generateNameId({ name: item.product.name, id: item.product._id })}`}
                                  className="h-20 w-20 flex-shrink-0"
                                >
                                  <img src={item.product.image} alt={item.product.name} />
                                </Link>
                                <div className="flex-grow px-2 pt-1 pb-2 text-left">
                                  <Link
                                    to={`${path.home}${generateNameId({ name: item.product.name, id: item.product._id })}`}
                                    className="line-clamp-2"
                                  >
                                    {item.product.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-6">
                          <div className="grid grid-cols-5 items-center">
                            <div className="col-span-2">
                              <div className="flex items-center justify-center">
                                <span className="text-gray-300 line-through">
                                  {formatCurrency(item.product.price_before_discount)}đ
                                </span>
                                <span className="ml-3">{formatCurrency(item.product.price)}đ</span>
                              </div>
                            </div>
                            <div className="col-span-1">
                              <QuantityController
                                max={item.product.quantity}
                                value={item.buy_count}
                                classNameWrapper="flex items-center"
                                onIncrease={(value) =>
                                  handleQuantity(index, value, value <= item.product.quantity)
                                }
                                onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                onType={handleTypeQuantity(index)} // do dùng currying nên sẽ return lại (hàm chưa được gọi)
                                onFocusOut={(value) =>
                                  handleQuantity(
                                    index,
                                    value,
                                    value >= 1 &&
                                      value <= item.product.quantity &&
                                      value !== purchaseList[index].buy_count
                                  )
                                }
                                disabled={item.disable}
                              />
                            </div>
                            <div className="col-span-1">
                              <span className="text-red-500">
                                {formatCurrency(item.product.price * item.buy_count)}đ
                              </span>
                            </div>
                            <div className="col-span-1">
                              <button
                                onClick={handleDelete(index)} // do dùng currying nên sẽ return lại (hàm chưa được gọi)
                                className={`${darkMode ? "text-white" : "text-black"} bg-none duration-200 transition-colors hover:text-orange-500`}
                              >
                                {t("delete")}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div
              className={`sticky left-0 bottom-0 z-10 flex flex-col items-start sm:flex-row sm:items-center rounded-sm p-5 pr-10 shadow border border-gray-200 mt-10 ${darkMode ? "bg-[#252323] text-white" : "bg-white"}`}
            >
              <div className="flex items-center">
                <div className="flex flex-shrink-0 items-center justify-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-orange-500"
                    checked={isAllChecked}
                    defaultChecked
                    onClick={handleAllCheck}
                  />
                </div>
                <button className="bg-none mx-3 border-none">
                  {t("selectAll")} ({extendedPurchase.length})
                </button>
                <button onClick={handleDeleteMany} className="bg-none mx-3 border-none">
                  {t("delete")}
                </button>
              </div>
              <div className="ml-auto flex flex-col items-start sm:flex-row sm:items-center mt-5 sm:mt-0">
                <div>
                  <div className="flex items-center justify-end">
                    <div>{`${t("totalPayment")} (${checkedPurchasesCount}) ${t("cart:product")}`}</div>
                    <div className="ml-2 text-2xl text-orange-500">
                      {formatCurrency(checkedPriceTotal)}đ
                    </div>
                  </div>
                  <div className="flex items-center justify-end text-sm">
                    <div className={`${darkMode ? "text-white font-light" : "text-gray-500"}`}>
                      {t("cart:save")}
                    </div>
                    <div className="ml-6 text-orange-500">{formatCurrency(checkedPriceSave)}đ</div>
                  </div>
                </div>
                <Button
                  onClick={handleBuyPurchases}
                  disabled={buyProductMutation.isPending}
                  classInput="sm:ml-4 mt-5 sm:mt-0 h-10 w-52 flex items-center justify-center gap-x-2 w-full bg-primaryColor text-white uppercase hover:bg-primaryColor/80 duration-300"
                >
                  {t("productDetail:buyNow")}
                </Button>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="p-2 flex items-center justify-center flex-col">
              <img src={cartImg} alt="ảnh lỗi" className="w-[200px]" />
              <h1>{t("cart:noProduct")}</h1>
              <Link
                to={path.productList}
                className="uppercase px-5 py-3 bg-primaryColor hover:bg-primaryColor/80 duration-200 transition-all text-white mt-5"
              >
                {t("productDetail:buyNow")}
              </Link>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  )
}
