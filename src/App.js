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
      <Container className="menuCol">

        <Row className="menuRow">
              <Col xs={6} md={3}>
                  <Link className='menuLink' to="/topay">Factures à payer</Link>
              </Col>
              <Col xs={6} md={3}>
                  <Link className='menuLink' to="/paid">Factures payées</Link>
              </Col>
        </Row>
        </Container>

        <Routes>
            <Route path="/" exact element={<ToPay />} />
            <Route path="/paid" element={<Paid />} />
            <Route path="/topay" element={<ToPay />} />
        </Routes>
    </main>
    </Router>
  )
}