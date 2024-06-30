import React, { useEffect } from 'react'
import '../footer/Footer.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
// import logo from '../../Assets/logo.png'
import { Row, Col } from 'react-bootstrap';


const Footer = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 })

    }, [])
    return (

        <div>
{/* data-aos="fade-up" */}
            <div className='footer' >
                <div className='footer-col'>
                    <Row>
                        <Col lg="6" md="6" sm="4" >
                            {/* <img src={logo} alt='logo image' ></img> */}
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut.</p>
                        </Col>
                        <Col lg="2" md="6" sm="4" className='footer-col-right-content'>

                            <div>
                                <h3>Company</h3>
                                <a href='#About'>About</a><br />
                                <a href='#ServiceWeOffer'>Services</a><br />
                                <a href='#Testimonials'>Reviews</a><br />
                                <a href='#contact'>Social Media</a><br />
                               

                            </div>

                        </Col>

                        <Col lg="2" md="6" sm="4" className='footer-col-right-content' >

                            <div>
                               
                                <h3>Useful Links</h3>

                                <a href='#ServiceWeOffer'>More Services</a><br />
                                <a href='#careers'>Careers</a><br />
                                <a href='#contact'>Get in touch</a><br />
                               
                                

                            </div>

                        </Col>
                        <Col lg="2" md="6" sm="4" className='footer-col-right-content'>

                            <div>
                              
                            <h3>Careers</h3>
                                <a href='#careers'>Job Openings</a><br />
                               
                               <a href='#careers'>Job responsibilities</a><br />
                                


                            </div>

                        </Col>
                    </Row>

                </div>

            </div>

        </div>

    )
}

export default Footer