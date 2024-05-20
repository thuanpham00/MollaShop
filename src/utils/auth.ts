import { User } from "src/types/user.type"

export const setAccessTokenToLs = (access_token: string) => {
  return localStorage.setItem("access_token", access_token)
}

export const getAccessTokenToLs = () => {
  return localStorage.getItem("access_token") || ""
}

export const setRefreshTokenToLs = (refresh_token: string) => {
  return localStorage.setItem("refresh_token", refresh_token)
}

export const getRefreshTokenToLs = () => {
  return localStorage.getItem("refresh_token") || ""
}

export const setProfileToLs = (profile: User) => {
  return localStorage.setItem("profile", JSON.stringify(profile)) // lưu vô Ls thì chuyển nó thành string
}

export const getProfileToLs = () => {
  const result = localStorage.getItem("profile")
  return result ? JSON.parse(result) : null
}

export const LocalStorageEventTarget = new EventTarget()

export const clearLS = () => {
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  localStorage.removeItem("profile")
  const ClearLSEvent = new Event("ClearLS")
  LocalStorageEventTarget.dispatchEvent(ClearLSEvent)
}

export const setDarkModeToLs = (darkMode: string) => {
  return localStorage.setItem("darkMode", darkMode)
}

export const getDarkModeToLs = () => {
  return localStorage.getItem("darkMode") || ""
}
