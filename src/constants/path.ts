export const path = {
  home: "/", // trang chủ
  productList: "/productList",
  productDetail: ":nameId",
  user: "/user",
  profile: "/user/profile",
  changePassword: "/user/password",
  historyPurchase: "/user/purchase",
  login: "/login",
  register: "/register",
  logout: "/logout",
  cart: "/cart"
} as const

// chỉ có home, productList, productDetail không cần đăng nhập
// chuyển route
