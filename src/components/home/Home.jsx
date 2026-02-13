import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { Container, Row, Col, CardGroup, Card, Spinner, Alert, Button, Form } from "react-bootstrap"

/**
 * props: {
 *     setSelectedCity: callable. changes the selected city in the parent
 * }
 */
const Home = (props) => {
  const [formValues, setFormValues] = useState({
    search: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    // the main centers this component or not
    props.setCenterInPage(true)
  })

  return (
    <Container fluid style={{ marginTop: "-5rem" }}>
      <Row className="flex-column justify-content-center align-items-center gap-3">
        <Col className="text-center">
          <h2>Get weather</h2>
        </Col>
        <Col md={6} lg={4} className="text-center">
          <Form
            onSubmit={(event) => {
              event.preventDefault()
              const cityName = formValues.search
              props.setSelectedCity(cityName)
              navigate("/city-details")
            }}
          >
            {/* search */}
            <Form.Control
              type="search"
              placeholder="Search"
              autoFocus
              aria-label="Search"
              onChange={(event) => {
                const userSearch = event.target.value
                setFormValues({ search: userSearch })
              }}
            />
          </Form>

          {/* <Link to="/city-details">Go to city details</Link> */}
        </Col>
      </Row>
    </Container>
  )
}

export default Home
