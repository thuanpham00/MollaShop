import { InputHTMLAttributes } from "react"
import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
  messageInputError?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions // dùng schema validation thì ko cần dùng rules
  classNameInput?: string // ko nhất thiết phải truyền vào props
  classNameError?: string // ko nhất thiết phải truyền vào props
}
// nó sẽ thừa kế lại các attribute của thẻ input

export default function Input({
  className,
  name,
  messageInputError,
  register,
  rules,
  classNameInput = "w-full p-3 border border-gray-200 outline-none text-black text-sm font-normal",
  classNameError = "mt-1 min-h-[1.25rem] text-red-500 text-sm",
  ...rest
}: PropsType) {
  const registerResult = register && name ? { ...register(name, rules) } : {}
  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...rest} />
      <div className={classNameError}>{messageInputError}</div>
    </div>
  )
}

// cái ...rest đại diện cho các thuộc tính thêm vô bất kì (type, name, autocomplete, placeholder ....)
