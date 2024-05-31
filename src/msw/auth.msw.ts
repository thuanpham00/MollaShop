import { rest } from "msw"
import { config } from "src/constants/config"
import { HttpStatusCode } from "src/constants/httpStatusCode.enum"

export const access_token_1giay =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mzc5NWNjYTcxYTZjMDI5ZGVjNDU0MyIsImVtYWlsIjoiYWRtaW5fQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMjVUMTE6MDg6MjguMTc3WiIsImlhdCI6MTcxNjYzNTMwOCwiZXhwIjoxNzE2NjM1MzA5fQ.XSqC1ltfny9_iXv_h6YcNOCEAO-rR7BCvAeiIL-npjY"

export const refresh_token_1000days =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mzc5NWNjYTcxYTZjMDI5ZGVjNDU0MyIsImVtYWlsIjoiYWRtaW5fQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMjVUMTE6MTI6MzAuMjYzWiIsImlhdCI6MTcxNjYzNTU1MCwiZXhwIjoxODAzMDM1NTUwfQ.5G8fPhCn2xoVqN7CZU186gPnB2DeSSuAeGZVK5zyVO4"

export const access_token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mzc5NWNjYTcxYTZjMDI5ZGVjNDU0MyIsImVtYWlsIjoiYWRtaW5fQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMzFUMjA6MDM6MTMuMzgzWiIsImlhdCI6MTcxNzE4NTc5MywiZXhwIjoxNzI3MTg1NzkyfQ.dJcoDGzitfvtujkUxpgv5gC0qBiXiL6GT7PKhmjqjWQ"

export const loginRes = {
  message: "Đăng nhập thành công",
  data: {
    access_token:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mzc5NWNjYTcxYTZjMDI5ZGVjNDU0MyIsImVtYWlsIjoiYWRtaW5fQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMzBUMTg6NTc6MDIuNjUzWiIsImlhdCI6MTcxNzA5NTQyMiwiZXhwIjoxNzI3MDk1NDIxfQ.Gp6FlBrpbooRWRlTx040VDR8pJoTh25iYokc5jkmPBg",
    expires: 9999999,
    refresh_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mzc5NWNjYTcxYTZjMDI5ZGVjNDU0MyIsImVtYWlsIjoiYWRtaW5fQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMzBUMTg6NTc6MDIuNjUzWiIsImlhdCI6MTcxNzA5NTQyMiwiZXhwIjoxODAzNDk1NDIyfQ.XwGEfkAasnc7sBxGqOF3WVqfygvPhd3YFronSrZ4q_A",
    expires_refresh_token: 86400000,
    user: {
      _id: "663795cca71a6c029dec4543",
      roles: ["User"],
      email: "admin_@gmail.com",
      createdAt: "2024-05-05T14:21:00.359Z",
      updatedAt: "2024-05-23T11:56:11.988Z",
      __v: 0,
      name: "Thuan Pham",
      date_of_birth: "2004-07-29T17:00:00.000Z",
      address: "hcm",
      phone: "0931554657",
      avatar: "54d37a0d-ba7b-494d-ad90-1c071fa1d837.jpg"
    }
  }
}

const refreshTokenRes = {
  message: "Refresh Token thành công",
  data: {
    access_token:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mzc5NWNjYTcxYTZjMDI5ZGVjNDU0MyIsImVtYWlsIjoiYWRtaW5fQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMzFUMTg6MjI6MTQuMTY0WiIsImlhdCI6MTcxNzE3OTczNCwiZXhwIjoxNzE3Nzg0NTM0fQ.m9BM2RKSxCvbcS1xS5TkuM8THpuJioKZ2QLm23tBizY"
  }
}

const loginRequest = rest.post(`${config.baseUrl}login`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes))
})

const refreshToken = rest.post(`${config.baseUrl}refresh-access-token`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(refreshTokenRes))
})

export const authRequests = [loginRequest, refreshToken]
