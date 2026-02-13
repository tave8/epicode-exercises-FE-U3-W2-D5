import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { Container, Row, Col, CardGroup, Card, Spinner, Alert, Button } from "react-bootstrap"


/**
 * props: {
 *      city: obj. the selected city from the parent
 * }
 */
const CityDetails = props => {


    return (
        <>
            <p>City details</p>
            {props.city}
        </>
    )
}

export default CityDetails