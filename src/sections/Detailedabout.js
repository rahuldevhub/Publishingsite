import React from 'react'
import '../css/Detailedabout.css'
import { Row, Col } from 'react-bootstrap';
import gobi from '../assets/characters/female1.webp'
import sh from '../assets/characters/sf.webp'
import marketingteam from '../assets/characters/marketingteam.webp'
import saranraj from "../assets/characters/saranraj.webp"
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
                        <Col lg='4' style={{textAlign: "center"}}>
                            <img src={saranraj} alt='char' className='char-left-img'></img>
                        </Col>
                        <Col lg='8' style={{textAlign: "center"}}>
                            <p className='detailedabout-name' > Saran Raj </p>
                            <p className='detailedabout-roll' >Author</p>
                            <p className='detailedabout-subtitle' >
                            Saran Raj, an accomplished author, weaves tales that resonate with readers. His passion for
storytelling shines through in every word he pens. Partnering with Ritera, he offers author
sessions, nurturing budding talents and engaging with avid readers. Join us today and get a free
author session!
                            </p>

                        </Col>
                    </Row>


                    <Row className='about-characters1' data-aos="zoom-in" >

                        <Col lg='8' style={{textAlign: "center"}}>
                            <p className='detailedabout-name1' > Gobika</p>
                            <p className='detailedabout-roll1' > Senior Designer</p>
                            <p className='detailedabout-subtitle' >
                                Gobika, our esteemed Senior Designer, whose talent and experience have graced numerous authors and franchises with captivating visuals.
                                With her artistic sense and dedication, she
                                transforms concepts into visual masterpieces that shine on shelves worldwide. Her dedication to her craft and meticulous attention to detail ensure that each cover reflects the essence of the story within, enticing readers to dive into the worlds created by our authors.
                            </p>
                        </Col>
                        <Col lg='4'style={{textAlign: "center"}} >
                            <img src={gobi} alt='char' className='char-left-img'></img>

                        </Col>

                    </Row>

                    <Row className='about-characters' data-aos="zoom-in">
                        <Col lg='4'  style={{textAlign: "center"}} >
                            <img src={sh} alt='char' className='char-left-img'></img>
                        </Col>
                        <Col lg='8' style={{textAlign: "center"}} >
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
                            <p className='detailedabout-name1' style={{textAlign: "left" , marginTop: "2rem"}} > Marketing Team </p>
                            {/* <p className='detailedabout-roll1' > Author</p> */}
                            <p className='detailedabout-subtitle' >
                            A skilled marketing team with high potential marketing strategies will take your book to every
nook and cranny of this world. Their only motive is to take both you and your book to the
spotlight of the world and taste the success.
                            </p>
                        </Col>
                        <Col lg='4' style={{textAlign: "center"}}>
                            <img src={marketingteam} alt='char' className='char-left-img'></img>

                        </Col>

                    </Row>

                    

                </div>




            </div>
        </div>
    )
}

export default Detailedabout