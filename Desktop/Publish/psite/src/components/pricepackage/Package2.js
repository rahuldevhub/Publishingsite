import React, { useRef, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import '../pricepackage/package.css'
import Popupcontactus from '../popup/Popupcontactus';
import { Link } from 'react-router-dom';
import MediaQuery, { useMediaQuery } from "react-responsive";

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const Package2 = () => {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })
    return (
        <>
            {isDesktopOrLaptop &&
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

                                    <Popupcontactus />

                                </div>
                                <ul className='package-features'>
                                    <li>All service in previous</li>
                                    <li>Advance Cover Design</li>
                                    <li>Advance Interior Design</li>
                                    <li>International PaperBack Distribution (India)</li>
                                    <li>E-Book Placement</li>
                                    <li>Amazon A+ listing</li>

                                </ul>
                                <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link>


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

                                    <Popupcontactus />


                                    <ul className='package-features'>
                                        <li>All service in previous</li>
                                        <li>Complimentry Proof reading or Copy editing</li>
                                        <li>Customized Cover Design</li>
                                        <li>Advance interior Design</li>
                                        <li>International Paperback distribution</li>

                                    </ul>
                                    <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link>

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

                                    <Popupcontactus />


                                    <ul className='package-features'>
                                        <li>Personal Publishing Manager</li>
                                        <li>Proff Reading (40k words)</li>
                                        <li>Copy Editing (15k words)</li>
                                        <li>Customized Cover Design</li>
                                        <li>International Paperback distribution</li>
                                        <li>E-book Placements</li>
                                        <li>Author Vedio on website</li>

                                    </ul>

                                    <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link>

                                </div>
                            </Card.Body>
                        </Card>


                    </Row>
                </div>
            }

            {isTaborMobile &&

                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >

                    <div className='Package2'>
                        <Row xs={1} md={2} lg={3} className="g-4  packageall">

                            <SwiperSlide> <Card className='level1-card'>
                                <Card.Body >
                                    <div className='card-content'>
                                        <p className='level1-title'>Package 4</p>
                                        <p className='level1-description'>Advanced cover & Interior design, extensive marketing
                                            campaigns, early or post reviews, promotions and prime
                                            listing..</p>
                                        <p className='level1-Price'>₹49,999</p>

                                        <Popupcontactus />

                                    </div>
                                    <ul className='package-features'>
                                        <li>All service in previous</li>
                                        <li>Advance Cover Design</li>
                                        <li>Advance Interior Design</li>
                                        <li>International PaperBack Distribution (India)</li>
                                        <li>E-Book Placement</li>
                                        <li>Amazon A+ listing</li>

                                    </ul>
                                    <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link>


                                </Card.Body>
                            </Card> </SwiperSlide>

                            <SwiperSlide>  <Card className='level1-card'>
                                <Card.Body>
                                    <div className='card-content'>
                                        <p className='level1-title'>Package 5</p>
                                        <p className='level1-description'>Spot light package including Author interviews,
                                            Customised designs, proofreading or copy editing sercice,
                                            Review campaigns, and additional author copies</p>
                                        <p className='level1-Price'>₹69,999</p>

                                        <Popupcontactus />


                                        <ul className='package-features'>
                                            <li>All service in previous</li>
                                            <li>Complimentry Proof reading or Copy editing</li>
                                            <li>Customized Cover Design</li>
                                            <li>Advance interior Design</li>
                                            <li>International Paperback distribution</li>

                                        </ul>
                                        <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link>

                                    </div>
                                </Card.Body>
                            </Card> </SwiperSlide>


                            <SwiperSlide> <Card className='level1-card'>
                                <Card.Body>
                                    <div className='card-content'>
                                        <p className='level1-title'>Package 6</p>
                                        <p className='level1-description'>Elite services including developmental editing,
                                            Proofreading & Copy editing, marketing support, Print
                                            media promotions and etc for seasoned authors.</p>
                                        <p className='level1-Price'>₹1,18,999</p>

                                        <Popupcontactus />


                                        <ul className='package-features'>
                                            <li>Personal Publishing Manager</li>
                                            <li>Proff Reading (40k words)</li>
                                            <li>Copy Editing (15k words)</li>
                                            <li>Customized Cover Design</li>
                                            <li>International Paperback distribution</li>
                                            <li>E-book Placements</li>
                                            <li>Author Vedio on website</li>

                                        </ul>

                                        <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link>

                                    </div>
                                </Card.Body>
                            </Card>
                            </SwiperSlide>

                        </Row>
                    </div>
                </Swiper>
            }
        </>




    )
}

export default Package2