import { Container, Row, Col, Nav, Navbar, NavDropdown, Image, Dropdown, Alert, Button } from "react-bootstrap"
import { Link } from "react-router-dom"


const TVShows = props => {
    return (
        <Container>
            <Row>
                <Col>
                    <Alert>
                        <p>This page does not exist.</p>
                        <Link to="/" className="btn btn-info">Home</Link>
                    </Alert>
                </Col>
            </Row>
        </Container>
    )
}

export default TVShows