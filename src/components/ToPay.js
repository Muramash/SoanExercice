import React, { Component, Fragment } from "react";
import { Container, Row, Col, Modal, CloseButton } from 'react-bootstrap';
import bolt from './../img/lightning-svgrepo-com.svg'
import lock from "./../img/lock_black_24dp.svg"

// import cors from 'cors';
// import axios from 'axios';
import jsonData from './../result.json'
import { Form, Button } from 'react-bootstrap';
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import Select from 'react-select';

class ToPay extends Component {
    constructor() {
        super();
        this.state = {
            countries: [
                { label: "France", value: 1 },
                { label: "Allemagne", value: 2 },
                { label: "Italie", value: 3 },
            ],
            allPaidList: [],
            totalPayCheck: 0,
            show: false,
            selectedCountry: "France"
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);

    }


    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    updateCheckedValues = async (e, amount) => {
        const checked = e.target.checked;
        if (checked) {
            await this.setState({ totalPayCheck: this.state.totalPayCheck + amount })
        } else {
            await this.setState({ totalPayCheck: this.state.totalPayCheck - amount })
        }
    };


    componentDidMount = async () => {
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

        let tempPayment = [];
        for (let payment of jsonData.payments) {
            tempPayment.push(payment)
        }
        await this.setState({ allPaidList: tempPayment });

    }

    render() {

        return (
            <Fragment>

                {this.state.allPaidList && this.state.allPaidList.map((payment, i) => {

                    if (payment.payedDate) return null;

                    let dueDate = new Date(payment.sentDate);
                    let dueDateString = "";
                    let fullCases = false;
                    let discountToReduce = ""
                    let discountedPrice = ""

                    dueDate.setDate(dueDate.getDate() + payment.maxDaysToPay);
                    dueDateString = dueDate.getDay().toString() + "/" + dueDate.getMonth().toString() + "/" + dueDate.getFullYear().toString();

                    if (payment.multiPaymentStatus === "AVAILABLE" && payment.discount != null) fullCases = true;

                    if (payment.discount != null) {
                        discountToReduce = (payment.amount / 100) * (payment.discount.rate / 100)
                        discountedPrice = (payment.amount / 100) - discountToReduce
                    }

                    return (
                        <Container key={i} className="boxContainer">
                            <Form.Group className="formAdjust" controlId={payment.invoiceNumber}>
                                <Row className="boxRow">
                                    <Col xs={1}>
                                        {payment.discount == null &&
                                            <Form.Check onClick={(e) => { this.updateCheckedValues(e, payment.amount / 100) }} type="checkbox" />
                                        }
                                        {payment.discount != null &&
                                            <Form.Check onClick={(e) => { this.updateCheckedValues(e, discountedPrice) }} type="checkbox" />
                                        }
                                    </Col>
                                    <Col>
                                        <FormCheckLabel className="regularText" label={payment.invoiceNumber}>{payment.invoiceNumber}</FormCheckLabel><br />
                                        <span className="subtitleText">A régler avant le {dueDateString}</span>
                                    </Col>

                                    <Col>
                                        {fullCases &&
                                            <>
                                                <img className="boltSVG" alt="" src={bolt} /> <span className="regularText">3x et Escompte</span><br />
                                            </>
                                        }
                                        {payment.multiPaymentStatus === "AVAILABLE" && !fullCases &&
                                            <>
                                                <img className="boltSVG" alt="" src={bolt} /> <span className="regularText">3x sans frais</span><br />
                                            </>
                                        }
                                        {payment.multiPaymentStatus === "NONE" && payment.discount != null && !fullCases &&
                                            <>
                                                <img className="boltSVG" alt="" src={bolt} /> <span className="regularText">Escompte</span><br />
                                            </>
                                        }
                                        {payment.discount != null &&
                                            <span className="subtitleText_green">-{payment.discount.rate}% pendant {payment.discount.maxDaysToPay} jours.</span>
                                        }
                                    </Col>
                                    <Col>
                                        {payment.discount == null &&
                                            <p className="regularText"> {parseFloat(payment.amount) / 100} €</p>
                                        }
                                        {payment.discount != null &&
                                            <>
                                                <p className="regularText"> {discountedPrice} €</p>
                                                <span className="dashedPrice"> {parseFloat(payment.amount) / 100} € </span>
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
                            <Button className="buttonStyle" id="PayCheck" onClick={this.showModal}>Payer {this.state.totalPayCheck} €</Button>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col className="subtitleBlock">
                            <img className="lockSVG" alt="" src={lock} /><span className="subtitleBottom">Paiement en ligne 100 % sécurisé</span>
                        </Col>
                    </Row>
                </Container>

                <Modal
                    show={this.state.show}
                    handleClose={this.hideModal}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header >
                        <Modal.Title id="contained-modal-title-vcenter" class="modalTitle">
                            Paiment sécurisé par prélèvement bancaire
                        </Modal.Title>
                        <CloseButton onClick={this.hideModal}/>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col className="modalBox">
                                    <p className="mandatText">Mise en place d’un mandat SEPA MANGOPAY</p>
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Col>
                                    <Form.Label className="subtitleForm">Titulaire du compte <span className="redText">*</span></Form.Label>
                                    <Form.Control id="name" className="inputForm" type="text" placeholder="Titulaire du compte" />
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Col>
                                    <Form.Label className="subtitleForm">Adresse du titulaire <span className="redText">*</span></Form.Label>
                                    <Form.Control className="inputForm" type="text" placeholder="Adresse du titulaire" />
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Col>
                                    <Form.Label className="subtitleForm">Ville <span className="redText">*</span></Form.Label>
                                    <Form.Control id="city" className="inputForm" type="text" placeholder="Ville" />
                                </Col>
                                <Col>
                                    <Form.Label className="subtitleForm">Région <span className="redText">*</span></Form.Label>
                                    <Form.Control id="county" className="inputForm" type="text" placeholder="Région" />
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Col>
                                    <Form.Label className="subtitleForm">Code postal <span className="redText">*</span></Form.Label>
                                    <Form.Control id="cp" className="inputForm" type="text" placeholder="Code postal" />
                                </Col>
                                <Col>
                                    <Form.Label className="subtitleForm">Pays <span className="redText">*</span></Form.Label>
                                    <Select className="dropdownForm" options={this.state.countries} />
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Col>
                                    <Form.Label className="subtitleForm">IBAN <span className="redText">*</span></Form.Label>
                                    <Form.Control id="iban" className="inputForm" type="text" placeholder="____ ____ ____ ____ ____ ____ ___" />
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <a className="backButton" onClick={this.hideModal}>Annuler</a>
                        <Button className="buttonStyle" onClick={this.hideModal}>Payer {this.state.totalPayCheck} €</Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>

        );
    }

}


export default ToPay;