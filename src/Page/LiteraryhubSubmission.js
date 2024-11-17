import React, { useEffect } from 'react'
import '../css/literaryhubsubmission.css'
import { Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
const LiteraryhubSubmission = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className='LiteraryhubSubmission'>

            <div className='literaryhub-bgimg'>
                <div className='literaryhub-blackdrop'>

                    <div className='literaryhub-title'>Submission</div>
                </div>
            </div>


            <div className='literaryhubSubmission-content-bg'>
                <div className='literaryhubSubmission-content'>

                    <div className='literaryhubSubmission-subcontent-description'>Have your own designer or editor? No problem! You can tailor your package by choosing the services you need. Once you submit your requirements, our consultant will reach out to discuss them with you. We’ll then provide a customized package fee, based on your selections.</div>

                    <Row>
                        <Col lg="6" md="6" sm="1" className='customized-col'>

                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>What ?</Form.Label>
                                    <Form.Select aria-label="Default select example" className='form-selectsub'>
                                        {/* <option>Open this select menu</option> */}
                                        <option value="1">Poem</option>
                                        <option value="2">Article</option>
                                        <option value="3">Short Stories</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Type ?</Form.Label>
                                    <Form.Select aria-label="Default select example" className='form-selectsub'>
                                        {/* <option>Open this select menu</option> */}
                                        <option value="1">Fiction</option>
                                        <option value="2">Non-Fiction</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Genre ?</Form.Label>
                                    <Form.Select aria-label="Default select example" className='form-selectsub'>
                                        {/* <option>Open this select menu</option> */}
                                        <option value="1">Poem</option>
                                        <option value="2">Article</option>
                                        <option value="3">Short Stories</option>
                                    </Form.Select>
                                </Form.Group>

                            </Form>

                        </Col>
                        <Col lg="6" md="6" sm="1" className='customized-col '>

                            <Form>

                                <Form.Group className="mb-3 " controlId="formBasicText" >
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Title" className='form-controlsub' />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Cover Picture</Form.Label>
                                    <Form.Control type="file" className='form-controlsub' />
                                </Form.Group>

                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Manuscript</Form.Label>
                                    <Form.Control type="file" className='form-controlsub' />
                                </Form.Group>
                            </Form>

                        </Col>
                    </Row>

                    <Form className='customizecontactusform'   >

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" className='form-controlsub' />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" className='form-controlsub' />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Number</Form.Label>
                            <Form.Control type="number" placeholder="Enter your number" className='form-controlsub' />
                        </Form.Group>

                    </Form>

                    <button className='literaryhubSubmission-submit-button'> Submit</button>


                </div>
            </div>


        </div>
    )
}

export default LiteraryhubSubmission