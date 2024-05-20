import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { Fragment } from "react/jsx-runtime"
import { config } from "src/constants/config"

interface Props {
  onChange?: (file?: File) => void
}

export default function InputFileImage({ onChange }: Props) {
  const { t } = useTranslation("profile")
  const hiddenInput = useRef<HTMLInputElement>(null)

  const changeInputImage = () => {
    // truy cập dom tới phần tử input
    // console.log(hiddenInput.current)
    hiddenInput.current?.click() // khi click vào phần tử button nó trigger đến input đã ẩn và click vào (sk)
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFormLocal = event.target.files?.[0]
    if (
      fileFormLocal &&
      (fileFormLocal?.size >= config.maxSizeUploadImage || !fileFormLocal?.type.includes("image"))
    ) {
      toast.error("file vượt quá kích thước và không đúng định dạng ")
    } else {
      toast.success("file upload thành công")
    }
    onChange && onChange(fileFormLocal)
  }
  return (
    <Fragment>
      <input
        ref={hiddenInput}
        onChange={onFileChange}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
        className="hidden"
        type="file"
        accept=".jpg,.jpeg,.png"
      />
      <button
        onClick={changeInputImage}
        type="button"
        className="px-5 py-2 border border-black-20 rounded-sm shadow hover:bg-gray-100 duration-200"
      >
        {t("profile.chooseImg")}
      </button>
    </Fragment>
  )
}
