import { Categories } from "src/types/categories.type"
import { SuccessResponse } from "src/types/utils.type"
import Http from "src/utils/http"

export const categoriesApi = {
  getCategories: () => {
    return Http.get<SuccessResponse<Categories[]>>("categories")
  }
}
