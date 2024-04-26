import InputNumber, { InputNumberProp } from "../InputNumber"

interface Props extends InputNumberProp {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  classNameWrapper = "ml-10",
  value,
  onType,
  ...rest
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    onType && onType(_value)
  }

  const increase = () => {
    let _value = Number(value) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value) // gán hàm này vô onClick đồng thời truyền value vào props // để component cha nhận được
  }

  const decrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value) // gán hàm này vô onClick đồng thời truyền value vào props // để component cha nhận được
  }

  /**
   * <QuantityController
        onDecrease={handleBuyCount}
        onIncrease={handleBuyCount}
        onType={handleBuyCount}
        value={buyCount}
        max={product.quantity}
      />
   */

  return (
    <div className={`flex items-center ` + classNameWrapper}>
      <button
        onClick={decrease}
        className="h-8 w-8 flex items-center border border-gray-200 justify-center hover:bg-gray-200 duration-100 rounded-tl rounded-bl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-3 h-3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </button>

      <InputNumber
        className=""
        classNameError="hidden"
        classNameInput="h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none"
        onChange={handleChange}
        value={value}
        {...rest}
      />

      <button
        onClick={increase}
        className="h-8 w-8 flex items-center border border-gray-200 justify-center hover:bg-gray-200 duration-100 rounded-tr rounded-br"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-3 h-3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>
  )
}
