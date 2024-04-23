import { InputHTMLAttributes, forwardRef } from "react"

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
    ...rest
  },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = event.target.value
    if ((/^\d+$/.test(valueInput) || valueInput === "") && onChange) {
      // regex kiem tra so
      onChange(event)
    }
  }

  return (
    <div className={className}>
      <input className={classNameInput} {...rest} onChange={handleChange} ref={ref} />
      <div className={classNameError}>{messageInputError}</div>
    </div>
  )
})

export default InputNumber