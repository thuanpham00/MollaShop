import { ProductItem, ProductList, ProductListConfig } from "src/types/product.type"
import { SuccessResponse } from "src/types/utils.type"
import Http from "src/utils/http"

export const productApi = {
  getProductList: (params: ProductListConfig) => {
    return Http.get<SuccessResponse<ProductList>>("products", {
      params
    })
  },
  getProductDetail: (id: string) => {
    return Http.get<SuccessResponse<ProductItem>>(`products/${id}`)
  }
}

// api backend
