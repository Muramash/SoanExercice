import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';

import axios from 'axios';

class ToPay extends Component {
    state = {
        result: []
      }

    componentDidMount() {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

        axios.get('https://app.soan-solutions.io/test_front/datas', {
          headers: {

          },
          }).then(function (response) {
            console.log('response is : ' + response.data);
          }).catch(function (error) {
            if (error.response) {
              console.log(error.response.headers);
            } 
            else if (error.request) {
                console.log(error.request);
            } 
            else {
              console.log(error.message);
            }
          console.log(error.config);
        });
    }

  render() {
    return (
    <Container className="boxCol">

        <Row className="boxRow">
            <Col xs={6} md={3}>
                <a>aaaaaaaaaaaa</a>
            </Col>
            <Col xs={6} md={3}>
                <a>aaaaaaaaaaaa</a>
            </Col>
        </Row>

    </Container>
    );
  }

}


export default ToPay;