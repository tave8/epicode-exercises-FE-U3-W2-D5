import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// base components
import MyNav from "./components/MyNav"
import MyFooter from "./components/MyFooter"
import NotFound from "./components/NotFound"

// pages components
import Home from "./components/home/Home"
import CityDetails from "./components/city-details/CityDetails"

// REACT COMPONENT
function App() {
  const [selectedCity, setSelectedCity] = useState(null)

  return (
    <BrowserRouter>
      <header>
        <MyNav />
      </header>
      <main>
        <Routes>
          {/* home changes selected city */}
          <Route path="/" element={<Home setSelectedCity={setSelectedCityHelper({ setSelectedCity })} />} />
          {/* city details displays selected city */}
          <Route path="/city-details" element={<CityDetails city={selectedCity} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer>
        <MyFooter />
      </footer>
    </BrowserRouter>
  )
}

// HELPERS

const setSelectedCityHelper = (componentInfo) => {
  const { setSelectedCity } = componentInfo
  // this inner function will be used by children components
  // to change the parent's state
  return (newCity) => {
    setSelectedCity(newCity)
  }
}

export default App
