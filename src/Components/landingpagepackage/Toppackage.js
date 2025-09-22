import React, { useRef, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import './basictopstyle.css'
import { Link } from 'react-router-dom';
import MediaQuery, { useMediaQuery } from "react-responsive";

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Popupcontactus from '../Popupcontactus';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import { IoInformationCircleOutline } from "react-icons/io5";

const Toppackage = () => {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })


    const CustomWidthTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))({
        [`& .${tooltipClasses.tooltip}`]: {
            maxWidth: 500,
        },
    });



    const longText = ``;

    return (
        <>
            {isDesktopOrLaptop &&
                <div className='Package2'>
                    <Row xs={1} md={2} lg={3} className="g-4  packageall">

                        <Card className='level1-card' data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                            <Card.Body className='package-card-body'>
                                <div className='flex-items'>

                                    <div className='card-content'>
                                        <p className='level1-title'>Elite </p>
                                        <p className='level1-description'>Advanced cover & Interior design, extensive marketing
                                            campaigns, early or post reviews, promotions and prime
                                            listing.</p>
                                        <p className='level1-Price'>₹49,999</p>


                                    </div>
                                    <ul className='package-features'>
                                        <li> All services in previous</li>
                                        <li><Tooltip title='3 Concepts and 3 Revisions once the concept is fixed.'>
                                            <IoInformationCircleOutline /> </Tooltip>Advanced Cover Design</li>
                                        <li><Tooltip title='3 Design and 3 Revision once the concept is fixed.'>
                                            <IoInformationCircleOutline /> </Tooltip>Advanced Interior formatting</li>
                                            <li><Tooltip title='15 reviews (Pre or Post Publishing).'>
                                            <IoInformationCircleOutline /> </Tooltip>Book Reviews</li>

                                        <li> International Distribution</li>

                                        <li>E-Book Placement</li>
                                        <li>Amazon A+ listing</li>
                                        <li>Amazon Prime</li>
                                        <li>Amazon Ads</li>
                                       
                                        <li>Kindle Promotions</li>


                                    </ul>
                                </div>
                                <div className='flex-items'>

                                    <Popupcontactus /></div>


                            </Card.Body>
                        </Card>

                        <Card className='level1-card' data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                            <Card.Body className='package-card-body'>
                                <div className='flex-items'>

                                    <div className='card-content'>
                                        <p className='level1-title'>Premium </p>
                                        <p className='level1-description'>Spot light package including Author interviews,
                                            Customised designs, proofreading or copy editing service,
                                            Review campaigns, and additional author copies.</p>
                                        <p className='level1-Price'>₹69,999</p>

                                        <ul className='package-features'>
                                            <li>All services in previous</li>

                                            {/* <li><Tooltip title={longText}>
                                                <IoInformationCircleOutline /> </Tooltip>Complimentry Services</li> */}

                                            <li><Tooltip title='3 Design and 6 Revision once the Concept is fixed.'>
                                                <IoInformationCircleOutline /> </Tooltip>Customized Cover Design</li>
                                            <li><Tooltip title='3 Designs and 5 Revisions pnce the Concept is fixed.'>
                                                <IoInformationCircleOutline /> </Tooltip>Customized Interior formatting</li>

                                            <li><Tooltip title='20 reviews (Pre or Post Publishing).'>
                                                <IoInformationCircleOutline /> </Tooltip>Book Reviews</li>

                                            <li><Tooltip title='3 Beta reviewer will be assigned and will share their opinion before publishing.'>
                                                <IoInformationCircleOutline /> </Tooltip>Beta Reading</li>

                                            <li><Tooltip title='Social media promotions for your book will be executed on Instagram, facebook, twitter, and a blog will be posted on Medium.'>
                                                <IoInformationCircleOutline /> </Tooltip>Social Media Promotion</li>

                                            <li><Tooltip title='20 Author copies (B/W or Colour)'>
                                                <IoInformationCircleOutline /> </Tooltip>Author Copies</li>
                                            <li> Proof Reading</li>
                                            <li> Author Video</li><br />

                                            <li className='package-authorwebsite'><Tooltip title='A dedicated website will be provided, within the package cost.'>
                                                <IoInformationCircleOutline /> </Tooltip>Exclusive: <br />Author Website</li>
                                            {/* <li>Book Reviews</li>
                                            <li>E-Book Placement</li>
                                            <li>Kindle Promotion</li>
                                            <li>International Distribution</li> */}


                                        </ul>
                                    </div>
                                </div>
                                <div className='flex-items'>

                                    <Popupcontactus /></div>


                            </Card.Body>
                        </Card>


                        <Card className='level1-card' data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                            <Card.Body className='package-card-body'>
                                <div className='flex-items'>

                                    <div className='card-content'>
                                        <p className='level1-title'>Exclusive </p>
                                        <p className='level1-description'>Elite services including developmental editing,
                                            Proofreading & Copy editing, marketing support, Print
                                            media promotions and etc for seasoned authors.</p>
                                        <p className='level1-Price'>₹1,19,999</p>



                                        <ul className='package-features'>


                                            <li><Tooltip title='3 Design and Unlimited revisions once the Concept is fixed'>
                                                <IoInformationCircleOutline /> </Tooltip>Customized Cover Design</li>

                                            <li><Tooltip title='3 Design and Unlimited revisions once the Concept is fixed'>
                                                <IoInformationCircleOutline /> </Tooltip>Customized Interior formatting</li>

                                            <li><Tooltip title='2 Proof readers will be assigned (Pre Publishing)'>
                                                <IoInformationCircleOutline /> </Tooltip>Proof Reading</li>
                                            <li><Tooltip title='Social media Promotions for your book will be executed on Instagram, facebook, twitter, and a blog will be posted on Medium.'>
                                                <IoInformationCircleOutline /> </Tooltip>Social Media Promotion</li>


                                            <li><Tooltip title='5 Beta reviewer will be assigned and will share their opinion before publishing.'>
                                                <IoInformationCircleOutline /> </Tooltip>Beta Reading</li>
                                            <li><Tooltip title='20 Author copies (B/W or Colour)'>
                                                <IoInformationCircleOutline /> </Tooltip>Author Copies</li>
                                                <li><Tooltip title='30 reviews (Pre or Post Publishing).'>
                                                <IoInformationCircleOutline /> </Tooltip>Book Reviews</li>

                                            <li>Personal Publishing Manager</li>
                                            <li>International Distribution</li>
                                            <li>Copy Editing</li>
                                            <li>Author Website</li>
                                            <li>Author Video</li>
                                            <li>Kindle Promotion</li>
                                            <li>E-book Placements</li>
                                            <li>Print media Promotion</li>
                                            <li>Marketing Plan suggestion</li>
                                            <li>Publishing Event Handling</li>

                                        </ul>
                                    </div>

                                    <div className='flex-items'>

                                        <Popupcontactus /></div>

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
                                <Card.Body className='package-card-body'>
                                    <div className='flex-items'>
                                        <div className='card-content'>
                                            <p className='level1-title'>Elite</p>
                                            {/* <p className='level1-description'>Advanced cover & Interior design, extensive marketing
                                            campaigns, early or post reviews, promotions and prime
                                            listing..</p> */}
                                            <p className='level1-Price'>₹49,999</p>

                                        </div>


                                        <ul className='package-features'>
                                            <li> All services in previous</li>
                                            <li><Tooltip title='3 Concepts and 3 Revisions once the concept is fixed.'>
                                                <IoInformationCircleOutline /> </Tooltip>Advanced Cover Design</li>
                                            <li><Tooltip title='3 Design and 3 Revision once the concept is fixed.'>
                                                <IoInformationCircleOutline /> </Tooltip>Advanced Interior formatting</li>
                                                
                                                <li><Tooltip title='15 reviews (Pre or Post Publishing).'>
                                            <IoInformationCircleOutline /> </Tooltip>Book Reviews</li>

                                            <li> International Distribution</li>

                                            <li>E-Book Placement</li>
                                            <li>Amazon A+ listing</li>
                                            <li>Amazon Prime</li>
                                            <li>Amazon Ads</li>
                                            
                                            <li>Kindle Promotions</li>


                                        </ul>
                                    </div>
                                    <div className='flex-items'>
                                        <Popupcontactus /></div>


                                </Card.Body>
                            </Card> </SwiperSlide>

                            <SwiperSlide>  <Card className='level1-card'>
                                <Card.Body className='package-card-body'>
                                    <div className='flex-items'>
                                        <div className='card-content'>
                                            <p className='level1-title'>Premium</p>
                                            {/* <p className='level1-description'>Spot light package including Author interviews,
                                            Customised designs, proofreading or copy editing sercice,
                                            Review campaigns, and additional author copies</p> */}
                                            <p className='level1-Price'>₹69,999</p>

                                        </div>

                                        <ul className='package-features'>
                                            <li>All services in previous</li>

                                            {/* <li><Tooltip title={longText}>
    <IoInformationCircleOutline /> </Tooltip>Complimentry Services</li> */}

                                            <li><Tooltip title='3 Design and 6 Revision once the Concept is fixed.'>
                                                <IoInformationCircleOutline /> </Tooltip>Customized Cover Design</li>
                                            <li><Tooltip title='3 Designs and 5 Revisions pnce the Concept is fixed.'>
                                                <IoInformationCircleOutline /> </Tooltip>Customized Interior formatting</li>

                                            <li><Tooltip title='20 reviews (Pre or Post Publishing).'>
                                                <IoInformationCircleOutline /> </Tooltip>Book Reviews</li>

                                            <li><Tooltip title='3 Beta reviewer will be assigned and will share their opinion before publishing.'>
                                                <IoInformationCircleOutline /> </Tooltip>Beta Reading</li>

                                            <li><Tooltip title='Social media promotions for your book will be executed on Instagram, facebook, twitter, and a blog will be posted on Medium.'>
                                                <IoInformationCircleOutline /> </Tooltip>Social Media Promotion</li>

                                            <li><Tooltip title='20 Author copies (B/W or Colour)'>
                                                <IoInformationCircleOutline /> </Tooltip>Author Copies</li>
                                            <li> Proof Reading</li>
                                            <li> Author Video</li><br />

                                            <li className='package-authorwebsite'><Tooltip title='A dedicated website will be provided, within the package cost.'>
                                                <IoInformationCircleOutline /> </Tooltip>Exclusive: <br />Author Website</li>
                                            {/* <li>Book Reviews</li>
                                            <li>E-Book Placement</li>
                                            <li>Kindle Promotion</li>
                                            <li>International Distribution</li> */}


                                        </ul>
                                    </div>
                                    <div className='flex-items'>
                                        <Popupcontactus /></div>



                                </Card.Body>
                            </Card> </SwiperSlide>


                            <SwiperSlide> <Card className='level1-card'>
                                <Card.Body className='card-content'>
                                    <div className='flex-items'>
                                        <div className='card-content'>
                                            <p className='level1-title'>Exclusive</p>
                                            {/* <p className='level1-description'>Elite services including developmental editing,
                                            Proofreading & Copy editing, marketing support, Print
                                            media promotions and etc for seasoned authors.</p> */}
                                            <p className='level1-Price'>₹1,19,999</p>


                                        </div>

                                        <ul className='package-features'>
                                            <li><Tooltip title='3 Design and Unlimited revisions once the Concept is fixed'>
                                                <IoInformationCircleOutline /> </Tooltip>Customized Cover Design</li>

                                            <li><Tooltip title='3 Design and Unlimited revisions once the Concept is fixed'>
                                                <IoInformationCircleOutline /> </Tooltip>Customized Interior formatting</li>

                                            <li><Tooltip title='2 Proof readers will be assigned (Pre Publishing)'>
                                                <IoInformationCircleOutline /> </Tooltip>Proof Reading</li>
                                            <li><Tooltip title='Social media Promotions for your book will be executed on Instagram, facebook, twitter, and a blog will be posted on Medium.'>
                                                <IoInformationCircleOutline /> </Tooltip>Social Media Promotion</li>


                                            <li><Tooltip title='5 Beta reviewer will be assigned and will share their opinion before publishing.'>
                                                <IoInformationCircleOutline /> </Tooltip>Beta Reading</li>
                                            <li><Tooltip title='20 Author copies (B/W or Colour)'>
                                                <IoInformationCircleOutline /> </Tooltip>Author Copies</li>
                                                <li><Tooltip title='30 reviews (Pre or Post Publishing).'>
                                                <IoInformationCircleOutline /> </Tooltip>Book Reviews</li>
                                            <li>Personal Publishing Manager</li>
                                            <li>International Distribution</li>
                                            <li>Copy Editing</li>
                                            <li>Author Website</li>
                                            <li>Author Video</li>
                                            <li>Kindle Promotion</li>
                                            <li>E-book Placements</li>
                                            <li>Print media Promotion</li>
                                            <li>Marketing Plan suggestion</li>
                                            <li>Publishing Event Handling</li>


                                        </ul>
                                    </div>
                                    <div className='flex-items'>
                                        <Popupcontactus /></div>


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

export default Toppackage