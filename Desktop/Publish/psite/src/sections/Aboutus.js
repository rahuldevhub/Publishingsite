import React from 'react'
import { Row, Col } from 'react-bootstrap'
import '../css/Aboutus.css'
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react'
import bookreading from '../assets/Animation/bookreading.json'

const Aboutus = () => {
  return (
    <div className='About' id='About'>
      <Row className='about-both-col'>
        <Col lg="6" md="6" sm = "4" data-aos="zoom-in"  >
         <div className='about-left-animation' >
         <Lottie animationData={bookreading} />
         </div>
        </Col>
        
        <Col lg="6" md="6" sm = "4" >
          <div className='about-right-content' >
            <p className='about-title' data-aos="fade-left">Why We</p>
            <p className='about-subtitle' data-aos="zoom-in">As an aspiring publishing house, Ritera stands apart with our uniqueapproach and unwavering commitment to authors' satisfaction. While wehold respect for other publishers in the field, we embrace differentideologies and possess a talented crew with a distinct working style. At Ritera, we promise that you'll never be left with doubts or dissatisfaction.
             </p>
             <Link to={'/aboutus'}>
            <button className='seemore' data-aos="zoom-in">See more Informations</button></Link>
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default Aboutus