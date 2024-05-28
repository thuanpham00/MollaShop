import { describe, it, expect } from "vitest"
import { demo, isAxiosError, isError422 } from "../utils"
import { AxiosError } from "axios"
import { HttpStatusCode } from "src/constants/httpStatusCode.enum"
// describe dùng để mô tả tập hợp các ngữ cảnh hoặc 1 đơn vị cần test: ví dụ Function, component

describe("isAxiosError", () => {
  // it dùng để ghi chú trường hợp cần test
  it("isAxiosError trả về boolean", () => {
    // expect dùng để mong đợi giá trị trả về
    expect(isAxiosError(new Error())).toBe(false) // ngược lại nó truyền vào khác lỗi AxiosError và trả về false nên nó passed qua
    expect(isAxiosError(new AxiosError())).toBe(true) // hàm này nó chỉ nhận lỗi AxiosError nếu đúng giá trị nó trả về là true và sẽ passed qua
  })
})

describe("isError422", () => {
  // it dùng để ghi chú trường hợp cần test
  it("isError422 trả về boolean", () => {
    // expect dùng để mong đợi giá trị trả về
    expect(isError422(new Error())).toBe(false)
    expect(
      isError422(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError, // 500 // ko đúng lỗi 422 và trả về false => passed
          data: null
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(false)

    expect(
      isError422(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity, // 422 // đúng lỗi 422 nó sẽ đúng và trả về true => passed
          data: null
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(true)
  })
})

describe("demo", () => {
  it("demo return 1", () => {
    expect(demo(4)).toBe(2)
  })
})
