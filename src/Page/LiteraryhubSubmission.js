import React, { useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser';
import '../css/literaryhubsubmission.css'
// import { Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
// import { Form, FormGroup, } from "reactstrap";

const LiteraryhubSubmission = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_s9ws3mb', 'template_qluhzm3', form.current, {
            publicKey: 'EPw5IJ4VuRmSRdQZg',
        })
            .then(
                () => {
                    window.location.href ="https://forms.gle/dQmv3eiSszuZMdAPA";
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    }

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



                    <Form ref={form} onSubmit={sendEmail}>

                        {/* <FormGroup className="booking__form d-inline-block me-4 mb-4"name="what_content" >
                            <select     >
                                <option>Poem</option>
                                <option >Article</option>
                                <option >Short Stories</option>
                            </select>
                        </FormGroup> */}
                        {/* 
                        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                            <input type="text" name='title' placeholder="Enter title" />
                        </FormGroup> */}

                        {/* <FormGroup className="booking__form d-inline-block me-4 mb-4" name="type">
                            <select     >
                                <option  >Fiction</option>
                                <option  >Non- Fiction</option>
                            </select>
                        </FormGroup>

                        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                            <label className='sub-label'>Cover Picture</label>
                            <input type="file" name='cover_picture' placeholder="Cover Picture" />
                        </FormGroup> */}

                        {/* <FormGroup className="booking__form d-inline-block me-4 mb-4">
                            <input type="genre" placeholder="Enter genre" />
                        </FormGroup> */}

                        {/* <FormGroup className="booking__form d-inline-block  me-4 mb-4">
                        <label className='sub-label'>Manuscript</label>
                            <input type="file" name='manuscript' placeholder="Manuscript" />
                        </FormGroup> */}

                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" name='what_content'>
                                <option>Poem</option>
                                <option >Article</option>
                                <option >Short Stories</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Control type="text" name='title' placeholder="Enter Title" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" name='type'>
                            <option  >Fiction</option>
                            <option  >Non- Fiction</option>
                            </Form.Select>
                        </Form.Group>

                        

                        <Form.Group className="mb-3" >
                            <Form.Control type="text" name='user_name' placeholder="Your name" />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Control type="email" name="user_email" placeholder="your email" />
                        </Form.Group>

                        <Form.Group className="mb-3"  >
                            <Form.Control type="text" name="user_number" placeholder="Your number" />

                        </Form.Group>

                        {/* <FormGroup className="booking__form d-inline-block  ms-1 mb-4" controlId="formBasicText">
                            <input type="text" name="user_name" placeholder="Your Name" />
                        </FormGroup>
                        <FormGroup className="booking__form d-inline-block  me-4 mb-4" controlId="formBasicEmail">
                            <input type="email" name="user_email" placeholder="Your e-mail address "  />
                        </FormGroup>
                        <FormGroup className="booking__form d-inline-block  ms-1 mb-4" >
                            <input type="number" name="user_number" placeholder="Your Number" />
                        </FormGroup> */}

                        {/* <button className=" book" >Book Now</button> */}
                        
                        <Button className='literaryhubSubmission-submit-button' type='submit' value="Send" > Submit</Button>


                    </Form>
























                    {/* <Row>
                        <Col lg="6" md="6" sm="1" className='customized-col'>

                        
                            <Form >
                                <Form.Group className="mb-3">
                                    <Form.Label>What</Form.Label>
                                    <Form.Select aria-label="Default select example" name='what_content' className='form-selectsub'>
                                     
                                        <option value="1">Poem</option>
                                        <option value="2">Article</option>
                                        <option value="3">Short Stories</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Select aria-label="Default select example" name='type' className='form-selectsub'>
                               
                                        <option value="1">Fiction</option>
                                        <option value="2">Non-Fiction</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control type="text" name='genre' placeholder="Enter Genre" className='form-controlsub' />
                                    <Form.Text className="text-muted"></Form.Text>
                                </Form.Group>

                            </Form>

                        </Col>
                        <Col lg="6" md="6" sm="1" className='customized-col '>

                            <Form >

                                <Form.Group className="mb-3 " controlId="formBasicText" >
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" name='title' placeholder="Enter Title" className='form-controlsub' />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Cover Picture</Form.Label>
                                    <Form.Control type="file" name='cover_picture' className='form-controlsub' />
                                </Form.Group>

                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Manuscript</Form.Label>
                                    <Form.Control type="file" name='manuscript' className='form-controlsub' />
                                </Form.Group>
                            </Form>

                        </Col>
                    </Row> */}

                    {/* <Form className='customizecontactusform'ref={form} onSubmit={sendEmail} >

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name='user_name' placeholder="Enter your name" className='form-controlsub' />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name='user_email' placeholder="Enter your email" className='form-controlsub' />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Number</Form.Label>
                            <Form.Control type="number" name='user_number' placeholder="Enter your number" className='form-controlsub' />
                        </Form.Group>

                        <Button className='literaryhubSubmission-submit-button' type='submit' value="Send"> Submit</Button>


                    </Form> */}


                    {/* </Form> */}
                </div>
            </div>


        </div>
    )
}

export default LiteraryhubSubmission