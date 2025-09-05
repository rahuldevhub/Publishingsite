import React, { useEffect } from 'react'
import '../footer/Footer.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import logo from '../../Assets/logo.webp'
import { Row, Col } from 'react-bootstrap';


const Footer = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 })

    }, [])
    return (

        <div>
{/* data-aos="fade-up" */}
            <div className='footer'  >
                <div className='footer-col'>
                    <Row>

                        <Col lg="6" md="6" sm="4" >
                            <img src={logo} alt='logo' ></img>
                            <p>Join Ritera's world of readers, where we act as your compass in the labyrinth of literature,
                                helping you chart a course through the rich tapestry of stories waiting to be explored.
                            </p>
                        </Col>

                        <Col lg="3" md="2" sm="2" className='footer-col-right-content'>

                            <div>

                                <h3>Quick Links</h3>

                                <a href='/aboutus'>Why us</a><br />
                                <a href='/packages'>Packages</a><br />
                                <a href='/people-behind-ritera'>Our Team</a><br />
                                <a href='/careers'>Careers</a><br />                                

                               
                            </div>

                        </Col>                    
                        <Col lg="3" md="2" sm="2" className='footer-col-right-content'>

                            <div>
                              
                            <h3>Contact us</h3>
                                <a href='tel:+919488854787'>+91-94888-54787</a><br />
                                <a href='mailto:riterapublishing@gmail.com'>riterapublishing@gmail.com</a><br />
                                <a href='https://www.instagram.com/ritera_publishing/#/'>Ig: ritera_publishing</a><br />
                                <a href='#Getintouch'>Any Quries</a><br />

                            </div>

                        </Col>

                    </Row>

                </div>
            </div>
        </div>
    )
}

export default Footer