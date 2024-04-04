import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"

const App = () => {
  return (
    <>
        <div>
          <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default App