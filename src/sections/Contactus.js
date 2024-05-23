import React from 'react'
import { Row, Col } from 'react-bootstrap';
import Contactusform from '../components/contactusform/Contactusform'
import '../css/contactus.css'
// import left from '../assets/contactleft.jpg'

import Lottie from 'lottie-react'
import book from '../assets/Animation/book.json'

const Contactus = () => {
    return (
        <div className='Contactus' id='Contactus'>



            <Row >
                <Col lg="6" md="6" sm="4" className='contact-leftcontent-col'>
                    <div className='contact-left-animation'>
                    <Lottie animationData={book} />
                       
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