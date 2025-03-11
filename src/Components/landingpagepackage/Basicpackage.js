import React from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import './basictopstyle.css'
// import Popupcontactus from '../popup/Popupcontactus';
// import { Link } from 'react-router-dom';
import MediaQuery, { useMediaQuery } from "react-responsive";

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Popupcontactus from '../Popupcontactus';

<<<<<<< HEAD
const Basicpackage = () => {
=======
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import { IoInformationCircleOutline } from "react-icons/io5";


const Basicpackage = () => {


    const CustomWidthTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))({
        [`& .${tooltipClasses.tooltip}`]: {
            maxWidth: 500,
        },
    });



    const longText = ``;

>>>>>>> a3e2fa8 (updates)
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })
    return (
        <div className='Basicpackage'>

            {isDesktopOrLaptop &&

                <div className='Package1' >
<<<<<<< HEAD
                    <Row xs={1} md={2} lg={3} className="g-4 packageall">
                        <Card className='level1-card' data-aos="flip-left" >
                            <Card.Body >
                                <div className='card-content'>
                                    <p className='level1-title'>Essential </p>
                                    <p className='level1-Price'>₹8,999</p>
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
                                <Popupcontactus/>
                                {/* <button className='seeallpackages'>Choose</button> */}
                                </Card.Body>
                        </Card>

                        <Card className='level1-card' data-aos="flip-left" >
                            <Card.Body>
                                <div className='card-content'>
                                    <p className='level1-title'>Standard </p>
                                    <p className='level1-Price'>₹12,999</p>

                                    <ul className='package-features'>
                                    <li>All services in previous</li>
                                            <li>80% Royalty for Author</li>
                                            <li>Author Copies & Certificate</li>
                                            <li>E-Book (Google, Kindle)</li>
                                            <li>Standard cover design</li>
                                            <li>Interior Design</li>
                                            <li>Online Paperback distribution (India)</li>
                                            <li>Publishing Plan</li>
                                            <li>Digital Proof</li>
                                    </ul>
                                    <Popupcontactus/>
                                  {/* <button className='seeallpackages'>See all Features</button> */}
=======
                    <Row xs={1} md={2} lg={3} className="g-4 packageall" >
                        <Card className='level1-card' data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000" >
                            <Card.Body className='package-card-body' >
                                <div className='flex-items'>
                                    <div className='card-content'>
                                        <p className='level1-title'>Essential </p>
                                        <p className='level1-Price'>₹8,999</p>
                                    </div>
                                    <ul className='package-features'>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Personal Manager</li>

                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Standard Cover Design</li>

                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Standard Interior Design</li>

                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Online Distribution</li>
                                            
                                        <li>
                                            <Tooltip title={longText}>
                                                <IoInformationCircleOutline /> </Tooltip>
                                            E-Book Placement</li>
                                        <li>Copy Rights + ISBN </li>
                                        <li>100% Royalty for Author</li>
                                        <li>Post Publishing Support </li>

                                    </ul>
                                </div>
                                <div className='flex-items'>
                                    <Popupcontactus /></div>
                            </Card.Body>
                        </Card>

                        <Card className='level1-card' data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000" >
                            <Card.Body className='package-card-body'>
                                <div className='flex-items'>

                                    <div className='card-content'>
                                        <p className='level1-title'>Standard </p>
                                        <p className='level1-Price'>₹12,999</p>
                                    </div>

                                    <ul className='package-features'>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>All services in previous</li>


                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Kindle E-Book Placements</li>

                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Author Copies</li>

                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Author Certificate</li>



                                    </ul>
                                </div>
                                <div className='flex-items'>

                                    <Popupcontactus />
>>>>>>> a3e2fa8 (updates)

                                </div>
                            </Card.Body>
                        </Card>

<<<<<<< HEAD
                        <Card className='level1-card' data-aos="flip-left">
                            <Card.Body>
                                <div className='card-content'>
                                    <p className='level1-title'>Advanced</p>
                                    <p className='level1-Price'>₹29,999</p>

                                    <ul className='package-features'>
                                    <li>All services in previous</li>
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
                                    <Popupcontactus/>
=======
                        <Card className='level1-card' data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                            <Card.Body className='package-card-body'>

                                <div className='flex-items'>

                                    <div className='card-content'>
                                        <p className='level1-title'>Advanced</p>
                                        <p className='level1-Price'>₹29,999</p>
                                    </div>
                                    <ul className='package-features'>
                                        <li>All services in previous</li>
                                        <li>100% Royalty for Author</li>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Premium Cover Design</li>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Premium Interior Design</li>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>International Distribution</li>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>E-Book Placements</li>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Author copies</li>


                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Book Reviews</li>

                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Beta Reading</li>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Kindle Promotion</li>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Free Author Session</li>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Amazon Prime Placement</li>
                                    </ul>
                                </div>
                                <div className='flex-items'>

                                    <Popupcontactus />
>>>>>>> a3e2fa8 (updates)
                                    {/* <button className='seeallpackages'>See all Features</button> */}
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
                                            <p className='level1-title'>Essential</p>
                                            <p className='level1-Price'>₹8,999</p>

                                        </div>
                                        <ul className='package-features'>
<<<<<<< HEAD
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
                                        <Popupcontactus/>
=======
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
                                        <Popupcontactus />
>>>>>>> a3e2fa8 (updates)
                                        {/* <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link> */}
                                    </Card.Body>
                                </Card></SwiperSlide>

                            <SwiperSlide>
                                <Card className='level1-card' >
                                    <Card.Body>
                                        <div className='card-content'>
                                            <p className='level1-title'>Standard</p>
                                            <p className='level1-Price'>₹12,999</p>

                                            <ul className='package-features'>
<<<<<<< HEAD
                                            <li>All services in previous</li>
                                            <li>80% Royalty for Author</li>
                                            <li>Author Copies & Certificate</li>
                                            <li>E-Book (Google, Kindle)</li>
                                            <li>Standard cover design</li>
                                            <li>Interior Design</li>
                                            <li>Online Paperback distribution (India)</li>
                                            <li>Publishing Plan</li>
                                            <li>Digital Proof</li>

                                            </ul>
                                            <Popupcontactus/>
=======
                                                <li>All services in previous</li>
                                                <li>80% Royalty for Author</li>
                                                <li>Author Copies & Certificate</li>
                                                <li>E-Book (Google, Kindle)</li>
                                                <li>Standard cover design</li>
                                                <li>Interior Design</li>
                                                <li>Online Paperback distribution (India)</li>
                                                <li>Publishing Plan</li>
                                                <li>Digital Proof</li>

                                            </ul>
                                            <Popupcontactus />
>>>>>>> a3e2fa8 (updates)
                                            {/* <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link> */}


                                        </div>
                                    </Card.Body>
                                </Card></SwiperSlide>

                            <SwiperSlide>
                                <Card className='level1-card' >
                                    <Card.Body>
                                        <div className='card-content'>
                                            <p className='level1-title'>Advanced</p>


                                            <p className='level1-Price'>₹29,999</p>


                                            <ul className='package-features'>
<<<<<<< HEAD
                                            <li>All services in previous</li>
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
                                            <Popupcontactus/>
=======
                                                <li>All services in previous</li>
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
                                            <Popupcontactus />
>>>>>>> a3e2fa8 (updates)
                                            {/* <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link> */}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </SwiperSlide>


                        </Row>
                    </div>


                </Swiper>

            }


        </div>
    )
}

export default Basicpackage