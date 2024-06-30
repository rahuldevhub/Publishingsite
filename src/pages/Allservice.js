import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import '../css/Allservice.css'
import marketing from '../assets/ourservice/marketing.png'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import proff from '../assets/ourservice/proff.png'
import globe from '../assets/ourservice/globe.png'
import book from '../assets/ourservice/13818745_5362964.png'
import writing from '../assets/ourservice/writing.png'
const Allservice = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className='allservice'> 
            <Header />

{/* header completed  */}

            <div className='allservice-title-top'>
                <p className='allservice-overall-title' data-aos="fade-right">Service we offer</p>
            </div>
            <div className='allservice1'>
                <p className='allservice-subtitle' > It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose
                </p>

                {/* top bar completed */}

                <Row className='characters'  data-aos="zoom-in">
                    <Col lg='4' className='service-left-img'>     <img src={book} alt='character-img'></img></Col>
                    <Col lg='8'>
                        <p className='allservice-title' >Beta Reading</p>

                        <p className='detailedservice-subtitle' >
                            Beta readers play a crucial role in evaluating manuscripts before publishing your
                            book. A specialized team of beta readers will provide a constructive feedback on plot,
                            character development, pacing, and overall readability. Our beta readers will also
                            offer their valuable insights, encourage authors to consider their feedback
                            thoughtfully and provide them with a report to make necessary revisions, if any.
                        </p>

                    </Col>
                </Row>


                <Row className='characters1'data-aos="zoom-in">
                    <Col lg='8'>
                        <p className='allservice-title' >Copy Writing</p>

                        <p className='detailedservice-subtitle' >
                            Effective copy writing is essential for books and here’s what our copywriters will
                            focus on: Crafting compelling blurbs, Creating engaging author profile, helping you
                            in finishing your manuscript which entice readers to explore further and resonate
                            with the target audience.
                        </p>
                    </Col>
                    <Col lg='4' className='service-left-img'>
                        <img src={writing} alt='character-img'></img>
                    </Col>
                </Row>


                <Row className='characters' data-aos="zoom-in">
                    <Col lg='4' className='service-left-img'>     <img src={globe} alt='character-img'></img></Col>
                    <Col lg='8'>
                        <p className='allservice-title' >International</p>

                        <p className='detailedservice-subtitle' >
                            Ritera has a tie up with the global distribution network that connects publishers,
                            retailers, and libraries.
                        </p>

                    </Col>
                </Row>


                <Row className='characters1 'data-aos="zoom-in">
                    <Col lg='8'>
                        <p className='allservice-title' > Proof Reading </p>

                        <p className='detailedservice-subtitle' >
                        A polished manuscript is essential, and our proofreaders will help you correct
                            grammar, spelling, punctuation errors, and Ensure consistency in formatting and style.


                        </p>
                    </Col>
                    <Col lg='4' className='service-left-img'>
                        <img src={proff} alt='character-img'></img>
                    </Col>
                </Row>


                <Row className='characters' data-aos="zoom-in">
                    <Col lg='4' className='service-left-img'>     <img src={marketing} alt='character-img'></img></Col>
                    <Col lg='8'>
                        <p className='allservice-title' >Marketing</p>

                        <p className='detailedservice-subtitle' >
                            
                            Tailor marketing plans to each book’s unique needs:
                            Social Media Campaigns: Leverage platforms like Twitter, Instagram, and Goodreads.
                            Email Newsletters: Regular updates to engage existing readers and attract new ones.
                            Book Launch Events: Organize virtual or in-person launches to create buzz.
                        </p>

                    </Col>
                </Row>

            </div>


            <Footer />
        </div>



    )
}

export default Allservice