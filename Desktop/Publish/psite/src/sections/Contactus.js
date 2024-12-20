import React from 'react'
import { Row, Col } from 'react-bootstrap';
import Contactusform from '../components/contactusform/Contactusform'
import '../css/contactus.css'
// import left from '../assets/contactleft.jpg'
import { Link } from 'react-router-dom';

import insta from '../assets/socialmedia/instalogo.png'
import facebook from '../assets/socialmedia/fblogo.png'
// import xlogo from '../assets/socialmedia/xlogo.png'
import whatsapp from '../assets/socialmedia/whatsapplogo.png'
import linkedin from '../assets/socialmedia/linkedinlogo.png'

const Contactus = () => {
    return (
        <div className='Contactus' id='Contactus'>

            <Row >
            <Col lg="6" md="6" sm="4">
          <div className='Getintouch-left-content'>

            <p className='Getintouch-title' data-aos="fade-right">Get In Touch</p>
            <p className='Getintouch-subtitle'data-aos="fade-right"> We're always happy to chat!  Whether you have a question, want to collaborate, or just to say hi, we're here for you. Follow us on your favorite platforms for updates, inspiration, and exclusive contents.</p>

        <Link to={'https://www.instagram.com/ratix_infotech?igsh=Y2dtZWJ1djlqYTQ2&utm_source=qr'}> <img src={insta}    alt='sample' className='socialmedia-img' data-aos="zoom-in-down" data-aos-duration="1000" /> </Link>
        <Link to={'https://www.instagram.com/ratix_infotech?igsh=Y2dtZWJ1djlqYTQ2&utm_source=qr'}> <img src={whatsapp}   alt='sample' className='socialmedia-img' data-aos="zoom-in-down" data-aos-duration="1500" /></Link><br />
        <Link to={'https://www.instagram.com/ratix_infotech?igsh=Y2dtZWJ1djlqYTQ2&utm_source=qr'}> <img src={facebook}   alt='sample' className='socialmedia-img'  data-aos="zoom-in-down" data-aos-duration="2000"/></Link>
        <Link to={'https://www.linkedin.com/company/ratix/'}> <img src={linkedin}   alt='sample' className='socialmedia-img' data-aos="zoom-in-down" data-aos-duration="2500"/></Link>
        {/* <Link to={'https://twitter.com/rahulriyaz_'}>  <img src={xlogo}   alt='sample' className='socialmedia-img' data-aos="zoom-in-down" data-aos-duration="3000"/></Link> */}

          </div>
        </Col>


                <Col lg="6" md="6" sm="4" className='contact-rightcontent-col'>
                    <p className='title' >Contact us</p>
                    {/* <p className='subtitle' >We are ready to work on a project of any complexity, whether it’s commercial or residential.</p> */}

                    <Contactusform />


                </Col>
            </Row>









        </div>
    )
}

export default Contactus