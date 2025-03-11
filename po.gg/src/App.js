import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home.js"
import FindDuo from "./pages/find_duo.js"
import UserSearch from "./pages/user_search.js"
import Header from "./components/Header.js"
import Footer from "./components/Footer.js"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find_duo" element={<FindDuo />} />
        <Route path="/user_search" element={<UserSearch />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
