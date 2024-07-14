import React, { useEffect } from 'react'
import '../footer/Footer.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import logo from '../../assets/logo.webp'
import { Row, Col } from 'react-bootstrap';


const Footer = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 })

    }, [])
    return (

        <div>

            <div className='footer' data-aos="fade-up" >
                <div className='footer-col'>
                    <Row>
                        <Col lg="6" md="6" sm="4" >
                            <img src={logo} alt='logo image' ></img>
                            <p>Join Ritera's world of readers, where we act as your compass in the labyrinth of literature,
                                helping you chart a course through the rich tapestry of stories waiting to be explored
                            </p>
                        </Col>
                        <Col lg="2" md="6" sm="4" className='footer-col-right-content'>

                            <div>
                                <h3>Company</h3>
                                <a href='/aboutus'>About</a><br />
                                <a href='/allservice'>Services</a><br />
                                <a href='/packages'>Packages</a><br />
                                <a href='/contact'>Social Media</a><br />
                               

                            </div>

                        </Col>

                        <Col lg="2" md="6" sm="4" className='footer-col-right-content' >

                            <div>
                               
                                <h3>Useful Links</h3>

                                <a href='/allservice'>More Services</a><br />
                              
                                <a href='/contact'>Get in touch</a><br />
                                <a href='#careers'><s>Careers </s></a><br />
                               
                                

                            </div>

                        </Col>
                        <Col lg="2" md="6" sm="4" className='footer-col-right-content'>

                            <div>
                              
                            <h3>Careers</h3>
                                <a href='#'><s>Job Openings </s></a><br />
                               <a href='#'><s>Job responsibilities</s></a><br />
                                


                            </div>

                        </Col>
                    </Row>

                </div>

            </div>

        </div>

    )
}

export default Footer