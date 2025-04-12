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
          '📚 Celebrate the',
          800,
          () => setTextColor('black'),
          '📚 Celebrate the Magic of Book Day ',
          800,
          () => setTextColor('navy'),
          '📚 Celebrate the Magic of Book Day with Ritera!',
          1000,
          () => setTextColor('6A1B1B'),
          '',
        ]}
        repeat={Infinity}
      />
    </div>



        {/* <h1 data-aos="fade-right">📚 Celebrate the Magic of Book Day with Ritera!</h1> */}
        <Row className='Bookdaylandingpagetop-sub'  data-aos="zoom-in">
            <Col>
        <p>Get a free book on Book Day!</p></Col>
        <Col>
        <button  className='Bookdaylandingpagetop-button' 
         onClick={() => window.open('https://forms.gle/8pc7D4gmnmZAA2wj8', '_blank')}
        > Register Now</button>
        </Col>

        </Row>
        
        
        </div>
  )
}

export default Bookdaylandingpagetop