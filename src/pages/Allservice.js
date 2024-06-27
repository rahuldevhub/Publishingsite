import React from 'react'
import { Row, Col } from 'react-bootstrap';
import '../css/Allservice.css'
import rj from '../assets/rj.jpg'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

const Allservice = () => {
  return (
  <div>
    <Header/>
    <div className='allservice-title-top'>
        <p className='allservice-title' >Service we offer</p>
        </div>
        <div className='allservice'>
            <p className='allservice-subtitle' >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
            Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>


<Row className='characters'>
                <Col lg='4'  className='char-left-img'>     <img  src={rj} alt='character-img'></img></Col>
                <Col lg='8'>
                <p className='detailedabout-subtitle' >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
            Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                </Col>
            </Row>


            <Row className='characters'>
                <Col lg='8'>
                <p className='detailedabout-subtitle' >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
            Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>


                </Col>
                <Col lg='4'  className='char-left-img'>
                <img  src={rj} alt='character-img'></img>
                </Col>
            </Row>


            <Row className='characters'>
                <Col lg='4'  className='char-left-img'>     <img  src={rj} alt='character-img'></img></Col>
                <Col lg='8'>
                <p className='detailedabout-subtitle' >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
            Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                </Col>
            </Row>
            
    </div>


    <Footer/>
    </div>


   
  )
}

export default Allservice