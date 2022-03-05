import logo from './logo.svg';
import './App.css';
import React, { Fragment } from "react"
import Paid from "./components/Paid.js"
import ToPay from "./components/ToPay.js"

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
    <main>
      <Container>
        <Row>
              <Col>
                  <Link to="/">Home</Link>
              </Col>
              <Col>
                  <Link to="/paid">Paid</Link>
              </Col>
              <Col>
                  <Link to="/topay">To Pay</Link>
              </Col>
        </Row>
      </Container>

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/paid" element={<Paid />} />
        <Route path="/topay" element={<ToPay />} />
      </Routes>
    </main>
    </Router>
  )
}
// Home Page
const Home = () => (
  <Fragment>
    <h1>Home</h1>
    <FakeText />
  </Fragment>
)
// About Page
const About = () => (
  <Fragment>
    <h1>About</h1>
    <FakeText />
  </Fragment>
)
// Contact Page
const Contact = () => (
  <Fragment>
    <h1>Contact</h1>
    <FakeText />
  </Fragment>
)

const FakeText = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
)