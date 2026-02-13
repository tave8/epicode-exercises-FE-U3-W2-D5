import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { Container, Row, Col, CardGroup, Card, Spinner, Alert, Button, Form, ListGroup } from "react-bootstrap"
import { Helmet } from "react-helmet"

import OpenWeatherMap from "../../assets/js/OpenWeatherMap"

/**
 * props: {
 *     setSelectedCity: callable. changes the selected city in the parent
 * }
 */
const Home = (props) => {
  const [formValues, setFormValues] = useState({
    search: "",
  })
  const [citiesList, setCitiesList] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    // the main centers this component or not
    props.setCenterInPage(true)
  })

  return (
    <>
      <Helmet>
        <title>
          Search weather | Tempify
        </title>
      </Helmet>

      <Container fluid style={{ marginTop: "-5rem" }}>
        <Row className="flex-column justify-content-center align-items-center gap-3">
          <Col className="text-center">
            <h2>Get weather</h2>
          </Col>
          <Col md={6} lg={4} className="text-center position-relative">
            <Form
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              {/* search */}
              <Form.Control
                type="search"
                placeholder="Search city..."
                autoFocus
                aria-label="Search"
                onChange={(event) => {
                  const userSearch = event.target.value
                  handleSearchChange({ setFormValues, setCitiesList })(userSearch)
                }}
              />
            </Form>

            {/* cities list */}
            {citiesList.length > 0 && (
              <ListGroup className="mt-2">
                {citiesList.map((city, idx) => (
                  <ListGroup.Item
                    key={idx}
                    action
                    onClick={() => {
                      console.log(city)
                      // set the selected city
                      props.setSelectedCity({
                        lat: city.lat,
                        lon: city.lon,
                        name: city.name,
                        state: city.state,
                        country: city.country,
                      })
                      navigate("/city-details")
                      // console.log(props)
                    }}
                  >
                    <span className="text-left">
                      {city.name}, {city.state}, {city.country}
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}

            {/* <Link to="/city-details">Go to city details</Link> */}
          </Col>
        </Row>
      </Container>
    </>
  )
}

const handleSearchChange = (componentInfo) => {
  const { setFormValues, setCitiesList } = componentInfo
  return async (userSearch) => {
    setFormValues({ search: userSearch })
    const weatherApi = new OpenWeatherMap({ prettify: true })
    const citiesList = await weatherApi.getCitySuggestions({ searchQuery: userSearch })
    setCitiesList(citiesList)
  }
}

export default Home
