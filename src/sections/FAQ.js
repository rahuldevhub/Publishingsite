import React from 'react'
import { Row, Col } from 'react-bootstrap';
import '../css/FAQ.css'
import Lottie from 'lottie-react'
import faq from '../assets/Animation/Animation - 1709309979308.json'
import Faqcontent from '../components/faq/Faqcontent';
const FAQ = () => {
    return (
        <div className='FAQ'>

            <Row >
                <Col lg="6" md="6" sm="4" className='faq-leftcontent-col'>
                    <div className='faq-animation'>
                        <Lottie animationData={faq} />
                    </div>
                </Col>


                <Col lg="6" md="6" sm="4">
                <p className='title' >Frequently Asked Questions</p>
                <Faqcontent/>

                </Col>
            </Row>


        </div>
    )
}

export default FAQ