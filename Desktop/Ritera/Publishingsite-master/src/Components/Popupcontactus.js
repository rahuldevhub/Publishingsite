import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './popupcontact.css'
const Popupcontactus = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className='package-button' onClick={handleShow}>
        Choose this package
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='contactheader-bg'>
          <Modal.Title>Thanks for choosing</Modal.Title>
        </Modal.Header>

        <Modal.Body className='contactbody-bg'>
          <Form>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                autoFocus
              />

            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
              
              />

            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
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
          <Button variant="primary" className='popupsendbtn' onClick={handleClose}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Popupcontactus