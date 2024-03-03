import React from 'react'
import { Row, Col } from 'react-bootstrap'
import '../css/Customized.css'
const Customizedpackage = () => {
  return (
    <div className='Customizedpackage'>

    <Row className='Customizedpackage-content'>
      <Col lg="6" sm="4" >
        <p>
          Create your own publishing path
          with customizable packages
        </p>
      </Col>

      <Col lg="6" sm="4" className=' Customizedpackage-button'>
        <button>Customize Now</button>
      </Col  >
    </Row>

  </div>
  )
}

export default Customizedpackage