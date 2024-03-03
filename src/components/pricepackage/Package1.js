import React from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import '../pricepackage/package.css'
const Package1 = () => {
    return (
        <div className='Package1'>

            <Row xs={1} md={2} lg={3} className="g-4 packageall">

                <Card className='level1-card'>
                    <Card.Body >
                        <div className='card-content'>
                            <p className='level1-title'>Starter</p>
                            <p className='level1-description'>with all your customers via all conversation channels in one central dashboard.</p>
                            <p className='level1-Price'>₹8,999</p>
                            <button className='level1-button'>Choose this plan</button>
                        </div>
                        <ul className='package-features'>
                            <li>Personal Publishing Manager</li>
                            <li>Standard Cover Design</li>
                            <li>Standard Interior Design</li>
                            <li>Online PaperBack Distribution (India)</li>
                            <li>E-Book Placement (Google) </li>
                            <li>Copy rights</li>
                            <li>ISBN + Bar Code</li>
                            <li>Author Dashboard</li>
                            <li>Post Publishing support</li>
                            <li>60% Royalty for Author</li>
                            <li><s>Kindle Placements</s></li>
                            <li><s>Author Copies</s></li>
                        </ul>

                    </Card.Body>
                </Card>


                <Card className='level1-card'>
                    <Card.Body>
                        <div className='card-content'>
                            <p className='level1-title'>Starter</p>
                            <p className='level1-description'>with all your customers via all conversation channels in one central dashboard.</p>
                            <p className='level1-Price'>₹12,999</p>
                            <button className='level1-button'>Choose this plan</button>

                            <ul className='package-features'>
                                <li>All service in previous</li>
                                <li>80% Royalty for Author</li>
                                <li>Author Copies & Certificate</li>
                                <li>E-Book (Google, Kindle)</li>
                                <li>Standard Cover Design</li>
                                <li>Interior Design </li>
                                <li>Online Paperback distribution</li>
                                <li>Publishing plan</li>
                                <li>Digital Proof</li>
                                <li><s>Premium features</s></li>
                                <li><s>International Distribution</s></li>
                                
                            </ul>

                        </div>
                    </Card.Body>
                </Card>


                <Card className='level1-card'>
                    <Card.Body>
                        <div className='card-content'>
                            <p className='level1-title'>Starter</p>
                            <p className='level1-description'>with all your customers via all conversation channels in one central dashboard.</p>

                            <p className='level1-Price'>₹29,999</p>
                            <button className='level1-button'>Choose this plan</button>
                            <ul className='package-features'>
                            <li>All service in previous</li>
                                <li>100% Royalty for Author</li>
                                <li>Premium Cover Design</li>
                                <li>Premium Interior Design</li>
                                <li>International PaperBack Distribution</li>
                                <li>E-Book Placement (Google, Kindle, Kobo) </li>
                                <li>Author Copies 10</li>
                                <li>Amazon prime Placement</li>
                                <li>Kindle Promotion</li>
                                <li>Book Reviews</li>
                                <li>Free Author session</li>
                                <li>Beta Reading</li>

                            </ul>

                        </div>
                    </Card.Body>
                </Card>






            </Row>

        </div>
    )
}

export default Package1