import React, { useEffect } from 'react'
// import Header from '../Components/header/Header'
import '../css/customizedpage.css'
// import { Row, Col } from 'react-bootstrap'
// import Getintouch from '../Components/Getintouch'
// import Form from 'react-bootstrap/Form';
import { Form, FormGroup, Label, Input } from "reactstrap";


const Customized = () => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);


  return (
    <div className='Customized' id='Customized'>
      {/* <Header /> */}

      <div className='customized-bgimg'>
        <div className='customized-blackdrop'>
          <div className='customized-title'>Customize your package</div>

        </div>
      </div>

      <div className='customized-content-bg'>
        <div className='customized-content'>
          {/* <div className='customized-subcontent-description'>Have your own designer or editor? No problem! You can tailor your package by choosing the services you need. Once you submit your requirements, our consultant will reach out to discuss them with you. We’ll then provide a customized package fee, based on your selections.</div>
          <h3>Pre - Publishing</h3> */}
          <h3>Current section is under maintance</h3>

          {/* <Form >
            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input type="text" name='page_count' placeholder="No. of Pages" />
            </FormGroup>
            <FormGroup className="booking__form d-inline-block ms-1 mb-4">
              <select type="text" name='Type' placeholder="Type of Book" >
                <option >Type of Book</option>
                <option >Fiction</option>
                <option >Non-Fiction</option>

              </select>
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input type="text" name='genre' placeholder="Genre" />
            </FormGroup>

            <FormGroup className="booking__form d-inline-block ms-1 mb-4">
              <select name="paper_back"  >
                <option value="1 person">Paper Back</option>
                <option value="2 person">2 Person</option>
                <option value="3 person">3 Person</option>

              </select>
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
            
              <select name="Ebook"  >
                <option value="1 person">Ebook</option>
                <option value="2 person">2 Person</option>
                <option value="3 person">3 Person</option>

              </select>
            </FormGroup>
            <FormGroup className="booking__form d-inline-block ms-1 mb-4">
              <input type="text" name='coverdesign' placeholder="Cover Design" />
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <select name="Interior"   >
                <option value="1 person">Interior Design</option>
                <option value="2 person">2 Person</option>
                <option value="3 person">3 Person</option>

              </select>
            </FormGroup>
            <FormGroup className="booking__form d-inline-block ms-1 mb-4">
              <select name="beta_read"    >
                <option value="1 luggage">Beta Reading</option>
                <option value="2 luggage">2 luggage</option>
                <option value="3 luggage">3 luggage</option>
              </select>
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <select name="proof_read"   >
                <option value="1 person">Proof Reading</option>
                <option value="2 person">2 Person</option>
                <option value="3 person">3 Person</option>

              </select>
            </FormGroup>
            <FormGroup className="booking__form d-inline-block ms-1 mb-4">
              <select name="copy_write"    >
                <option value="1 luggage">Copy Writing</option>
                <option value="2 luggage">2 luggage</option>
                <option value="3 luggage">3 luggage</option>
              </select>
            </FormGroup>


            <h3>Post - Publishing</h3>


            <FormGroup check  >
              <Input type="checkbox" name='amazon_prime'/>
              <Label check>Amazon Prime</Label>
            </FormGroup>

            <FormGroup check  >
              <Input type="checkbox" name='amazonaplus' />
              <Label check>Amazon A+ Listing</Label>
            </FormGroup>

        

            <FormGroup check  >
              <Input type="checkbox" name='book_reviews' />
              <Label check>Book Reviews</Label>
            </FormGroup>

            <FormGroup check  >
              <Input type="checkbox" name='social_media' />
              <Label check>Social Media Promotions</Label>
            </FormGroup>

            <h3>Contact Details</h3>

            
            <FormGroup className="booking__form  me-4 mb-4">
              <input type="text" name='name' placeholder="Enter Name" />
            </FormGroup>

            <FormGroup className="booking__form  me-4 mb-4">
              <input type="email" name='email' placeholder="Enter Email" />
            </FormGroup>

            <FormGroup className="booking__form  me-4 mb-4">
              <input type="number" name='number' placeholder="Enter Number" />
            </FormGroup>

        
            

            <button className="book customized-submit-button" >Book Now</button>
          </Form> */}

         

        </div>
      </div>

      
      {/* 
      <div className='customized-getintouch'>
        <Getintouch />
      </div> */}

    </div>
  )
}

export default Customized