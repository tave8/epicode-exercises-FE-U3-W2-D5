import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { Container, Row, Col, CardGroup, Card, Spinner, Alert, Button } from "react-bootstrap"
import { Helmet } from "react-helmet"

import OpenWeatherMap from "../../assets/js/OpenWeatherMap"

/** REACT COMPONENT
 * props: {
 *      city: obj. the selected city from the parent
 * }
 */
const CityDetails = (props) => {
  const [weather, setWeather] = useState()
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
    const componentInfo = { city: props.city, setWeather, setForecast, setIsLoading, setIsError }
    getAllRemoteWeather(componentInfo)()
  }, [props.city])

  return (
    <>
      {/* valid city chosen */}
      {isCityValid(props.city) && !isLoading && !isError && (
        <>
          <Helmet>
            <title>
              Weather in {props.city.name}, {props.city.state}, {props.city.country} | Tempify
            </title>
          </Helmet>
          <Container fluid className="mt-3">
            <Row>
              <Col>
                <h2 className="text-center">
                  Weather in {props.city.name}, {props.city.state}, {props.city.country}
                </h2>
              </Col>
            </Row>
            <Row className="justify-content-center g-3">
              <Col xs={12} className="border">
                <Row className="flex-column">
                  <Col>{/* <h3>Weather</h3> */}</Col>
                  <Col>
                    <p>
                      {weather.weather.main}, {weather.weather.description}
                    </p>
                    <p>Temperature: {weather.temperaturesCelsius.temp} °C</p>
                    <p>
                      Min/max Temperature: {weather.temperaturesCelsius.temp_min} / {weather.temperaturesCelsius.temp_max} °C
                    </p>
                  </Col>
                </Row>
              </Col>

              <Col xs={12} className="border">
                <Row className="flex-column">
                  <Col>
                    <h3>
                      Forecast <span className="fs-5">{forecast.info.rangeDatetimeForUI}</span>
                    </h3>
                  </Col>
                  <Col>
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Date/Time</th>
                          <th>Weather</th>
                          <th>Temperature</th>
                          <th>Min/max Temp.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {forecast.list.map((forecastInfo, i) => {
                          return (
                            <tr key={i}>
                              <td>{forecastInfo.datetime.forUI}</td>
                              <td>
                                {forecastInfo.weather.main}, {forecastInfo.weather.description}
                              </td>
                              <td>{forecastInfo.temperaturesCelsius.temp} °C</td>
                              <td>
                                {forecastInfo.temperaturesCelsius.temp_min} / {forecastInfo.temperaturesCelsius.temp_max} °C
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </>
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
          <Spinner animation="grow" variant="info" />
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
  const { city, setWeather, setForecast, setIsLoading, setIsError } = componentInfo

  return () => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true)
    setIsError(false)

    const promises = [getRemoteWeather(city, { prettify: true }), getRemoteForecast(city, { prettify: true })]

    Promise.all(promises)
      .then((remoteResults) => {
        const [remoteWeather, remoteForecast] = remoteResults
        setWeather(remoteWeather)
        setForecast(remoteForecast)
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

const getRemoteWeather = async (city, { prettify = false }) => {
  // make API call
  const weatherApi = new OpenWeatherMap({ prettify })
  const data = await weatherApi.getWeather(city)
  return data
}

const getRemoteForecast = async (city, { prettify = false }) => {
  // make API call
  const weatherApi = new OpenWeatherMap({ prettify })
  const data = await weatherApi.getForecast(city)
  return data
}

// VALIDATORS

const isCityValid = (city) => {
  return city !== null
}

export default CityDetails
