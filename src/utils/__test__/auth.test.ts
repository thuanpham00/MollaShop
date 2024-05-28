import { describe, it, expect, beforeEach } from "vitest"
import {
  clearLS,
  getAccessTokenToLs,
  getRefreshTokenToLs,
  setAccessTokenToLs,
  setRefreshTokenToLs
} from "../auth"

// cần set môi trường jsdom trước ở file vite.config
const access_token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mzc5NWNjYTcxYTZjMDI5ZGVjNDU0MyIsImVtYWlsIjoiYWRtaW5fQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMjVUMDM6MzM6NDguODMwWiIsImlhdCI6MTcxNjYwODAyOCwiZXhwIjoxNzE2NjA4MDMzfQ.ZPlYjfGk1J3ajV8H7CzHk_94ZRPRTVIZ8TPu830fXBE"

const refresh_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mzc5NWNjYTcxYTZjMDI5ZGVjNDU0MyIsImVtYWlsIjoiYWRtaW5fQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMjVUMDM6MjU6MzMuMTQ3WiIsImlhdCI6MTcxNjYwNzUzMywiZXhwIjoxNzE2NjExMTMzfQ.8_-dVZHSjdSGJENNafPAGbS6cDKzgKt6f9pilMrSOjs"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const profile =
//   '{"_id":"663795cca71a6c029dec4543","roles":["User"],"email":"admin_@gmail.com","createdAt":"2024-05-05T14:21:00.359Z","updatedAt":"2024-05-23T11:56:11.988Z","__v":0,"name":"Thuan Pham","date_of_birth":"2004-07-29T17:00:00.000Z","address":"hcm","phone":"0931554657","avatar":"54d37a0d-ba7b-494d-ad90-1c071fa1d837.jpg"}'

beforeEach(() => {
  localStorage.clear()
})

describe("setAccessTokenToLs", () => {
  it("access_token được set vào localStorage", () => {
    setAccessTokenToLs(access_token)
    expect(localStorage.getItem("access_token")).toBe(access_token)
  })
})

describe("setRefreshTokenToLs", () => {
  it("refresh_token được set vào localStorage", () => {
    setRefreshTokenToLs(refresh_token)
    expect(localStorage.getItem("refresh_token")).toBe(refresh_token)
  })
})

describe("getAccessTokenToLs", () => {
  it("Lấy access_token", () => {
    setAccessTokenToLs(access_token)
    expect(localStorage.getItem("access_token")).toBe(access_token)
  })
})

describe("getRefreshTokenToLs", () => {
  it("Lấy access_token", () => {
    setRefreshTokenToLs(refresh_token)
    expect(localStorage.getItem("refresh_token")).toBe(refresh_token)
  })
})

describe("clear", () => {
  it("xóa access_token refresh_token", () => {
    setAccessTokenToLs(access_token)
    setAccessTokenToLs(refresh_token)
    clearLS()

    expect(getAccessTokenToLs()).toBe("")
    expect(getRefreshTokenToLs()).toBe("")
  })
})
