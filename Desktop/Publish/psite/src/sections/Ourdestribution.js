import React from 'react'
import { Row, Col } from 'react-bootstrap';
import amazonlogo from '../assets/amm.png'
import flipkartlogo from '../assets/flipkart.png'
import kindlelogo from '../assets/kindle.png'
import kobologo from '../assets/kobo.png'
import googleplaylogo from '../assets/googleplay.png'
import '../css/ourdistribution.css'

const Ourdestribution = () => {
  return (
    <div className='Ourdestribution'>
      <p className='title' >Our distribution Channels</p>
      <p className='subtitle' >Join us on a worldwide literary journey, Where we take your stories to readers in over 150 countries</p>

      |<Row className='Ourdestribution-row'>
        {/* <Col xs={1} md={2} lg={3} className="g-4"> */}
          
          <img src={amazonlogo} style={{height:'5rem', width: 'auto'}}></img>
          <img  src={flipkartlogo} style={{height:'5rem', width: 'auto'}}></img>
          <img  src={kindlelogo} style={{height:'10rem', width: 'auto'}}></img>
          <img  src={kobologo} style={{height:'6rem', width: 'auto'}}></img>
          <img  src={googleplaylogo} style={{height:'9rem', width: 'auto'}}></img>
         
        <Col xs={1} md={2} lg={3} className="g-4">

        </Col>
      </Row>
    </div>
  )
}

export default Ourdestribution