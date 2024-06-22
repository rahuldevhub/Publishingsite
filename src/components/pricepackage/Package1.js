import React from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import '../pricepackage/package.css'
import Popupcontactus from '../popup/Popupcontactus';
// import { MdInfo } from "react-icons/md";
// <MdInfo />
const Package1 = () => {
    return (
        <div className='Package1'>

            <Row xs={1} md={2} lg={3} className="g-4 packageall">

                <Card className='level1-card'>
                    <Card.Body >
                        <div className='card-content'>
                            <p className='level1-title'>Package 1</p>
                            <p className='level1-description'>Essential services with standard cover and interior designs,
and eBook formatting for budding authors /Online
distribution in India stores.</p>
                            <p className='level1-Price'>₹8,999</p>
                            <Popupcontactus/>
                            {/* <button className='level1-button'>Choose this plan</button> */}
                        </div>
                        <ul className='package-features'>
                            
                            <li>Personal Publishing Manager</li>
                            <li>Standard Cover Design</li>
                            <li>Standard Interior Design</li>
                            <li>Online PaperBack Distribution (India)</li>
                            <li>E-Book Placement (Google) </li>
                            {/* <li>Copy rights</li>
                            <li>ISBN + Bar Code</li>
                            <li>Author Dashboard</li>
                            <li>Post Publishing support</li>
                            <li>60% Royalty for Author</li>
                            <li><s>Kindle Placements</s></li>
                            <li><s>Author Copies</s></li> */}
                        </ul>
                        <button className='seeallpackages'>See all Features</button>

                    </Card.Body>
                </Card>


                <Card className='level1-card'>
                    <Card.Body>
                        <div className='card-content'>
                            <p className='level1-title'>Package 2</p>
                            <p className='level1-description'>Comprehensive support for aspiring authors with free
Author copies, certificate, and and eBook placement on
Google and Kobo /Online distribution in India</p>
                            <p className='level1-Price'>₹12,999</p>
                            <Popupcontactus/>


                            <ul className='package-features'>
                                <li>All service in previous</li>
                                <li>80% Royalty for Author</li>
                                <li>Author Copies & Certificate</li>
                                <li>E-Book (Google, Kindle)</li>
                                <li>Online Paperback distribution</li>

                                {/* <li>Standard Cover Design</li> */}
                                {/* <li>Interior Design </li>
                                <li>Publishing plan</li>
                                <li>Digital Proof</li>
                                <li><s>Premium features</s></li>
                                <li><s>International Distribution</s></li> */}
                                
                            </ul>
                            <button className='seeallpackages'>See all Features</button>

                        </div>
                    </Card.Body>
                </Card>


                <Card className='level1-card'>
                    <Card.Body>
                        <div className='card-content'>
                            <p className='level1-title'>Package 3</p>
                            <p className='level1-description'>All-inclusive package with International Distribution
premium cover and interior design, Prime placement,
promotions, and free author session for ambitious authors</p>

                            <p className='level1-Price'>₹29,999</p>
                            <Popupcontactus/>

                            <ul className='package-features'>
                            <li>All service in previous</li>
                                <li>100% Royalty for Author</li>
                                <li>Premium Cover Design</li>
                                <li>Premium Interior Design</li>
                                <li>International PaperBack Distribution</li>
                                {/* <li>E-Book Placement (Google, Kindle, Kobo) </li>
                                <li>Author Copies 10</li>
                                <li>Amazon prime Placement</li>
                                <li>Kindle Promotion</li>
                                <li>Book Reviews</li>
                                <li>Free Author session</li>
                                <li>Beta Reading</li> */}
                            </ul>
                            <button className='seeallpackages'>See all Features</button>

                        </div>
                    </Card.Body>
                </Card>






            </Row>

        </div>
    )
}

export default Package1