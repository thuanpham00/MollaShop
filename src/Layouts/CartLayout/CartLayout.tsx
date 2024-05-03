import CartHeader from "src/Components/CartHeader";
import Footer from "src/Components/Footer";

interface Props {
  children: React.ReactNode
}

export default function CartLayout({children}: Props) {
  return (
    <div>
      <CartHeader />
      {children}
      <Footer />
    </div>
  )
}
