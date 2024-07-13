import React from 'react'
import '../css/Detailedabout.css'
import { Row, Col } from 'react-bootstrap';
import ic from '../assets/ourservice/globe.png'
import sh from '../assets/characters/sf.jpg'
const Detailedabout = () => {
    return (
        <div>
            <div className='Detailedabout-title-top' >
                <p className='Detailedabout-title' >About us</p>
            </div>
            <div className='Detailedabout'>
                <p className='detailedabout-subtitle' ><span className='detailedabout-companyname'>At Ritera,</span> our passion for literature drives everything we do. As anaspiring publishing house, we're dedicated to
                    providing premium servicesand deliverables at affordable prices, ensuring that every author's workreceives the attention and care it deserves.
                    We believe wholeheartedly inthe power of literature to enrich lives and make the world a better place,which is why we prioritize author satisfaction
                    above all else. With ourunwavering commitment to excellence and the recent partnership withRatix, we are thrilled to expand our offerings and access a
                    wealth oftalented designers and professionals. Together, we're excited to continueour journey of fostering creativity, getting authors under the spotlight
                    ,connecting readers with captivating stories, and making a meaningfulimpact in the world of literature

                </p>

                <p className='detailedabout-subtitle' >With committed and passionate employees, who driven by the love for literature, our team members are
                    dedicated to providing exceptional service to our authors and readers alike. From our talented editors who meticulously refine
                    manuscripts to our creative designers who craft captivating covers, each member of our team plays a vital role in bringing your stories
                    to life. With an xperienced and talented proof readers and reviewing team, we make a special place for you and our books.</p>
                <p className='detailedabout-subtitle'>
                    So welcome to Ritera, Where every word counts and every story shines.
                </p>


                <div className='aboutcharacters'>

                    <Row className='about-characters' data-aos="zoom-in">
                        <Col lg='4' >
                            <img src={ic} alt='char' className='char-left-img'></img>
                        </Col>
                        <Col lg='8'>
                            <p className='detailedabout-name' >Rahul </p>
                            <p className='detailedabout-roll' >Senior Manager / Marketing Expert</p>
                            <p className='detailedabout-subtitle' >
                                Rahul, the brain behind our marketing strategies and book designs, whose versatile talents and extensive knowledge are the cornerstone of our success. His expertise extends across both realms of marketing and design, allowing him to craft compelling campaigns and visually stunning book covers that resonate with our audience.
                                His keen understanding of market trends and consumer behaviour ensures that our books reach their intended audience effectively, while his creative vision brings our authors' stories to life in captivating ways.
                            </p>

                        </Col>
                    </Row>


                    <Row className='about-characters1' data-aos="zoom-in" >

                        <Col lg='8'>
                            <p className='detailedabout-name1' > Gobika</p>
                            <p className='detailedabout-roll1' > Senior Designer</p>
                            <p className='detailedabout-subtitle' >
                                Gobika, our esteemed Senior Designer, whose talent and experience have graced numerous authors and franchises with captivating visuals.
                                With her artistic sense and dedication, she
                                transforms concepts into visual masterpieces that shine on shelves worldwide. Her dedication to her craft and meticulous attention to detail ensure that each cover reflects the essence of the story within, enticing readers to dive into the worlds created by our authors.
                            </p>
                        </Col>
                        <Col lg='4' >
                            <img src={ic} alt='char' className='char-left-img'></img>

                        </Col>

                    </Row>

                    <Row className='about-characters' data-aos="zoom-in">
                        <Col lg='4'   >
                            <img src={sh} alt='char' className='char-left-img'></img>
                        </Col>
                        <Col lg='8'  >
                            <p className='detailedabout-name' > Shahitha Fareen M</p>
                            <p className='detailedabout-roll' > Reviewer, Writer</p>
                            <p className='detailedabout-subtitle' >
                                Meet Ms. Shahitha, the seasoned reviewer at our publishing house, whose expertise and dedication have elevated over 300 books to greatness. With her discerning eye and insightful critiques, she guides authors to shine in the literary world.
                                Shahitha's profound understanding of storytelling makes her a trusted ally for authors seeking excellence.
                                Shahitha an
                                unvaluable asset to our publishing house, will review your literary work with passion and expertise
                            </p>

                        </Col>
                    </Row>

                    <Row className='about-characters1' data-aos="zoom-in" >

                        <Col lg='8'>
                            <p className='detailedabout-name1' > Saran Raj</p>
                            <p className='detailedabout-roll1' > Author</p>
                            <p className='detailedabout-subtitle' >
                                Gobika, our esteemed Senior Designer, whose talent and experience have graced numerous authors and franchises with captivating visuals.
                                With her artistic sense and dedication, she
                                transforms concepts into visual masterpieces that shine on shelves worldwide. Her dedication to her craft and meticulous attention to detail ensure that each cover reflects the essence of the story within, enticing readers to dive into the worlds created by our authors.
                            </p>
                        </Col>
                        <Col lg='4' >
                            <img src={ic} alt='char' className='char-left-img'></img>

                        </Col>

                    </Row>

                    <Row className='about-characters' data-aos="zoom-in">
                        <Col lg='4'   >
                            <img src={sh} alt='char' className='char-left-img'></img>
                        </Col>
                        <Col lg='8'  >
                            <p className='detailedabout-name' > Marketing Team</p>
                            <p className='detailedabout-roll' > Marketing</p>
                            <p className='detailedabout-subtitle' >
                                Meet Ms. Shahitha, the seasoned reviewer at our publishing house, whose expertise and dedication have elevated over 300 books to greatness. With her discerning eye and insightful critiques, she guides authors to shine in the literary world.
                                Shahitha's profound understanding of storytelling makes her a trusted ally for authors seeking excellence.
                                Shahitha an
                                unvaluable asset to our publishing house, will review your literary work with passion and expertise
                            </p>

                        </Col>
                    </Row>

                </div>




            </div>
        </div>
    )
}

export default Detailedabout