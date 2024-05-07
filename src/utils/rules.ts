// định dạng validate form
import * as yup from "yup"

export const schema = yup
  .object({
    email: yup
      .string()
      .required("Email bắt buộc")
      .email("Email không đúng định dạng")
      .min(5, "Độ dài 6-160 kí tự")
      .max(160, "Độ dài 6-160 kí tự"),
    password: yup.string().required("Password bắt buộc").min(6, "Độ dài 6-160 kí tự").max(160, "Độ dài 6-160 kí tự"),
    confirm_password: yup
      .string()
      .required("Confirm password bắt buộc")
      .min(6, "Độ dài 6-160 kí tự")
      .max(160, "Độ dài 6-160 kí tự") // kiểu dữ liệu
      .oneOf([yup.ref("password")], "Nhập lại password không khớp"),
    price_min: yup.string().test({
      name: "price-not-allowed",
      message: "Giá không phù hợp",
      test: function (value) {
        const price_min = value
        const { price_max } = this.parent as { price_min: string; price_max: string }
        if (price_max !== "" && price_min !== "") {
          return Number(price_max) >= Number(price_min)
        }
        return price_max !== "" || price_min !== ""
      }
    }).defined(), // defined giúp loại bỏ giá trị undefined mà không cần dùng required
    price_max: yup.string().test({
      name: "price-not-allowed",
      message: "Giá không phù hợp",
      test: function (value) {
        const price_max = value
        const { price_min } = this.parent as { price_min: string; price_max: string }
        if (price_max !== "" && price_min !== "") {
          return Number(price_max) >= Number(price_min)
        }
        return price_max !== "" || price_min !== ""
      }
    }).defined(),
    name: yup.string().trim().required("Tên sản phẩm là bắt buộc") // defined giúp loại bỏ giá trị undefined mà không cần dùng required
  })
  .required()
// định dạng form (validate form)

export type SchemaType = yup.InferType<typeof schema> // lấy ra type của schema

export const userSchema = yup.object({
  name: yup.string().max(160, "Độ dài tối đa 160 kí tự"),
  phone: yup.string().max(20, "Độ dài tối đa 20 kí tự"),
  address: yup.string().max(160, "Độ dài tối đa 160 kí tự"),
  avatar: yup.string().max(1000, "Độ dài tối đa 1000 kí tự"),
  dateOfBirth: yup.date().max(new Date(), "Hãy chọn một ngày trong quá khứ"),
  password: schema.fields["password"],
  new_Password: schema.fields["password"],
  confirm_password: schema.fields["confirm_password"], // kế thừa schema
})

export type UserSchemaType = yup.InferType<typeof userSchema> // lấy ra type của userSchema