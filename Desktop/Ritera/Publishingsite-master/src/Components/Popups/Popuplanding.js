import React, { useRef } from 'react'
import { useState } from 'react';
import emailjs from '@emailjs/browser';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Popuplanding.css'

export const Popuplanding = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const form = useRef();

    const sendEmail = (e) => {
        // e.preventDefault();

        emailjs.sendForm('service_ivsbffk', 'template_symmsej', form.current, {
            publicKey: 'EPw5IJ4VuRmSRdQZg',
        })
            .then(
                () => {



                    handleClose()

                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <>
            <Button className='package-button' onClick={handleShow}>
                Get Started
            </Button>

            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton className='contactheader-bg'>
                    <Modal.Title>Thanks for Choosing Ritera</Modal.Title>
                </Modal.Header>

                <Modal.Body className='contactbody-bg'>
                    <Form ref={form} onSubmit={sendEmail}>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name='user_name'
                                placeholder="Enter your name"
                                autoFocus
                            />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name='user_email'
                                placeholder="name@example.com"

                            />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="number"
                                name='user_number'
                                placeholder="Enter your number"

                            />
                        </Form.Group>

                        {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Text Area</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}

                    </Form>
                </Modal.Body>
                <Modal.Footer className='contactbody-bg'>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className='popupsendbtn' type='submit' value="Send" onClick={handleClose}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Popuplanding;