import React, { useEffect } from 'react'
import '../css/landingpage.css'
// import Header from '../Components/header/Header'
import Serviceswiper from '../Components/swiper/Serviceswiper'
import { Row, Col } from 'react-bootstrap'
import whywebg from '../Assets/landingpagewhywe.jpg'
import Package from '../Components/landingpagepackage/Package'
// import customizedbg from '../Assets/customizedbg.jpg'
import Getintouch from '../Components/Getintouch'
import { Link } from 'react-router-dom';
// import Literaryhub from '../Components/literaryhub/Literaryhub'
import Popuplanding from '../Components/Popups/Popuplanding'
// import { BlogSection } from '../Components/blog/BlogSection'
import Newrelease from '../Components/newrealese/Newrelease'
import Testimonials from '../Components/testimonials/Testimonials'
// import Bookdaylandingpagetop from '../Components/bookday/Bookdaylandingpagetop'


const Landingpage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='Landingpage'>

      <div className='landingpage-bookday'>
        <div className='landingpage-bookday-content'>
          {/* <Bookdaylandingpagetop /> */}
        </div>


      </div>

      <div className='landingpage-bgimg' >
        <div className='landingpage-blackdrop' data-aos="fade-down" >
          {/* <Header /> */}
          <div className='landing-content'>
            <h1 className='landing-title' data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1000">Empower your story <br /> <span style={{ color: "white" }}>Self Publish</span> with confidence</h1>
            <p className='landing-subtitle' data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1000">At Ritera, We're passionate about transforming ideas <br /> into stories and visions into masterpiece</p>
            <Popuplanding />

          </div>
        </div>

      </div>

      {/* New release section start */}

      <div className='landingpage-newrelease'>
        <div className='landingpage-newrelease-content'>
          <Newrelease />

        </div>
      </div>


      <div className='landingpage-whywe'>
        <div className='landingpage-whywe-content'>
          <Row>
            <Col lg="6" md="6" sm="1" className='landingpage-col-centering'>

              <img src={whywebg} alt='Vintage sewing machine beside colorful fabric swatches, representing book cover materials by a self publishing house in India' className='landingpage-whywe-leftimg' ></img>

            </Col>

            <Col lg="6" md="6" sm="1" className='landingpage-col-centering'>
              <div >
                <h2 >Why us ?</h2>
                <p ><b>Confused about choosing the best self publishing house for your book? </b> Look no further! At Ritera Publishing, we offer an unparalleled publishing experience with exclusive services you won’t find anywhere else. Our complete motto is to make the publishing process smoother and comfortable for you. With the shared love we both have
                  for literature, Ritera decided to offer some special services exclusively!
                </p>
                <Link to={'/aboutus'}>
                  <button className='Whywe-button' data-aos="zoom-in"> Learn more</button>
                </Link>
              </div>

            </Col >
          </Row>
        </div>
      </div>

      <div className='landingpage-service'>
        <div className='landingpage-service-content'>
          <h2>Services</h2>
          <Serviceswiper />
        </div>

      </div>

      <div className='landingpage-package' id='landingpage-package'>
        <div className='landingpage-package-content'>
          <h2>Packages</h2>
          <Package />
        </div>
      </div>

      <div className='landingpage-customizedroyalty'>
        <div className='landingpage-customizedroyalty-content'>
          {/* <Row> */}
          {/* <Col lg="12" md="6" sm="1" className='landingpage-col-centering'> */}
          <div className='landingpage-col-centering'>
            <div className='landingpage-customizedroyalty-blackdrop'>
              <div className='landingpage-customizedroyalty-insidecontent'>
                <h2>Customizable Package</h2>
                <p> Upon submitting your preferences, our marketing specialist will present you with a tailored package, detailing its pricing and benefits. </p>
                <a
                  href="https://forms.gle/eP3HsWVbDRTjGN7Q7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className="landingpage-customizedroyalty-button"
                    data-aos="zoom-in"
                  >
                    Learn more
                  </button>
                </a>
              </div>
            </div>
          </div>
          {/* </Col> */}

          {/* <Col lg="12" md="6" sm="1" className='landingpage-col-centering'> */}
          {/* <div className='landingpage-customizedroyalty-blackdrop'>
                <img src={customizedbg} className='landingpage-customizedroyalty-img'></img>
                <div className='landingpage-customizedroyalty-insidecontent'>
                  
                  <h2>Customized Package</h2>
                  <p> As an aspiring publishing house, Ritera stands apart with our unique approach and unwavering commitment to authors' satisfaction. </p>
                  <button className='Whywe-button'> Learn more</button>
                
                </div>

              </div> */}
          {/* </Col > */}
          {/* </Row> */}
        </div>
      </div>

            <div className='landingpage-testimonial'>
              <Testimonials/>
            </div>

      <div className='landingpage-getintouch'>
        <Getintouch />
      </div>

    </div>
  )
}

export default Landingpage