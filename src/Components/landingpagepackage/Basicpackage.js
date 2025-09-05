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

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })
    return (
        <div className='Basicpackage'>

            {isDesktopOrLaptop &&

                <div className='Package1' >

                    <Row xs={1} md={2} lg={3} className="g-4 packageall" >
                        <Card className='level1-card' data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000" >
                            <Card.Body className='package-card-body' >
                                <div className='flex-items'>
                                    <div className='card-content'>
                                        <p className='level1-title'>Essential </p>
                                        <p className='level1-description'>Essential services with standard cover and interior designs,
                                            E-book formatting for budding authors & Online
                                            distribution in Indian stores.</p>
                                        <p className='level1-Price'>₹8,999</p>
                                    </div>
                                    <ul className='package-features'>
                                        <li><Tooltip title='From start to finish, a dedicated publishing manager will be by your side.'  >
                                            <IoInformationCircleOutline />  </Tooltip>Personal Manager</li>
                                        <li><Tooltip title='Minimal art work with 1 Concept and 3 Revisions.'>
                                            <IoInformationCircleOutline /> </Tooltip>Standard Cover Design</li>
                                        <li><Tooltip title='2 Designs with 2 Revisions'>
                                            <IoInformationCircleOutline /> </Tooltip>Standard Interior formatting</li>
                                        <li><Tooltip title='Distributed in India through Amazon and Flipkart India'>
                                            <IoInformationCircleOutline /> </Tooltip>Local Distribution</li>
                                        <li><Tooltip title='E-Book will be placed on Google play books'>
                                            <IoInformationCircleOutline /> </Tooltip>E-Book Placement</li>
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
                                        <p className='level1-description'>Comprehensive support for aspiring authors with free
                                            Author copies, certificate, E-Book placement on
                                            Google and Kobo & Online distribution in India.</p>
                                        <p className='level1-Price'>₹16,999</p>
                                    </div>

                                    <ul className='package-features'>
                                        <li>
                                            All services in previous</li>
                                        <li><Tooltip title="E-Book will be placed on Google Play & Kindle">
                                            <IoInformationCircleOutline /> </Tooltip>E-Book Placements (Kindle)</li>
                                        <li><Tooltip title='5 Author copies (B/W)'>
                                            <IoInformationCircleOutline /> </Tooltip>Author Copies</li>
                                        <li> Author Certificate</li><br />
                                        <li className='package-authorwebsite'><Tooltip title='A dedicated website will be provided, within the package cost.'>
                                            <IoInformationCircleOutline /> </Tooltip>Exclusive: <br />Author Website</li>
                                    </ul>
                                </div>
                                <div className='flex-items'>

                                    <Popupcontactus />

                                </div>
                            </Card.Body>
                        </Card>

                        <Card className='level1-card' data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                            <Card.Body className='package-card-body'>

                                <div className='flex-items'>

                                    <div className='card-content'>
                                        <p className='level1-title'>Advanced</p>
                                        <p className='level1-description'>All-inclusive package with International Distribution,
                                            premium cover and interior design, Prime placement,
                                            promotions, and free author session for ambitious authors.</p>
                                        <p className='level1-Price'>₹29,999</p>
                                    </div>
                                    <ul className='package-features'>
                                        <li>All services in previous</li>
                                        <li>100% Royalty for Author</li>
                                        <li><Tooltip title='2 Concepts and 3 Corrections once the concept is fixed'>
                                            <IoInformationCircleOutline /> </Tooltip>Premium Cover Design</li>
                                        <li><Tooltip title='2 Design and 3 Revision'>
                                            <IoInformationCircleOutline /> </Tooltip>Premium Interior formatting</li>
                                        <li><Tooltip title='Distributed globally around 160 Countries and 40000+ Online Stories and Libraries'>
                                            <IoInformationCircleOutline /> </Tooltip>International Distribution</li>
                                        <li><Tooltip title='E-Book will be published on Kindle, Kobo and Google Play books.'>
                                            <IoInformationCircleOutline /> </Tooltip>E-Book Placements</li>
                                        <li><Tooltip title='10 Author Copies (B/W or Colour)'>
                                            <IoInformationCircleOutline /> </Tooltip>Author copies</li>


                                        <li><Tooltip title='10 Complementry reviews (pre/post publishing) '>
                                            <IoInformationCircleOutline /> </Tooltip>Book Reviews</li>

                                        <li><Tooltip title='A specialized beta reviewer will be assigned and will share their opinion before publishing.'>
                                            <IoInformationCircleOutline /> </Tooltip>Beta Reading</li>

                                        <li><Tooltip title='A specialized author session will be Arranged virtually (Video/Text) to overcome writers block or any other writing doubts.'>
                                            <IoInformationCircleOutline /> </Tooltip>Free Author Session</li>
                                        <li> Kindle Promotion</li>
                                        <li> Amazon Prime Placement</li>
                                    </ul>
                                </div>
                                <div className='flex-items'>

                                    <Popupcontactus />
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
                                            <li><Tooltip title='From start to finish, a dedicated publishing manager will be by your side.'  >
                                                <IoInformationCircleOutline />  </Tooltip>Personal Manager</li>
                                            <li><Tooltip title='Minimal art work with 1 Concept and 3 Revisions.'>
                                                <IoInformationCircleOutline /> </Tooltip>Standard Cover Design</li>
                                            <li><Tooltip title='2 Designs with 2 Revisions'>
                                                <IoInformationCircleOutline /> </Tooltip>Standard Interior formatting</li>
                                            <li><Tooltip title='Distributed in India through Amazon and Flipkart India'>
                                                <IoInformationCircleOutline /> </Tooltip>Local Distribution</li>
                                            <li><Tooltip title='E-Book will be placed on Google play books'>
                                                <IoInformationCircleOutline /> </Tooltip>E-Book Placement</li>
                                            <li>Copy Rights + ISBN </li>
                                            <li>100% Royalty for Author</li>
                                            <li>Post Publishing Support </li>

                                        </ul>
                                        <Popupcontactus />
                                        {/* <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link> */}
                                    </Card.Body>
                                </Card></SwiperSlide>

                            <SwiperSlide>
                                <Card className='level1-card' >
                                    <Card.Body>
                                        <div className='card-content'>
                                            <p className='level1-title'>Standard</p>
                                            <p className='level1-Price'>₹16,999</p>

                                            <ul className='package-features'>
                                                <li>
                                                    All services in previous</li>
                                                <li><Tooltip title="E-Book will be placed on Google Play & Kindle">
                                                    <IoInformationCircleOutline /> </Tooltip>Kindle E-Book Placements</li>
                                                <li><Tooltip title='5 Author copies (B/W)'>
                                                    <IoInformationCircleOutline /> </Tooltip>Author Copies</li>
                                                <li> Author Certificate</li><br />
                                                <li className='package-authorwebsite'><Tooltip title='A dedicated website will be provided, within the package cost.'>
                                                    <IoInformationCircleOutline /> </Tooltip>Exclusive: <br />Author Website</li>


                                            </ul>
                                            <Popupcontactus />
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
                                            <li>All services in previous</li>
                                        <li>100% Royalty for Author</li>
                                        <li><Tooltip title='2 Concepts and 3 Corrections once the concept is fixed'>
                                            <IoInformationCircleOutline /> </Tooltip>Premium Cover Design</li>
                                        <li><Tooltip title='2 Design and 3 Revision'>
                                            <IoInformationCircleOutline /> </Tooltip>Premium Interior formatting</li>
                                        <li><Tooltip title='Distributed globally around 160 Countries and 40000+ Online Stories and Libraries'>
                                            <IoInformationCircleOutline /> </Tooltip>International Distribution</li>
                                        <li><Tooltip title='E-Book will be published on Kindle, Kobo and Google Play books.'>
                                            <IoInformationCircleOutline /> </Tooltip>E-Book Placements</li>
                                        <li><Tooltip title='10 Author Copies (B/W or Colour)'>
                                            <IoInformationCircleOutline /> </Tooltip>Author copies</li>


                                        <li><Tooltip title='10 Complementry reviews (pre/post publishing) '>
                                            <IoInformationCircleOutline /> </Tooltip>Book Reviews</li>

                                        <li><Tooltip title='A specialized beta reviewer will be assigned and will share their opinion before publishing.'>
                                            <IoInformationCircleOutline /> </Tooltip>Beta Reading</li>

                                        <li><Tooltip title='A specialized author session will be Arranged virtually (Video/Text) to overcome writers block or any other writing doubts.'>
                                            <IoInformationCircleOutline /> </Tooltip>Free Author Session</li>
                                        <li> Kindle Promotion</li>
                                        <li> Amazon Prime Placement</li>
                                            </ul>
                                            <Popupcontactus />
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