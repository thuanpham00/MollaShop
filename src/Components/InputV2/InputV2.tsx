import { InputHTMLAttributes, useState } from "react"
import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form"
// cải tiến bao gồm cả chức năng của component Input và InputNumber
export interface InputNumberProp extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string // ko nhất thiết phải truyền vào props
  classNameError?: string // ko nhất thiết phải truyền vào props
}
// nó sẽ thừa kế lại các attribute của thẻ input
function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputNumberProp) {
  const {
    type,
    onChange,
    className,
    classNameInput = "w-full p-3 border border-gray-200 outline-none text-black text-sm font-normal",
    classNameError = "hidden",
    value = "",
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = event.target.value
    // regex kiem tra so
    const numberCondition = type === "number" && (/^\d+$/.test(valueInput) || valueInput === "")
    if (numberCondition || type !== "number") {
      // cập nhật localValue
      setLocalValue(valueInput)
      // gọi field.onChange để cập nhật vào state React hook form
      field.onChange(event)
      // thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
    }
  }

  return (
    <div className={className}>
      <input
        className={classNameInput}
        {...rest}
        {...field} // bao gồm cả ref
        onChange={handleChange}
        value={value || localValue}
      />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputV2

// type Gen<TFunc> = {
//   getName: TFunc
// }

// function Hexa<TFunc extends () => string, TLastName extends ReturnType<TFunc>>(props: {
//   person: Gen<TFunc>
//   lastName: TLastName
// }) {
//   return null
// }

// const handleName: () => "Duoc" = () => "Duoc"

// function App() {
//   return <Hexa person={{ getName: handleName }} lastName="Duoc" />
// }

////// nói chung là nhập vào cái thứ 1 nó gợi ý cái thứ 2 y chang như thế
