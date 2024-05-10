import Footer from "src/Components/Footer"
import RegisterHeader from "src/Components/RegisterHeader"

interface Props {
  children: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}

// vì RegisterHeader và Footer là 2 components chung của layout nên bỏ vào đây tiện lợi
