import React, { useEffect } from 'react'
import '../css/pplbehind.css'
import { Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import prooficon from '../Assets/study.png'
import { Link } from 'react-router-dom';
// import Header from '../Components/header/Header'
import sideimg from '../Assets/landingpagewhywe.jpg'
import Getintouch from '../Components/Getintouch';
import { useMediaQuery } from 'react-responsive';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import char1 from '../Assets/pplbehind/char1.jpg'
import char2 from '../Assets/pplbehind/char2.png'
import char3 from '../Assets/pplbehind/char3.png'
import char4 from '../Assets/pplbehind/char4.png'
import char5 from '../Assets/pplbehind/char5.png'
import marketingteam from '../Assets/serviceicons/marketing.webp'
import supportteam from '../Assets/serviceicons/copywriting.webp'
import writingteam from '../Assets/serviceicons/proofreading.webp'

const Pplbehind = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
  const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='Pplbehind' id='Pplbehind'>
          {/* <Header /> */}

      <div className='Pplbehind-bgimg'>
        <div className='Pplbehind-blackdrop'>

          <div className='Pplbehind-title'>People Behind Ritera</div>
        </div>
      </div>


      <div className='Pplbehind-contents'>

        <div className='Pplbehind-indivualcontent1'>
          <Row className='Pplbehind-subcontent-row'>
            <Col lg="6" md="6" sm="1" className='Pplbehind-subcontent-col1'>
              <img src={char1} className='Pplbehind-subcontent-img'></img>

            </Col>
            <Col lg="6" md="6" sm="1" >
              <p className='Pplbehind-subcontent-title'>Rahul</p>
              <p className='Pplbehind-subcontent-subtitle'>Co-Founder & CTO</p>
              <p className='Pplbehind-subcontent-description'>
              Mr. Rahul, the esteemed co-founder of Ratix Info Tech, brings extensive global client experience to the table. Ratix Info Tech has now formed a strategic alliance with Ritera Publishing to offer seamless support to authors and streamline workflow management. With a highly skilled design and editing team, Ritera Publication &  Rahul and his Ratix Info Tech ensures that your work receives the finest designs.
              </p>
            </Col>
          </Row>
        </div>

        {/* <div className='Pplbehind-indivualcontent2'>

          <Row className='Pplbehind-subcontent-row'>
            <Col lg="6" md="6" sm="1" className='Pplbehind-subcontent-col1'>
              <img src={char2} className='Pplbehind-subcontent-img'></img>

            </Col>
            <Col lg="6" md="6" sm="1" >
              <p className='Pplbehind-subcontent-title'>RJ Ananthi</p>
              <p className='Pplbehind-subcontent-subtitle'>Actress & Reviewer</p>
              <p className='Pplbehind-subcontent-description'>
              RJ Ananthi, renowned for her insightful and engaging book reviews on “The Book Show” YouTube channel. With her extensive knowledge and passion for literature, RJ Ananthi’s reviews are a testament to her expertise and dedication. This partnership enhances our publication’s reach, offering authors a unique opportunity to have their books reviewed by a respected voice in the literary community.  
              </p>
            </Col>
          </Row>

        </div> */}

        <div className='Pplbehind-indivualcontent'>
          <Row className='Pplbehind-subcontent-row'>
            <Col lg="6" md="6" sm="1" className='Pplbehind-subcontent-col1'>
              <img src={char3} className='Pplbehind-subcontent-img'></img>

            </Col>
            <Col lg="6" md="6" sm="1" >
              <p className='Pplbehind-subcontent-title'>Shahitha Fareen M</p>
              <p className='Pplbehind-subcontent-subtitle'>Reviewer & Writer</p>
              <p className='Pplbehind-subcontent-description'>
                Meet Ms. Shahitha, the seasoned reviewer at our publishing house, whose expertise and dedication have elevated over 300 books to greatness. With her discerning eye and insightful critiques, she guides authors to shine in the literary world. Shahitha's profound understanding of storytelling makes her a trusted ally for authors seeking excellence. Shahitha an unvaluable asset to our publishing house, will review your literary work with passion and expertise.
              </p>
            </Col>
          </Row>
        </div>


        <div className='Pplbehind-indivualcontent'>
          <Row className='Pplbehind-subcontent-row'>
            <Col lg="6" md="6" sm="1" className='Pplbehind-subcontent-col1'>
              <img src={char4} className='Pplbehind-subcontent-img'></img>

            </Col>
            <Col lg="6" md="6" sm="1" >
              <p className='Pplbehind-subcontent-title'>Saran Raj</p>
              <p className='Pplbehind-subcontent-subtitle'>Author </p>
              <p className='Pplbehind-subcontent-description'>
                Saran Raj, an accomplished author, weaves tales that resonate with readers. His passion for storytelling shines through in every word he pens. Partnering with Ritera, he offers author sessions, nurturing budding talents and engaging with avid readers. Join us today and get a free author session!
              </p>
            </Col>
          </Row>
        </div>


        <div className='Pplbehind-indivualcontent'>
          <Row className='Pplbehind-subcontent-row'>
            <Col lg="6" md="6" sm="1" className='Pplbehind-subcontent-col1'>
              <img src={char5} className='Pplbehind-subcontent-img'></img>

            </Col>
            <Col lg="6" md="6" sm="1" >
              <p className='Pplbehind-subcontent-title'>Gobika</p>
              <p className='Pplbehind-subcontent-subtitle'>Senior Designer</p>
              <p className='Pplbehind-subcontent-description'>
                Gobika, our esteemed Senior Designer, whose talent and experience have graced numerous authors and franchises with captivating visuals. With her artistic sense and dedication, she transforms concepts into visual masterpieces that shine on shelves worldwide. Her dedication to her craft and meticulous attention to detail ensure that each cover reflects the essence of the story within, enticing readers to dive into the worlds created by our authors.
              </p>
            </Col>
          </Row>
        </div>

      </div>


      {isDesktopOrLaptop && <div className='Pplbehind-teams'>
        <div className='Pplbehind-content'>
          <Row xs={1} md={2} lg={3} className="g-4  team-card">

            <Card className='teamcard' >
              <Card.Body >
                <div className='card-content'>
                  <img src={marketingteam} className='team-card-icon'></img>
                  <p className='team-card-title'>Marketing Team </p>
                  <p className='team-card-description'>
                  The talented marketing minds at Ritera are dedicated to maximizing the reach and growth of books. They excel in both traditional and digital marketing, constantly experimenting with new strategies and applying proven success formulas to benefit authors and their works.
                  </p>
                </div>
              </Card.Body>
            </Card>

            <Card className='teamcard' >
              <Card.Body>
                <div className='card-content'>
                  <img src={supportteam} className='team-card-icon'></img>
                  <p className='team-card-title'>Support Team </p>
                  <p className='team-card-description'>
                  Ritera provides seamless support to authors via email, Whats App, and phone calls, both before and after publishing. Our dedicated team is always available to assist with any queries or concerns, ensuring a smooth and stress-free experience for authors at every stage of their publishing journey
                  </p>
                </div>
              </Card.Body>
            </Card>

            <Card className='teamcard' >
              <Card.Body>
                <div className='card-content'>
                  <img src={writingteam} className='team-card-icon'></img>
                  <p className='team-card-title'>Writing Team </p>
                  <p className='team-card-description'>
                  We take proactive steps by conducting seminars and virtual meetings between talented authors and our writing team. This team captures the literary visions of authors and applies them to every book they work on, ensuring the best version of each book is brought to life.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Row>
        </div>
      </div> }

      {isTaborMobile && <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >


                <div className='Package1'>
                    <Row xs={1} md={2} lg={3} className="g-4 packageall">

                        <SwiperSlide>
                        <Card className='teamcard' >
              <Card.Body >
                <div className='card-content'>
                  <img src={marketingteam} className='team-card-icon'></img>
                  <p className='team-card-title'>Marketing Team </p>
                  <p className='team-card-description'>
                  The talented marketing minds at Ritera are dedicated to maximizing the reach and growth of books. They excel in both traditional and digital marketing, constantly experimenting with new strategies and applying proven success formulas to benefit authors and their works.
                  </p>
                </div>
              </Card.Body>
            </Card>
                        </SwiperSlide>

                        <SwiperSlide>
                        <Card className='teamcard' >
              <Card.Body>
                <div className='card-content'>
                  <img src={supportteam} className='team-card-icon'></img>
                  <p className='team-card-title'>Support Team </p>
                  <p className='team-card-description'>
                  Ritera provides seamless support to authors via email, Whats App, and phone calls, both before and after publishing. Our dedicated team is always available to assist with any queries or concerns, ensuring a smooth and stress-free experience for authors at every stage of their publishing journey
                  </p>
                </div>
              </Card.Body>
            </Card>
                        </SwiperSlide>

                        <SwiperSlide>
                        <Card className='teamcard' >
              <Card.Body>
                <div className='card-content'>
                  <img src={writingteam} className='team-card-icon'></img>
                  <p className='team-card-title'>Writing Team </p>
                  <p className='team-card-description'>
                  We take proactive steps by conducting seminars and virtual meetings between talented authors and our writing team. This team captures the literary visions of authors and applies them to every book they work on, ensuring the best version of each book is brought to life.
                  </p>
                </div>
              </Card.Body>
            </Card>
                        </SwiperSlide>


                    </Row>
                </div>
            </Swiper>
            }

      <div className='Pplbehind-hookredirect'>
        <Row className='Pplbehind-hookredirect-content'>
          <Col lg="12" md='6' sm="4" >
            <p>Why We?</p>
          </Col>

          <Col lg="12" md='6' sm="4" className=' Pplbehind-hookredirect-button'>
            <Link to={'/aboutus'}>
            <button>Explore</button>
            </Link>
          </Col  >
        </Row>
      </div>


    </div>
  )
}

export default Pplbehind