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
<<<<<<< HEAD
const Toppackage = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
  const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })
  return (
    <>
=======

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
>>>>>>> a3e2fa8 (updates)
            {isDesktopOrLaptop &&
                <div className='Package2'>
                    <Row xs={1} md={2} lg={3} className="g-4  packageall">

<<<<<<< HEAD
                        <Card className='level1-card' data-aos="flip-left">
                            <Card.Body >
                                <div className='card-content'>
                                    <p className='level1-title'>Elite </p>
                                    {/* <p className='level1-description'>Advanced cover & Interior design, extensive marketing
                                        campaigns, early or post reviews, promotions and prime
                                        listing..</p> */}
                                    <p className='level1-Price'>₹49,999</p>


                                </div>
                                <ul className='package-features'>
                                <li>All services in previous</li>
                                    <li>Advanced Cover Design</li>
                                    <li>Advanced Interior Design</li>
                                    <li>International PaperBack Distribution</li>
                                    <li>E-Book Placement</li>
                                    <li>Amazon A+ listing</li>
                                    <li>Amazon Prime (6 Mon)</li>
                                    <li>Amazon Ads (3 Mon)</li>
                                    <li>Kindle Promotions</li>
                                    <li>Book Reviews</li>

                                </ul>
                                <Popupcontactus/>
                                {/* <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link> */}
=======
                        <Card className='level1-card' data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                            <Card.Body className='package-card-body'>
                                <div className='flex-items'>

                                    <div className='card-content'>
                                        <p className='level1-title'>Elite </p>
                                        <p className='level1-description'>Advanced cover & Interior design, extensive marketing
                                            campaigns, early or post reviews, promotions and prime
                                            listing..</p>
                                        <p className='level1-Price'>₹49,999</p>


                                    </div>
                                    <ul className='package-features'>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>All services in previous</li>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Advanced Cover Design</li>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Advanced Interior Design</li>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>International Distribution</li>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>E-Book Placement</li>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Amazon A+ listing</li>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Amazon Prime</li>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Amazon Ads</li>
                                            <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Book Reviews</li>
                                        <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Kindle Promotions</li>
                                        

                                    </ul>
                                </div>
                                <div className='flex-items'>

                                    <Popupcontactus /></div>
>>>>>>> a3e2fa8 (updates)


                            </Card.Body>
                        </Card>

<<<<<<< HEAD
                        <Card className='level1-card' data-aos="flip-left">
                            <Card.Body>
                                <div className='card-content'>
                                    <p className='level1-title'>Premium </p>
                                    {/* <p className='level1-description'>Spot light package including Author interviews,
                                        Customised designs, proofreading or copy editing sercice,
                                        Review campaigns, and additional author copies</p> */}
                                    <p className='level1-Price'>₹69,999</p>

                                    {/* <Popupcontactus /> */}


                                    <ul className='package-features'>
                                    <li>All services in previous</li>
                                        <li>Complimentry Proof reading or Copy editing</li>
                                        <li>Customized Cover Design</li>
                                        <li>Advanced interior Design</li>
                                        <li>International Paperback distribution</li>
                                        <li>E-Book Placement</li>
                                        <li>Kindle Promotion</li>
                                        <li>Social Media Promotion (Post Publishing)</li>
                                        <li>Book Reviews</li>
                                        <li>Author Copies</li>
                                        <li>Author Video</li>

                                    </ul>
                                    <Popupcontactus/>
                                    {/* <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link> */}

                                </div>
=======
                        <Card className='level1-card' data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                            <Card.Body className='package-card-body'>
                                <div className='flex-items'>

                                    <div className='card-content'>
                                        <p className='level1-title'>Premium </p>
                                        <p className='level1-description'>Spot light package including Author interviews,
                                            Customised designs, proofreading or copy editing sercice,
                                            Review campaigns, and additional author copies</p>
                                        <p className='level1-Price'>₹69,999</p>

                                        <ul className='package-features'>
                                            <li>All services in previous</li>
                                            <li><Tooltip title={longText}>
                                                <IoInformationCircleOutline /> </Tooltip>Complimentry Services</li>
                                            <li><Tooltip title={longText}>
                                                <IoInformationCircleOutline /> </Tooltip>Customized Cover Design</li>
                                            {/* <li><Tooltip title={longText}>
                                                <IoInformationCircleOutline /> </Tooltip>Advanced interior Design</li> */}

                                            <li><Tooltip title={longText}>
                                                <IoInformationCircleOutline /> </Tooltip>Social Media Promotion</li>

                                            <li><Tooltip title={longText}>
                                                <IoInformationCircleOutline /> </Tooltip>Author Copies</li>
                                            <li><Tooltip title={longText}>
                                                <IoInformationCircleOutline /> </Tooltip>Author Video</li>
                                            {/* <li>Book Reviews</li>
                                            <li>E-Book Placement</li>
                                            <li>Kindle Promotion</li>
                                            <li>International Distribution</li> */}


                                        </ul>
                                    </div>
                                    </div>
                                    <div className='flex-items'>

                                        <Popupcontactus /></div>

                                
>>>>>>> a3e2fa8 (updates)
                            </Card.Body>
                        </Card>


<<<<<<< HEAD
                        <Card className='level1-card' data-aos="flip-left">
                            <Card.Body>
                                <div className='card-content'>
                                    <p className='level1-title'>Exclusive </p>
                                    {/* <p className='level1-description'>Elite services including developmental editing,
                                        Proofreading & Copy editing, marketing support, Print
                                        media promotions and etc for seasoned authors.</p> */}
                                    <p className='level1-Price'>₹1,19,999</p>

                                    {/* <Popupcontactus /> */}


                                    <ul className='package-features'>
                                    <li>Personal Publishing Manager</li>
                                        <li>Proof Reading (40k words)</li>
                                        <li>Copy Editing (15k words)</li>
                                        <li>Customized Cover Design</li>
                                        <li>International Paperback distribution</li>
                                        <li>E-book Placements</li>
                                        <li>Author Video on website</li>
                                        <li>Kindle Promotion</li>
                                        <li>Print media Promotion</li>
                                        <li>Social Media Promotion (Pre and Post Publishing)</li>
                                        <li>Marketing Plan suggestion</li>
                                        <li>Publishing Event Handling</li>

                                    </ul>
                                    <Popupcontactus/>
                                    {/* <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link> */}
=======
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
                                            <li>Personal Publishing Manager</li>
                                            <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>International Distribution</li>
                                            <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Customized Cover Design</li>
                                            <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Proof Reading</li>
                                            <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Copy Editing</li>
                                            <li><Tooltip title={longText}>

                                           

                                            <IoInformationCircleOutline /> </Tooltip>Author Video</li>
                                            <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Kindle Promotion</li>
                                            <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>E-book Placements</li>
                                            <li><Tooltip title={longText}>
                                           
                                            
                                            <IoInformationCircleOutline /> </Tooltip>Print media Promotion</li>
                                            <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Social Media Promotion</li>
                                            <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Marketing Plan suggestion</li>
                                            <li><Tooltip title={longText}>
                                            <IoInformationCircleOutline /> </Tooltip>Publishing Event Handling</li>

                                        </ul>
                                    </div>
                                    <div className='flex-items'>

                                        <Popupcontactus /></div>
>>>>>>> a3e2fa8 (updates)

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
                                        <p className='level1-title'>Elite</p>
                                        {/* <p className='level1-description'>Advanced cover & Interior design, extensive marketing
                                            campaigns, early or post reviews, promotions and prime
                                            listing..</p> */}
                                        <p className='level1-Price'>₹49,999</p>

                                        {/* <Popupcontactus /> */}

                                    </div>
                                    <ul className='package-features'>
<<<<<<< HEAD
                                    <li>All services in previous</li>
                                    <li>Advanced Cover Design</li>
                                    <li>Advanced Interior Design</li>
                                    <li>International PaperBack Distribution</li>
                                    <li>E-Book Placement</li>
                                    <li>Amazon A+ listing</li>
                                    <li>Amazon Prime (6 Mon)</li>
                                    <li>Amazon Ads (3 Mon)</li>
                                    <li>Kindle Promotions</li>
                                    <li>Book Reviews</li>


                                    </ul>
                                    <Popupcontactus/>
=======
                                        <li>All services in previous</li>
                                        <li>Advanced Cover Design</li>
                                        <li>Advanced Interior Design</li>
                                        <li>International PaperBack Distribution</li>
                                        <li>E-Book Placement</li>
                                        <li>Amazon A+ listing</li>
                                        <li>Amazon Prime (6 Mon)</li>
                                        <li>Amazon Ads (3 Mon)</li>
                                        <li>Kindle Promotions</li>
                                        <li>Book Reviews</li>


                                    </ul>
                                    <Popupcontactus />
>>>>>>> a3e2fa8 (updates)
                                    {/* <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link> */}


                                </Card.Body>
                            </Card> </SwiperSlide>

                            <SwiperSlide>  <Card className='level1-card'>
                                <Card.Body>
                                    <div className='card-content'>
                                        <p className='level1-title'>Premium</p>
                                        {/* <p className='level1-description'>Spot light package including Author interviews,
                                            Customised designs, proofreading or copy editing sercice,
                                            Review campaigns, and additional author copies</p> */}
                                        <p className='level1-Price'>₹69,999</p>

                                        {/* <Popupcontactus /> */}


                                        <ul className='package-features'>
<<<<<<< HEAD
                                        <li>All services in previous</li>
                                        <li>Complimentry Proof reading or Copy editing</li>
                                        <li>Customized Cover Design</li>
                                        <li>Advanced interior Design</li>
                                        <li>International Paperback distribution</li>
                                        <li>E-Book Placement</li>
                                        <li>Kindle Promotion</li>
                                        <li>Social Media Promotion (Post Publishing)</li>
                                        <li>Book Reviews</li>
                                        <li>Author Copies</li>
                                        <li>Author Video</li>

                                        </ul>
                                        <Popupcontactus/>
=======
                                            <li>All services in previous</li>
                                            <li>Complimentry Proof reading or Copy editing</li>
                                            <li>Customized Cover Design</li>
                                            <li>Advanced interior Design</li>
                                            <li>International Paperback distribution</li>
                                            <li>E-Book Placement</li>
                                            <li>Kindle Promotion</li>
                                            <li>Social Media Promotion (Post Publishing)</li>
                                            <li>Book Reviews</li>
                                            <li>Author Copies</li>
                                            <li>Author Video</li>

                                        </ul>
                                        <Popupcontactus />
>>>>>>> a3e2fa8 (updates)
                                        {/* <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link> */}

                                    </div>
                                </Card.Body>
                            </Card> </SwiperSlide>


                            <SwiperSlide> <Card className='level1-card'>
                                <Card.Body>
                                    <div className='card-content'>
                                        <p className='level1-title'>Exclusive</p>
                                        {/* <p className='level1-description'>Elite services including developmental editing,
                                            Proofreading & Copy editing, marketing support, Print
                                            media promotions and etc for seasoned authors.</p> */}
                                        <p className='level1-Price'>₹1,19,999</p>

                                        {/* <Popupcontactus /> */}


                                        <ul className='package-features'>
<<<<<<< HEAD
                                        <li>Personal Publishing Manager</li>
                                        <li>Proof Reading (40k words)</li>
                                        <li>Copy Editing (15k words)</li>
                                        <li>Customized Cover Design</li>
                                        <li>International Paperback distribution</li>
                                        <li>E-book Placements</li>
                                        <li>Author Video on website</li>
                                        <li>Kindle Promotion</li>
                                        <li>Print media Promotion</li>
                                        <li>Social Media Promotion (Pre and Post Publishing)</li>

                                        <li>Marketing Plan suggestion</li>
                                        <li>Publishing Event Handling</li>

                                        </ul>
                                        <Popupcontactus/>
=======
                                            <li>Personal Publishing Manager</li>
                                            <li>Proof Reading (40k words)</li>
                                            <li>Copy Editing (15k words)</li>
                                            <li>Customized Cover Design</li>
                                            <li>International Paperback distribution</li>
                                            <li>E-book Placements</li>
                                            <li>Author Video on website</li>
                                            <li>Kindle Promotion</li>
                                            <li>Print media Promotion</li>
                                            <li>Social Media Promotion (Pre and Post Publishing)</li>

                                            <li>Marketing Plan suggestion</li>
                                            <li>Publishing Event Handling</li>

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
        </>

<<<<<<< HEAD
  )
=======
    )
>>>>>>> a3e2fa8 (updates)
}

export default Toppackage