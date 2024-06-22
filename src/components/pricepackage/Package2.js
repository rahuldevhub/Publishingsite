import React from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import '../pricepackage/package.css'

const Package2 = () => {
    return (
        <div className='Package2'>



            <Row xs={1} md={2} lg={3} className="g-4  packageall">

                <Card className='level1-card'>
                    <Card.Body >
                        <div className='card-content'>
                            <p className='level1-title'>Package 4</p>
                            <p className='level1-description'>Advanced cover & Interior design, extensive marketing
campaigns, early or post reviews, promotions and prime
listing..</p>
                            <p className='level1-Price'>₹49,999</p>
                            <button className='level1-button'>Choose this plan</button>
                        </div>
                        <ul className='package-features'>
                            <li>All service in previous</li>

                            <li>Advance Cover Design</li>
                            <li>Advance Interior Design</li>
                            <li>International PaperBack Distribution (India)</li>
                            <li>E-Book Placement</li>
                            <li>Amazon A+ listing</li>
                            {/* <li>Amazon prime</li>
                            <li>Author Dashboard</li>
                            <li>Amazon Ads</li>
                            <li>Kindle Promotions</li>
                            <li>Book Reviews</li>
                            <li><s>Social Media Promotions</s></li>
                            <li><s>Free proff reading or copy editing</s></li>
                            <li><s>Author video</s></li> */}
                        </ul>
                        <button className='seeallpackages'>See all Features</button>

                    </Card.Body>
                </Card>

                <Card className='level1-card'>
                    <Card.Body>
                        <div className='card-content'>
                            <p className='level1-title'>Package 5</p>
                            <p className='level1-description'>Spot light package including Author interviews,
Customised designs, proofreading or copy editing sercice,
Review campaigns, and additional author copies</p>
                            <p className='level1-Price'>₹69,999</p>
                            <button className='level1-button'>Choose this plan</button>

                            <ul className='package-features'>
                                <li>All service in previous</li>
                                <li>Complimentry Proof reading or Copy editing</li>
                                <li>Customized Cover Design</li>
                                <li>Advance interior Design</li>
                                <li>International Paperback distribution</li>
                                {/* <li>E-book Placements</li>
                                <li>Kindle Promotion</li>
                                <li>Social media Promotion</li>
                                <li>Book Reviews</li>
                                <li>Author copies 15</li>
                                <li>Author video</li> */}
                            </ul>
                            <button className='seeallpackages'>See all Features</button>

                        </div>
                    </Card.Body>
                </Card>


                <Card className='level1-card'>
                    <Card.Body>
                        <div className='card-content'>
                            <p className='level1-title'>Package 6</p>
                            <p className='level1-description'>Elite services including developmental editing,
Proofreading & Copy editing, marketing support, Print
media promotions and etc for seasoned authors.</p>
                            <p className='level1-Price'>₹1,18,999</p>
                            <button className='level1-button'>Choose this plan</button>

                            <ul className='package-features'>
                                <li>Personal Publishing Manager</li>
                                <li>Proff Reading (40k words)</li>
                                <li>Copy Editing (15k words)</li>
                                <li>Customized Cover Design</li>
                                <li>International Paperback distribution</li>
                                <li>E-book Placements</li>
                                <li>Author Vedio on website</li>
                                {/* <li>Kindle Promotion</li>

                                <li>Print Media Promotion</li>
                                <li>Social Media Promotion</li>
                                <li>Marketing Plan Suggestion</li>
                                <li>Publishing Event Handling</li> */}

                            </ul>
                            <button className='seeallpackages'>See all Features</button>

                        </div>
                    </Card.Body>
                </Card>


            </Row>






        </div>
    )
}

export default Package2