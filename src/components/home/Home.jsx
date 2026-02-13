import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { Container, Row, Col, CardGroup, Card, Spinner, Alert, Button } from "react-bootstrap"

/**
 * props: {
 *     setSelectedCity: callable. changes the selected city in the parent
 * }
 */
const Home = props => {
    return (
        <>
            <p>Home</p>
            <Button onClick={() => {
                props.setSelectedCity("Rome")
            }}>Click</Button>

            <Link to="/city-details">Go to city details</Link>
        </>
    )
}

export default Home