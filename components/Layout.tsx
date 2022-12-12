import Header from "./Header"
import Footer from "./Footer"

interface Props {
  children: React.ReactNode,
}

function Layout({ children }: Props) {

  return (
    <>

      <Header />

        {children}

      <Footer />

    </>
  )
}

export default Layout
