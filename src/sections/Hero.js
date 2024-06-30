import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import '../css/Hero.css'
import Lottie from 'lottie-react'
import heroanimationData from '../assets/Animation/Animation - 1709385705553.json'
import AOS from 'aos'
import 'aos/dist/aos.css'
const Hero = () => {

    useEffect(() => {
        AOS.init({ duration: 1000 })

    }, [])
    return (
        <div className='Hero' >
            <Row className='home-both-col'>

                <Col lg="6" md="6" sm="4" className='home-leftcontent-col'  >
                    <div className='home-leftcontent' >
                        <h3 className='home-title'  data-aos="fade-right" >Empower your story<br /><span style={{ color: '#E53766' }}>Self Publish</span> with<br /> Confidence</h3>
                        <p className='home-subtitle'  data-aos="fade-left">Ratix Info Tech offers you a unique and enjoyable experience of innovation, as well as a variety of services.</p>
                        <a href='#overallpackage' ><button className='getstart'data-aos="zoom-in" >Lets get started</button></a>
                    </div>
                </Col>

                <Col lg="6" md="6" sm="4" className='home-rightcontent-col' >
                    <div className='home-animation' >
                        <Lottie animationData={heroanimationData} />
                    </div>

                </Col>
            </Row>
        </div>
    )
}

export default Hero