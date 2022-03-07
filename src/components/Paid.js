import React, { Component, Fragment } from "react";
import { Container, Row, Col } from 'react-bootstrap';

import cors from 'cors';
import axios from 'axios';
import jsonData from './../result.json'

export const Payment = () => {
    return (
        <>
            <div className="empty">
                 {jsonData.map((payment, key) =>{
                     return (
                         <p>{payment.invoiceNumber + ", " + payment.payedDate}</p>
                     )
                 })}
            </div>
        </>
    )
}
class Paid extends Component {
    state = {
            paidPayments: {
                amount: null,
                discount: {
                    rate: null,
                    maxDaysToPay: null,
                },
                invoiceNumber: null,
                maxDaysToPay: null,
                multiPaymentStatus: null,
                payedDate: null,
                sentDate: null,
            },
        }
      
      
    componentDidMount() {
        let tempArray = [];
        //   axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

        //   axios.get('https://app.soan-solutions.io/test_front/datas', {
        //     headers: {

        //     },
        //     }).then(function (response) {
        //       console.log('response is : ' + response.data);
        //     }).catch(function (error) {
        //       if (error.response) {
        //         console.log(error.response.headers);
        //       } 
        //       else if (error.request) {
        //           console.log(error.request);
        //       } 
        //       else {
        //         console.log(error.message);
        //       }
        //     console.log(error.config);
        //   });


      }

    render() {
        let allPaidList = []
        jsonData.payments.forEach(e => {
            if(e.payedDate != null){
                allPaidList.push(e);
            }
        })

        console.log("here lfdsqf : ", allPaidList)
        
        return (
            <Container className="boxCol">
                <Row className="boxRow">
                {allPaidList && allPaidList.map((payment,i) => {
                    return(
                        <Fragment>
                            <Col key={i}>
                            {payment.invoiceNumber}
                            {payment.payedDate}
                            </Col>
                        </Fragment>
                    )
                })}



                </Row>

            </Container>
        );
    }

}


export default Paid;