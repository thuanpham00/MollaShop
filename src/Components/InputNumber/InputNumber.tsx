import { InputHTMLAttributes, forwardRef, useState } from "react"

export interface InputNumberProp extends InputHTMLAttributes<HTMLInputElement> {
  messageInputError?: string
  classNameInput?: string // ko nhất thiết phải truyền vào props
  classNameError?: string // ko nhất thiết phải truyền vào props
}
// nó sẽ thừa kế lại các attribute của thẻ input
const InputNumber = forwardRef<HTMLInputElement, InputNumberProp>(function InputNumberRef(
  {
    className,
    messageInputError,
    classNameInput = "w-full p-3 border border-gray-200 outline-none text-black text-sm font-normal",
    classNameError = "hidden",
    onChange,
    value = "",
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = event.target.value
    if (/^\d+$/.test(valueInput) || valueInput === "") {
      // thực thi onChange callback từ bên ngoài truyền vào props
      // regex kiem tra so
      onChange && onChange(event)
      // cập nhật localValue
      setLocalValue(value as string)
    }
  }

  return (
    <div className={className}>
      <input
        className={classNameInput}
        {...rest}
        onChange={handleChange}
        value={value || localValue}
        ref={ref}
      />
      <div className={classNameError}>{messageInputError}</div>
    </div>
  )
})

export default InputNumber
