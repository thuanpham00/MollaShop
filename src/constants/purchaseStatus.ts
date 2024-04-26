export const purchaseStatus = {
  inCart: -1, // sp đang trong giỏ hàng
  all: 0, // tất cả sản phẩm
  waitForConfirmation: 1, // sp đang đợi xác nhận từ shop
  waitForGetting: 2, // sp đang được lấy
  inProgress: 3, // sp đang vận chuyển
  delivered: 4, // sp đã được giao
  canceled: 5 // sp đã bị hủy
} as const