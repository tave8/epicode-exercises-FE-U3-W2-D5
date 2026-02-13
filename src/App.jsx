import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"

// base components
import MyNav from "./components/MyNav"
import MyFooter from "./components/MyFooter"
// import NotFound from "./components/NotFound"

// pages components
import Home from "./components/home/Home"

function App() {
  return (
    <BrowserRouter>
      <header>
        <MyNav />
      </header>
      <main style={{  }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/city-details" element={<CityDetails />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      <footer>
        <MyFooter />
      </footer>
    </BrowserRouter>
  )
}

export default App
