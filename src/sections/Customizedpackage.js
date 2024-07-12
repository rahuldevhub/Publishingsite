import React from 'react'
import { Row, Col } from 'react-bootstrap'
import '../css/Customized.css'
import { Link } from 'react-router-dom'
const Customizedpackage = () => {
  return (

    <div className='Customizedpackage'>

    <Row className='Customizedpackage-content'>
      <Col lg="6" sm="4" >
        <p>
          Create your own publishing path
        </p>
      </Col>

      <Col lg="6" sm="4" className=' Customizedpackage-button'>
      <Link to={'https://docs.google.com/forms/d/e/1FAIpQLSfNgLaoeUX9ZmnJkRdaSBH7EkEH48LUhowXbJgQ9sdRFHj-Xw/viewform?usp=sf_link'} target="_blank">
        <button >Customize Now</button></Link>
      </Col  >
    </Row>


  </div>
  )
}

export default Customizedpackage