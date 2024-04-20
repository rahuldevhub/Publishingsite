import React from 'react'
import { Row, Col } from 'react-bootstrap'
import '../css/Aboutus.css'
import left from '../assets/contactleft.jpg'
import { Link } from 'react-router-dom';

const Aboutus = () => {
  return (
    <div className='About' id='About'>


      <Row className='about-both-col'>
        <Col lg="6" md="6" sm = "4" data-aos="zoom-in"  >
          {/* <img src={Headerpicture} alt='headerimage' className='about-left-picture' /> */}
          {/* <Lottie animationData={animationData} /> */}
          <img src={left} className='about-left-picture'></img>

        </Col>

        <Col lg="6" md="6" sm = "4" >
          <div className='about-right-content' >

            <p className='about-title' data-aos="fade-left">Secret behind our client<br /> Satisfaction</p>
            <p className='about-subtitle' data-aos="zoom-in">Ratix Info Tech offers a wide range of services to help businesses grow and succeed in the digital age. Our mission is to provide innovative and customized solutions that meet the needs and expectations of our clients.


             </p>
             <Link to={'/aboutus'}>
            <button className='seemore'>See more Informations</button></Link>


          </div>
        </Col>
      </Row>




    </div>
  )
}

export default Aboutus