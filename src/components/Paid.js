import React, { Component, Fragment } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import bolt from './../img/lightning-svgrepo-com.svg'

// import cors from 'cors';
// import axios from 'axios';
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
        console.log("test: ",jsonData.payments)
        let allPaidList = []
        jsonData.payments.forEach(e => {
            if(e.payedDate != null){
                allPaidList.push(e);
            }
        })

        console.log("here paid : ", allPaidList)
        
        return (
            <Fragment>

            {allPaidList && allPaidList.map((payment,i) => {

                let fullCases = false;
                let discountToReduce = ""
                let discountedPrice = ""

                let formatDateArray = payment.payedDate.split('-')
                let formatedDate = formatDateArray[2]+"/"+formatDateArray[1]+"/"+formatDateArray[0];

                console.log(formatedDate);

                if(payment.multiPaymentStatus === "USED" && payment.discount != null) fullCases = true;

                if(payment.discount != null){
                    discountToReduce = (payment.amount /100) * (payment.discount.rate / 100)
                    discountedPrice = (payment.amount/100) - discountToReduce
                }

                    return(
                        <Container key={i} className="boxContainer">
                            <Row className="boxRow">
                                <Col>
                                <span className="regularText">{payment.invoiceNumber}</span><br/>
                                <span className="subtitleText">Réglée le {formatedDate}</span>
                                </Col>
                                <Col>
                                {fullCases &&
                                <>
                                    <img className="boltSVG" src={bolt}/> <span className="regularText">3x et Escompte</span><br/>
                                </>

                                }
                                {payment.multiPaymentStatus === "USED" && !fullCases &&
                                <>
                                    <img className="boltSVG" src={bolt}/>  <span className="regularText">3x sans frais</span><br/>
                                </>
                                }
                                {payment.multiPaymentStatus === "NONE" && payment.discount != null && !fullCases &&
                                <>
                                    <img className="boltSVG" src={bolt}/> <span className="regularText">Escompte</span><br/>                                    
                                </>
                                }
                                {payment.multiPaymentStatus === "USED" &&
                                    <span className="subtitleText_green">Appliqué</span>
                                }
                                </Col>
                                <Col>
                                {payment.discount == null && 
                                <span className="regularText"> { parseFloat(payment.amount) / 100 } €</span>
                                } 
                                {payment.discount != null && 
                                <>
                                    <span className="regularText"> { discountedPrice } €</span><br/>
                                    <span className="dashedPrice"> {parseFloat(payment.amount) / 100 } € </span>
                                </>
                                } 
                                </Col>
                            </Row>
                        </Container>
                    )
                })}



            </Fragment>

        );
    }

}


export default Paid;