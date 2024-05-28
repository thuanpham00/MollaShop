import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import PRODUCTLIST_EN from "src/locales/en/productList.json"
import PRODUCTLIST_VI from "src/locales/vi/productList.json"

import PRODUCTDETAIL_VI from "src/locales/vi/productDetail.json"
import PRODUCTDETAIL_EN from "src/locales/en/productDetail.json"

import HEADER_EN from "src/locales/en/header.json"
import HEADER_VI from "src/locales/vi/header.json"

import HOME_EN from "src/locales/en/home.json"
import HOME_VI from "src/locales/vi/home.json"

import FOOTER_EN from "src/locales/en/footer.json"
import FOOTER_VI from "src/locales/vi/footer.json"

import CART_EN from "src/locales/en/cart.json"
import CART_VI from "src/locales/vi/cart.json"

import PROFILE_EN from "src/locales/en/profile.json"
import PROFILE_VI from "src/locales/vi/profile.json"

export const locales = {
  en: "English",
  vi: "Tiếng việt"
}

export const resources = {
  en: {
    // gọi là namespace
    header: HEADER_EN,
    productList: PRODUCTLIST_EN,
    productDetail: PRODUCTDETAIL_EN,
    home: HOME_EN,
    footer: FOOTER_EN,
    cart: CART_EN,
    profile: PROFILE_EN
  },
  vi: {
    // gọi là namespace
    header: HEADER_VI,
    productList: PRODUCTLIST_VI,
    productDetail: PRODUCTDETAIL_VI,
    home: HOME_VI,
    footer: FOOTER_VI,
    cart: CART_VI,
    profile: PROFILE_VI
  }
}

export const defaultNS = "home" // giúp ko có truyền namespace thì lấy mặc định home

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: "en", // ngôn ngữ mặc định
  ns: ["productList", "productDetail", "header", "home", "footer", "cart", "profile"], // những ns sử dụng
  defaultNS,
  fallbackLng: "vi", // khi gặp lỗi nó mặc định ngôn ngữ
  interpolation: {
    escapeValue: false // chống xss
  }
})
