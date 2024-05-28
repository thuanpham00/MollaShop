import { it, describe, expect } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"

//test app render và react router
// expect.extend(matchers)

describe("App", () => {
  it("App render và chuyển trang", async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ) // render cả trang
    /**
     * waitFor sẽ run callback 1 vài lần
     * cho đến khi hết timeout hoặc expect pass
     * số lần run phụ thuộc vào timeout và interval
     * mặc định: timeout = 1000ms và interval = 50ms
     */

    // Verify vào đúng trang chủ
    await waitFor(() => {
      expect(document.querySelector("title")?.textContent).toBe("Trang chủ")
    })

    // Verify chuyển sang trang login
    await user.click(screen.getByText(/Login/i))
    await waitFor(() => {
      expect(screen.queryByText("Do not have an account?")).toBeTruthy()
      expect(document.querySelector("title")?.textContent).toBe("Đăng nhập")
    })

    

    screen.debug(document.body.parentNode as HTMLElement, 99999999)
  })
})
