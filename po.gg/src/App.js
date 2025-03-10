import {
  BrowserRouter as router,
  Route,
  Routes,
  Router,
} from "react-router-dom"
import Home from "./pages/Home.js"
import Find_duo from "./pages/Find_duo.js"
import User_search from "./pages/User_search.js"
import Header from "./components/Header.js"
import Footer from "./components/Footer.js"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Find_duo" element={<Find_duo />} />
        <Route path="/User_search" element={<User_search />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
