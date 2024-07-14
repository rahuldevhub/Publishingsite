import React, { useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import '../css/packagepage.css'
import { Link } from 'react-router-dom';
import Popupcontactus from '../components/popup/Popupcontactus';
const Packagespage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className='Packagespage'>
         

            <div className='allservice-title-top'>
                <p className='allservice-overall-title' >Packages</p>
            </div>


            <div className='packagepage-overall'>
                <h1 className='packagepage-heading'>Basic :</h1>
                {/* <p className='packagepage-subheading'>Sample text</p> */}
                <Row xs={2} sm={2} md={3} lg={3} className="g-4  packagepage-overall-row">
                    <Col className='packagecol'>  <div className='packagepage-card'>
                        <Card  >
                            <Card.Body >
                                <div className=''>
                                    <p className='package-title'>Essential</p>
                                    <p className='packagepage-subtitle'>Essential services with standard cover and interior designs,
                                        and eBook formatting for budding authors /Online
                                        distribution in India stores.</p>


                                </div>
                                <ul className='package-features'>

                                    <li>Personal Publishing Manager</li>
                                    <li>Standard Cover Design</li>
                                    <li>Standard Interior Design</li>
                                    <li>Online PaperBack Distribution (India)</li>
                                    <li>E-Book Placement (Google) </li>
                                    <li>Copy Rights </li>
                                    <li>ISBN + Barcode </li>
                                    <li>Author Dashboard </li>
                                    <li>Post Publishing Support </li>
                                    <li>60% Royalty for Author</li>

                                </ul>
                                <p className='package-Price'>₹8999</p>
                                <Popupcontactus />


                            </Card.Body>
                        </Card>
                    </div>
                    </Col >
                    <Col className='packagecol'>
                        <div className='packagepage-card' >
                            <Card  >
                                <Card.Body>
                                    <div className=''>
                                        <p className='package-title'>Standard</p>
                                        <p className='packagepage-subtitle'>Comprehensive support for aspiring authors with free
                                            Author copies, certificate, and and eBook placement on
                                            Google and Kobo /Online distribution in India</p>
                                        <ul className='package-features'>
                                            <li>All service in previous</li>
                                            <li>80% Royalty for Author</li>
                                            <li>Author Copies & Certificate</li>
                                            <li>E-Book (Google, Kindle)</li>
                                            <li>Standard cover design</li>
                                            <li>Interior Design</li>
                                            <li>Online Paperback distribution (India)</li>
                                            <li>Publishing Plan</li>
                                            <li>Digital Proof</li>

                                        </ul>
                                        <p className='package-Price'>₹12999</p>

                                        <Popupcontactus />


                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col className='packagecol3'>
                        <div className='packagepage-card'>
                            <Card  >
                                <Card.Body>
                                    <div className=''>
                                        <p className='package-title'>Advanced</p>
                                        <p className='packagepage-subtitle'>All-inclusive package with International Distribution
                                            premium cover and interior design, Prime placement,
                                            promotions, and free author session for ambitious authors</p>

                                        <ul className='package-features'>
                                            <li>All service in previous</li>
                                            <li>100% Royalty for Author</li>
                                            <li>Premium Cover Design</li>
                                            <li>Premium Interior Design</li>
                                            <li>International PaperBack Distribution</li>
                                            <li>E-Book ( google, kindle, kobo)</li>
                                            <li>Author copies (10)</li>
                                            <li>Amazon Prime placement (3mon)</li>
                                            <li>Kindle Promotion</li>
                                            <li>Book Reviews</li>
                                            <li>Free Author Session</li>
                                            <li>Beta Reading</li>
                                        </ul>
                                        <p className='package-Price'>₹29999</p>
                                        <Popupcontactus />
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>

            <br />
            <br />


            <div className='packagepage-overall'>
                <h1 className='packagepage-heading'>Top-Tier :</h1>
                {/* <p className='packagepage-subheading'>Sample text</p> */}

                <Row xs={2} md={2} lg={3} className="g-4  packagepage-overall-row">
                    < Col className='packagecol'> <div className='packagepage-card'>
                        <Card >
                            <Card.Body >
                                <div className=''>
                                    <p className='package-title'>Elite</p>
                                    <p className='packagepage-subtitle'>Advanced cover & Interior design, extensive marketing
                                        campaigns, early or post reviews, promotions and prime
                                        listing..</p>


                                </div>
                                <ul className='package-features'>
                                    <li>All service in previous</li>
                                    <li>Advance Cover Design</li>
                                    <li>Advance Interior Design</li>
                                    <li>International PaperBack Distribution</li>
                                    <li>E-Book Placement</li>
                                    <li>Amazon A+ listing</li>
                                    <li>Amazon Prime (6 Mon)</li>
                                    <li>Amazon Ads (3 Mon)</li>
                                    <li>Kindle Promotions</li>
                                    <li>Book Reviews</li>

                                </ul>
                                <p className='package-Price'>₹49999</p>
                                <Popupcontactus />

                            </Card.Body>
                        </Card>
                    </div></Col>


                    <Col className='packagecol'><div className='packagepage-card' >
                        <Card >
                            <Card.Body>
                                <div className=''>
                                    <p className='package-title'>Premium </p>

                                    <p className='packagepage-subtitle'>Spot light package including Author interviews,
                                        Customised designs, proofreading or copy editing sercice,
                                        Review campaigns, and additional author copies</p>

                                    <ul className='package-features'>
                                        <li>All service in previous</li>
                                        <li>Complimentry Proof reading or Copy editing</li>
                                        <li>Customized Cover Design</li>
                                        <li>Advance interior Design</li>
                                        <li>International Paperback distribution</li>
                                        <li>E-Book Placement</li>
                                        <li>Kindle Promotion</li>
                                        <li>Social Media Promotion (Post Publishing)</li>
                                        <li>Book Reviews</li>
                                        <li>Author Copies</li>
                                        <li>Author Video</li>


                                    </ul>
                                    <p className='package-Price'>₹69999</p>
                                    <Popupcontactus />

                                </div>
                            </Card.Body>
                        </Card>
                    </div></Col>


                    <Col className='packagecol3'><div className='packagepage-card' >
                        <Card >
                            <Card.Body>
                                <div className=''>
                                    <p className='package-title'>Exclusives</p>


                                    <p className='packagepage-subtitle'>Elite services including developmental editing,
                                        Proofreading & Copy editing, marketing support, Print
                                        media promotions and etc for seasoned authors.</p>

                                    <ul className='package-features'>


                                        <li>Personal Publishing Manager</li>
                                        <li>Proff Reading (40k words)</li>
                                        <li>Copy Editing (15k words)</li>
                                        <li>Customized Cover Design</li>
                                        <li>International Paperback distribution</li>
                                        <li>E-book Placements</li>
                                        <li>Author Vedio on website</li>
                                        <li>Kindle Promotion</li>
                                        <li>Print media Promotion</li>
                                        <li>Social Media Promotion (Pre and Post Publishing)</li>

                                        <li>Marketing Plan suggestion</li>
                                        <li>Publishing Event Handling</li>


                                    </ul>
                                    <p className='package-Price'>₹118999</p>
                                    <Popupcontactus />

                                </div>
                            </Card.Body>
                        </Card>
                    </div></Col>


                </Row>

            </div>

        </div>
    )
}

export default Packagespage