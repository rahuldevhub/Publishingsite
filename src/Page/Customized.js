import React, { useEffect } from 'react'
// import Header from '../Components/header/Header'
import '../css/customizedpage.css'
import { Row, Col } from 'react-bootstrap'
import Getintouch from '../Components/Getintouch'
import Form from 'react-bootstrap/Form';

const Customized = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
          <div className='customized-subcontent-description'>Have your own designer or editor? No problem! You can tailor your package by choosing the services you need. Once you submit your requirements, our consultant will reach out to discuss them with you. We’ll then provide a customized package fee, based on your selections.</div>
          <h3>Pre - Publishing</h3>

          <Row>
            <Col lg="6" md="6" sm="1" className='customized-col'>

              <form class="form-inline">

                <label class="my-1 mr-2" for="inlineFormCustomSelectPref" className='customized-option-name'>No.of pages</label>
                <input type="text" class="custom-select my-1 mr-sm-2" placeholder='No. of pages' />
                <br />


                <label class="my-1 mr-2" for="inlineFormCustomSelectPref" className='customized-option-name'>Type of Books</label>
                <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" >
                  {/* <option selected>Standard</option> */}
                  <option value="1">Fiction</option>
                  <option value="2">Non-Fiction</option>
                </select><br />

                <label class="my-1 mr-2" for="inlineFormCustomSelectPref" className='customized-option-name'>Genre</label>
                <input type="text"  class="custom-select my-1 mr-sm-2" placeholder='Genre' />
                <br />

                <label class="my-1 mr-2" for="inlineFormCustomSelectPref" className='customized-option-name'>Paper back</label>
                <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                  {/* <option selected>Standard</option> */}
                  <option value="1">India </option>
                  <option value="2">International</option>
                </select><br />


                <label class="my-1 mr-2" for="inlineFormCustomSelectPref" className='customized-option-name'>E- Book</label>
                <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                  {/* <option selected>Standard</option> */}
                  <option value="1">Standard</option>
                  <option value="2">Premium</option>
                </select><br />


              </form>

            </Col>
            <Col lg="6" md="6" sm="1" className='customized-col '>
              {/* <h3>Placements</h3> */}

              <form class="form-inline">


                <label class="my-1 mr-2" for="inlineFormCustomSelectPref" className='customized-option-name'>Cover Design</label>
                <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                  {/* <option selected>Standard</option> */}
                  <option value="1">Standard</option>
                  <option value="2">Advanced</option>
                  <option value="3">Premium</option>
                </select><br />


                <label class="my-1 mr-2" for="inlineFormCustomSelectPref" className='customized-option-name'>Interior Design</label>
                <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                  {/* <option selected>Standard</option> */}
                  <option value="1">Standard</option>
                  <option value="2">Advanced</option>
                  <option value="3">Premium</option>

                </select><br />

                <label class="my-1 mr-2" for="inlineFormCustomSelectPref" className='customized-option-name'>Beta Reading</label>
                <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                  {/* <option selected>Standard</option> */}
                  <option value="1">No Needed</option>
                  <option value="2">Below 10k words</option>
                  <option value="3">Below 25k words</option>
                  <option value="4">More than 40k words</option>
                </select><br />

                <label class="my-1 mr-2" for="inlineFormCustomSelectPref" className='customized-option-name'>Proof Reading</label>
                <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                  {/* <option selected>Standard</option> */}
                  <option value="1">No Needed</option>
                  <option value="2">Below 10k words</option>
                  <option value="3">Below 25k words</option>
                  <option value="4">More than 40k words</option>
                </select><br />

                <label class="my-1 mr-2" for="inlineFormCustomSelectPref" className='customized-option-name'>Copy Writing</label>
                <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                  {/* <option selected>Standard</option> */}
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select><br />



              </form>
            </Col>
          </Row>

        </div>
      </div>

      <div className='customized-content-bg2'>
        <div className='customized-content'>
          <h3>Post - Publishing</h3>
          <Row >
            <Col lg="6" md="6" sm="1" >

              <div class="custom-control custom-checkbox" className='customized-col3' >
                <input type="checkbox" class="custom-control-input" id="customCheck1" className='customized-input-box'></input>
                <label class="custom-control-label" for="customCheck1" className='customized-option-name3'>Amazon Prime</label>
              </div>
              <div class="custom-control custom-checkbox" className='customized-col3' >
                <input type="checkbox" class="custom-control-input" id="customCheck1" className='customized-input-box'></input>
                <label class="custom-control-label" for="customCheck1" className='customized-option-name3'>Amazon A+ Listing</label>
              </div>
              <div class="custom-control custom-checkbox" className='customized-col3' >
                <input type="checkbox" class="custom-control-input" id="customCheck1" className='customized-input-box'></input>
                <label class="custom-control-label" for="customCheck1" className='customized-option-name3'>Book Reviews</label>
              </div>
              <div class="custom-control custom-checkbox" className='customized-col3' >
                <input type="checkbox" class="custom-control-input" id="customCheck1" className='customized-input-box'></input>
                <label class="custom-control-label" for="customCheck1" className='customized-option-name3'>Social Media Promotions</label>
              </div>
            </Col>
            <Col lg="6" md="6" sm="1" >
              <div class="custom-control custom-checkbox" className='customized-col4' >
                <input type="checkbox" class="custom-control-input" id="customCheck1" className='customized-input-box'></input>
                <label class="custom-control-label" for="customCheck1" className='customized-option-name3'>Amazon Prime</label>
              </div>
              <div class="custom-control custom-checkbox" className='customized-col4' >
                <input type="checkbox" class="custom-control-input" id="customCheck1" className='customized-input-box'></input>
                <label class="custom-control-label" for="customCheck1" className='customized-option-name3'>Amazon A+ Listing</label>
              </div>
              <div class="custom-control custom-checkbox" className='customized-col4' >
                <input type="checkbox" class="custom-control-input" id="customCheck1" className='customized-input-box'></input>
                <label class="custom-control-label" for="customCheck1" className='customized-option-name3'>Book Reviews</label>
              </div>
              <div class="custom-control custom-checkbox" className='customized-col4' >
                <input type="checkbox" class="custom-control-input" id="customCheck1" className='customized-input-box'></input>
                <label class="custom-control-label" for="customCheck1" className='customized-option-name3'>Social Media Promotions</label>
              </div>
            </Col>
          </Row>
          <Form className='customizecontactusform'   >

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="number" placeholder="Enter your number" />
            </Form.Group>

          </Form>
          <button className='customized-submit-button'> Submit</button>

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