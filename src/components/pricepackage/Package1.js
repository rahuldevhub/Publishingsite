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

const Package1 = () => {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })
    return (
        <>
            {isDesktopOrLaptop &&

                <div className='Package1'>
                    <Row xs={1} md={2} lg={3} className="g-4 packageall">
                        <Card className='level1-card' >
                            <Card.Body >
                                <div className='card-content'>
                                    <p className='level1-title'>Package 1</p>
                                    <p className='level1-description'>Essential services with standard cover and interior designs,and eBook formatting for budding authors /Online distribution in India stores.</p>
                                    <p className='level1-Price'>₹8,999</p>
                                    <Popupcontactus />
                                </div>
                                <ul className='package-features'>
                                    <li>Personal Publishing Manager</li>
                                    <li>Standard Cover Design</li>
                                    <li>Standard Interior Design</li>
                                    <li>Online PaperBack Distribution (India)</li>
                                    <li>E-Book Placement (Google) </li>
                                </ul>
                                <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link>
                            </Card.Body>
                        </Card>

                        <Card className='level1-card' >
                            <Card.Body>
                                <div className='card-content'>
                                    <p className='level1-title'>Package 2</p>
                                    <p className='level1-description'>Comprehensive support for aspiring authors with free Author copies, certificate, and and eBook placement on Google and Kobo /Online distribution in India</p>
                                    <p className='level1-Price'>₹12,999</p>
                                    <Popupcontactus />
                                    <ul className='package-features'>
                                        <li>All service in previous</li>
                                        <li>80% Royalty for Author</li>
                                        <li>Author Copies & Certificate</li>
                                        <li>E-Book (Google, Kindle)</li>
                                        <li>Online Paperback distribution</li>

                                    </ul>
                                    <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link>


                                </div>
                            </Card.Body>
                        </Card>

                        <Card className='level1-card' >
                            <Card.Body>
                                <div className='card-content'>
                                    <p className='level1-title'>Package 3</p>
                                    <p className='level1-description'>All-inclusive package with International Distribution
                                        premium cover and interior design, Prime placement,
                                        promotions, and free author session for ambitious authors</p>

                                    <p className='level1-Price'>₹29,999</p>
                                    <Popupcontactus />

                                    <ul className='package-features'>
                                        <li>All service in previous</li>
                                        <li>100% Royalty for Author</li>
                                        <li>Premium Cover Design</li>
                                        <li>Premium Interior Design</li>
                                        <li>International PaperBack Distribution</li>
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


                    <div className='Package1'>
                        <Row xs={1} md={2} lg={3} className="g-4 packageall">

                            <SwiperSlide>
                                <Card className='level1-card' >
                                    <Card.Body >
                                        <div className='card-content'>
                                            <p className='level1-title'>Package 1</p>
                                            <p className='level1-description'>Essential services with standard cover and interior designs,and eBook formatting for budding authors /Online distribution in India stores.</p>
                                            <p className='level1-Price'>₹8,999</p>
                                            <Popupcontactus />
                                        </div>
                                        <ul className='package-features'>
                                            <li>Personal Publishing Manager</li>
                                            <li>Standard Cover Design</li>
                                            <li>Standard Interior Design</li>
                                            <li>Online PaperBack Distribution (India)</li>
                                            <li>E-Book Placement (Google) </li>
                                        </ul>
                                        <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link>
                                    </Card.Body>
                                </Card></SwiperSlide>

                            <SwiperSlide>
                                <Card className='level1-card' >
                                    <Card.Body>
                                        <div className='card-content'>
                                            <p className='level1-title'>Package 2</p>
                                            <p className='level1-description'>Comprehensive support for aspiring authors with free Author copies, certificate, and and eBook placement on Google and Kobo /Online distribution in India</p>
                                            <p className='level1-Price'>₹12,999</p>
                                            <Popupcontactus />
                                            <ul className='package-features'>
                                                <li>All service in previous</li>
                                                <li>80% Royalty for Author</li>
                                                <li>Author Copies & Certificate</li>
                                                <li>E-Book (Google, Kindle)</li>
                                                <li>Online Paperback distribution</li>

                                            </ul>
                                            <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link>


                                        </div>
                                    </Card.Body>
                                </Card></SwiperSlide>

                            <SwiperSlide>
                                <Card className='level1-card' >
                                    <Card.Body>
                                        <div className='card-content'>
                                            <p className='level1-title'>Package 3</p>
                                            <p className='level1-description'>All-inclusive package with International Distribution
                                                premium cover and interior design, Prime placement,
                                                promotions, and free author session for ambitious authors</p>

                                            <p className='level1-Price'>₹29,999</p>
                                            <Popupcontactus />

                                            <ul className='package-features'>
                                                <li>All service in previous</li>
                                                <li>100% Royalty for Author</li>
                                                <li>Premium Cover Design</li>
                                                <li>Premium Interior Design</li>
                                                <li>International PaperBack Distribution</li>
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

export default Package1