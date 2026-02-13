import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { Container, Row, Col, CardGroup, Card, Spinner, Alert, Button } from "react-bootstrap"

import OpenWeatherMap from "../../assets/js/OpenWeatherMap"

/** REACT COMPONENT
 * props: {
 *      city: obj. the selected city from the parent
 * }
 */
const CityDetails = (props) => {
  const [weather, setWeather] = useState()
  const [degrees, setDegrees] = useState()
  const [forecast, setForecast] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    // the main centers this component or not
    props.setCenterInPage(false)
  })

  // when the city is changed, run hook
  useEffect(() => {
    // if there's no city (example: at mounting), do not run
    if (!isCityValid(props.city)) {
      return
    }
    // there's a valid city, so run
    const componentInfo = { city: props.city, setWeather, setDegrees, setForecast, setIsLoading, setIsError }
    getAllRemoteWeather(componentInfo)()
  }, [props.city])

  return (
    <>
      {/* valid city chosen */}
      {isCityValid(props.city) && (
        <Container fluid>
          <Row>
            <Col>
              <h2 className="text-center">Weather in {props.city}</h2>
            </Col>
          </Row>
          <Row className="justify-content-center g-3">
            <Col xs={12} md={6} lg={4} className="text-center border">
              A
            </Col>
            <Col xs={12} md={6} lg={4} className="text-center border">
              B
            </Col>
            <Col xs={12} md={6} lg={4} className="text-center border">
              C
            </Col>
          </Row>
        </Container>
      )}

      {/* city not chosen yet */}
      {!isCityValid(props.city) && (
        <Alert variant="info">
          <Alert.Heading>You cannot access this page without choosing a city.</Alert.Heading>
        </Alert>
      )}

      {/* loading */}
      {isCityValid(props.city) && isLoading && (
        <div className="text-center mt-3">
          <Spinner animation="grow" variant="danger" />
        </div>
      )}

      {/* error */}
      {isCityValid(props.city) && isError && (
        <Alert variant="danger">
          <Alert.Heading>Problem while fetching weather info.</Alert.Heading>
        </Alert>
      )}
    </>
  )
}

// HELPERS

// ***** GET ALL REMOTE WEATHER INFO (WEATHER, DEGREES, FORECAST, etc.)
const getAllRemoteWeather = (componentInfo) => {
  const { city, setIsLoading, setIsError, setWeather, setDegrees, setForecast } = componentInfo

  return () => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true)
    setIsError(false)

    const promises = [
      getRemoteWeather(city),
      // getRemoteWeather(city),
      // getRemoteWeather(city),
    ]

    Promise.all(promises)
      .then((remoteResults) => {
        const [remoteWeather, remoteDegrees, remoteForecast] = remoteResults
        // const [remoteMovie, remoteMovieComments] = remoteResults
        // setMovie(remoteMovie)
        // console.log(remoteMovieComments)
        setWeather(remoteWeather)
        // setWeather(remoteWeather)
        // setWeather(remoteWeather)

        setIsLoading(false)
        setIsError(false)
        console.log(remoteResults)
        console.log("done loading all weather info")
      })
      .catch((err) => {
        setIsLoading(false)
        setIsError(true)
        console.error("error while loading weather info")
      })
  }
}

// REMOTE FETCHES

const getRemoteWeather = async (city) => {
  // make API call
  const weatherApi = new OpenWeatherMap()
  const data = await weatherApi.getWeather({
    cityName: city,
    countryCode: "IT",
  })
  return data
}

// VALIDATORS

const isCityValid = (city) => {
  return city !== null
}

export default CityDetails
