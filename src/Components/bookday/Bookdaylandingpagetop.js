import {React,useState} from 'react'
import './bookdaytopbar.css'
import { Row, Col } from 'react-bootstrap'
import { TypeAnimation } from 'react-type-animation';
const Bookdaylandingpagetop = () => {
  const [textColor, setTextColor] = useState('rebeccapurple');
  return (
    <div className='Bookdaylandingpagetop'>

<div
      style={{ color: textColor, }}
      className='Bookdaylandingpagetoptitle'
    >
      <TypeAnimation
        sequence={[
          "📚 Riteras's",
          600,
          () => setTextColor('black'),
          "📚 Ritera's Literary Virtual ",
          600,
          () => setTextColor('navy'),
          "📚 Ritera's Literary Virtual Meet 2025",
          800,
          () => setTextColor('6A1B1B'),
          '',
        ]}
        repeat={Infinity}
      />
    </div>



        {/* <h1 data-aos="fade-right">📚 Ritera's Literary Virtual Meet 2025</h1> */}
        <Row className='Bookdaylandingpagetop-sub'  data-aos="zoom-in">
            <Col>
        <p>For Authors. For Literature. For the World.</p></Col>
        <Col>
        <button  className='Bookdaylandingpagetop-button' 
         onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLScvf3Vkm_YONnMwFCLFHo4JhilIMt8Fu07c1cfS3okxD6xhgQ/viewform?usp=sharing&ouid=106583229284592543694', '_blank')}
        > Register Now</button>
        </Col>

        </Row>
        
        
        </div>
  )
}

export default Bookdaylandingpagetop