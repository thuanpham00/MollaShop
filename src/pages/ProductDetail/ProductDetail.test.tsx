import { delay, renderWithRouter } from "src/testUtils"
import { describe, expect, it } from "vitest"

describe("ProductDetail", () => {
  it("render UI ProductDetail", async () => {
    renderWithRouter({
      route: "/Điện-thoại-Apple-Iphone-12-64GB--Hàng-chính-hãng-VNA-i-60afb1c56ef5b902180aacb8"
    })
    await delay(1000)
    expect(document.body).toMatchSnapshot() // so sánh đối chiếu
    /**
     * sử dụng để lưu trữ trạng thái hiện tại của một phần mềm
     * (hoặc một thành phần của nó) và sau
     * đó so sánh trạng thái đó với một phiên bản đã lưu trước đó.
     */
    // await screen.debug(document.body.querySelector(".bg-gray-200"))
  })
})
