import React, { Component, Fragment } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import bolt from './../img/lightning-svgrepo-com.svg'

// import cors from 'cors';
// import axios from 'axios';
import jsonData from './../result.json'
import { Form, Button } from 'react-bootstrap';
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";

class ToPay extends Component {
    state = {
        totalPayCheck: 0
      }

    componentDidMount() {
        // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

        // axios.get('https://app.soan-solutions.io/test_front/datas', {
        //   headers: {

        //   },
        //   }).then(function (response) {
        //     console.log('response is : ' + response.data);
        //   }).catch(function (error) {
        //     if (error.response) {
        //       console.log(error.response.headers);
        //     } 
        //     else if (error.request) {
        //         console.log(error.request);
        //     } 
        //     else {
        //       console.log(error.message);
        //     }
        //   console.log(error.config);
        // });
    }

    render() {
        let totalPayCheck = 0

        const updateCheckedValues = (e,amount) => {
            const checked = e.target.checked;
            if (checked) {
                totalPayCheck = totalPayCheck + amount
                document.getElementById("PayCheck").innerHTML = "Payer "+totalPayCheck+" €"
            } else {
                totalPayCheck = totalPayCheck - amount
                document.getElementById("PayCheck").innerHTML = "Payer "+totalPayCheck+" €"
            }
          };

        console.log("test: ",jsonData.payments)
        let allPaidList = []
        jsonData.payments.forEach(e => {
            if(e.payedDate === null){
                allPaidList.push(e);
            }
        })
        let totalToPay = 0;
        console.log("here to pay : ", allPaidList)

        return (
            <Fragment>
            
            {allPaidList && allPaidList.map((payment,i) => {

                    let dueDate = new Date(payment.sentDate);
                    let dueDateString = "";
                    let fullCases = false;
                    let discountToReduce = ""
                    let discountedPrice = ""

                    dueDate.setDate(dueDate.getDate() + payment.maxDaysToPay);
                    dueDateString = dueDate.getDay().toString() + "/" + dueDate.getMonth().toString() + "/" + dueDate.getFullYear().toString();

                    if(payment.multiPaymentStatus === "AVAILABLE" && payment.discount != null) fullCases = true;

                    if(payment.discount != null){
                        discountToReduce = (payment.amount /100) * (payment.discount.rate / 100)
                        discountedPrice = (payment.amount/100) - discountToReduce
                    }

                    return(
                        <Container key={i} className="boxContainer" controlId={payment.invoiceNumber}>
                            <Form.Group className="formAdjust" controlId={payment.invoiceNumber}>
                            <Row className="boxRow">
                                <Col xs={1}>
                                {payment.discount == null && 
                                    <Form.Check onClick={(e) => {updateCheckedValues(e,payment.amount /100)}} type="checkbox"/>
                                }
                                {payment.discount != null &&
                                    <Form.Check onClick={(e) => {updateCheckedValues(e,discountedPrice)}} type="checkbox"/>
                                }
                                </Col>
                                <Col>
                                    <FormCheckLabel className="regularText" label={payment.invoiceNumber}>{payment.invoiceNumber}</FormCheckLabel><br/>
                                    <span className="subtitleText">A régler avant le {dueDateString}</span>
                                </Col>
                                
                                <Col>
                                {fullCases &&
                                <>
                                    <img className="boltSVG" src={bolt}/> <span className="regularText">3x et Escompte</span><br/>
                                </>                                
                                }
                                {payment.multiPaymentStatus === "AVAILABLE" && !fullCases &&
                                <>
                                    <img className="boltSVG" src={bolt}/> <span className="regularText">3x sans frais</span><br/>                                    
                                </>
                                }
                                {payment.multiPaymentStatus === "NONE" && payment.discount != null && !fullCases &&
                                <>
                                    <img className="boltSVG" src={bolt}/> <span className="regularText">Escompte</span><br/>
                                </> 
                                }
                                {payment.discount != null &&
                                    <span className="subtitleText_green">-{payment.discount.rate}% pendant {payment.discount.maxDaysToPay} jours.</span>
                                }
                                </Col>
                                <Col>
                                {payment.discount == null && 
                                <p className="regularText"> { parseFloat(payment.amount) / 100 } €</p>
                                } 
                                {payment.discount != null && 
                                <>
                                    <p className="regularText"> { discountedPrice } €</p>
                                    <span className="dashedPrice"> {parseFloat(payment.amount) / 100 } € </span>
                                </>
                                } 
                                </Col>
                            </Row>
                            </Form.Group>
                        </Container>
                    )
                })}
                <Container className="validationBox">
                    <Row>
                        <Col>
                            <Button className="buttonStyle" id="PayCheck" href="#">Payer {totalPayCheck} €</Button>
                        </Col>
                    </Row>
                </Container>
            </Fragment>

        );
    }

}


export default ToPay;