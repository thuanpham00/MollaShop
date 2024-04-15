import Footer from "src/Components/Footer"
import Header from "src/Components/Header"

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
