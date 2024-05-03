import { PurchasListStatus, Purchase } from "src/types/purchase.type"
import { SuccessResponse } from "src/types/utils.type"
import Http from "src/utils/http"

export const purchaseApi = {
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return Http.post<SuccessResponse<Purchase>>("purchases/add-to-cart", body)
  },
  getPurchases: (params: { status: PurchasListStatus }) => {
    return Http.get<SuccessResponse<Purchase[]>>("purchases", {
      params
    })
  },
  buyPurchases: (body: { product_id: string; buy_count: number }[]) => {
    return Http.post<SuccessResponse<Purchase[]>>("purchases/buy-products", body)
  },
  updatePurchases: (body: { product_id: string; buy_count: number }) => {
    return Http.put<SuccessResponse<Purchase>>("purchases/update-purchase", body)
  },
  deletePurchases: (purchasesId: string[]) => {
    return Http.delete<SuccessResponse<{ deleted_count: number }>>("purchases", {
      data: purchasesId
    })
  }
}

// nhớ check postman trước - coi nó trả về cái gì
