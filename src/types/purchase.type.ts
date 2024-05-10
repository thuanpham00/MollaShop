import { ProductItem } from "./product.type"

export type Purchase = {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchaseItemStatus
  user: string
  product: ProductItem
  createdAt: string
  updatedAt: string
}

export type PurchaseItemStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchasListStatus = PurchaseItemStatus | 0

export interface ExtendedPurchase extends Purchase {
  disable: boolean
  checked: boolean
}
