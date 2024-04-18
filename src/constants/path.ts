export const path = {
  home: "/", // trang chủ
  productList: "/productList",
  productDetail: ":id",
  profile: "/profile",
  login: "/login",
  register: "/register",
  logout: "/logout"
} as const

// chỉ có home, productList, productDetail không cần đăng nhập
// chuyển route