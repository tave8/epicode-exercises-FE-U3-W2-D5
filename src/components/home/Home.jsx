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
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [isErrorCities, setIsErrorCities] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    // the main centers this component or not
    props.setCenterInPage(true)
  })

  return (
    <>
      <Helmet>
        <title>Search weather | Tempify</title>
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
                value={formValues.search}
                onChange={(event) => {
                  const userSearch = event.target.value
                  handleSearchChange({ setFormValues, setCitiesList, setIsLoadingCities, setIsErrorCities })(userSearch)
                }}
              />
            </Form>

            {/* cities list (at least 1 city) */}
            {citiesList.length > 0 && !isLoadingCities && (
              <ListGroup className="mt-2 position-absolute">
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

            {/* cities list (no city found) */}
            {citiesList.length == 0 && formValues.search.length > 0 && !isLoadingCities && (
              <Alert variant="info" className="mt-2 position-absolute">
                <Alert.Heading>No city found</Alert.Heading>
              </Alert>
            )}

            {/* loading cities */}
            {isLoadingCities && (
              <div className="text-center mt-3 position-absolute">
                <Spinner animation="grow" variant="info" />
              </div>
            )}

            {/* error in cities */}
            {isErrorCities && (
              <Alert variant="danger" className="mt-2 position-absolute">
                <Alert.Heading>Problem while fetching cities.</Alert.Heading>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

const handleSearchChange = (componentInfo) => {
  const { setFormValues, setCitiesList, setIsLoadingCities, setIsErrorCities } = componentInfo
  return async (userSearch) => {
    if (userSearch.length == 0) {
      // empty cities
      setCitiesList([])
      setFormValues({search: ""})
      return 
    }

    setFormValues({ search: userSearch })
    try {
      setIsLoadingCities(true)
      setIsErrorCities(false)
      const weatherApi = new OpenWeatherMap({ prettify: true })
      const citiesList = await weatherApi.getCitySuggestions({ searchQuery: userSearch })
      setIsLoadingCities(false)
      setIsErrorCities(false)
      setCitiesList(citiesList)
    } catch (err) {
      setIsLoadingCities(false)
      setIsErrorCities(true)
      console.error(err)
    }
  }
}

export default Home
