import { screen, waitFor, fireEvent } from "@testing-library/react"
import { path } from "src/constants/path"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { renderWithRouter } from "src/testUtils"
import { beforeAll, describe, expect, it } from "vitest"

describe("Login", () => {
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let submitButton: HTMLButtonElement
  beforeAll(async () => {
    renderWithRouter({ route: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText("Email")).toBeTruthy()
    })

    emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
  })

  it("Hiển thị lỗi required khi không nhập gì", async () => {
    fireEvent.submit(submitButton)

    // waitFor để đợi xử lý bất đồng bộ nên cần thêm async await
    await waitFor(() => {
      expect(screen.queryByText("Email bắt buộc")).toBeTruthy()
      expect(screen.queryByText("Password bắt buộc")).toBeTruthy()
    })
  })

  it("Hiển thị lỗi khi nhập value input sai", async () => {
    fireEvent.change(emailInput, {
      target: {
        value: "te"
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: "123"
      }
    })
    // test cho nó báo lỗi input khi login
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(screen.queryByText("Email không đúng định dạng")).toBeTruthy()
      expect(screen.queryByText("Độ dài 6-160 kí tự")).toBeTruthy()
    })
  })

  it("không nên hiển thị lỗi khi nhập lại value đúng", async () => {
    fireEvent.change(emailInput, {
      target: {
        value: "test@gmail.com"
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: "1234567"
      }
    })
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(screen.queryByText("Email không đúng định dạng")).toBeFalsy()
      expect(screen.queryByText("Độ dài 6-160 kí tự")).toBeFalsy()
    })
    // test cho nó báo lỗi input khi login
    // những trường hợp chứng minh rằng tìm không ra text hay là element
    // thì nên dùng query hơn là find hay get
    // await logScreen()

    // await waitFor(() => {
    //   expect(document.querySelector("title")?.textContent).toBe("")
    // })
  })
})
