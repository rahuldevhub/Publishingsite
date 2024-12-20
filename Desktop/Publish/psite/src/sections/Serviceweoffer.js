import React from 'react'
import '../css/serviceweoffer.css'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import kindle from '../assets/ourservice/13818745_5362964.png'
import proff from '../assets/ourservice/proff.png'
import globe from '../assets/ourservice/globe.png'
import marketing from '../assets/ourservice/marketing.png'
import seeall from '../assets/ourservice/see all.png'
import writing from '../assets/ourservice/writing.png'

import MediaQuery, { useMediaQuery } from "react-responsive";
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
const Serviceweoffer = () => {

    let servicedata = [
        {
            servicename: 'Proof Reading',
            img: proff
        },
        {
            servicename: 'Copy Writing',
            img: writing
        },
        {
            servicename: 'International',
            img: globe
        },
        {
            servicename: 'Beta reading',
            img: kindle
        },
        {
            servicename: 'Marketing',
            img: marketing
        }, {
            servicename: 'See all Service',
            img: seeall
        },
    ]
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })
    return (

        <>

            {isDesktopOrLaptop &&
                <div className='serviceweoffer' id='serviceweoffer'>
                    <div className='serviceweoffer1'>
                        <p className='serviceweoffertitle' data-aos="fade-right" >Service we offer</p>
                        <div className='service'>
                            <Row xs={1} md={1} lg={3} className="g-4 servicerow" >
                                {servicedata.map((servicedata) => (
                                    <Link to={'/allservice'}>
                                        <Card className='Service-card' data-aos="zoom-in">
                                            <Card.Body>
                                                <Card.Img variant="top" src={servicedata.img} className='service-card-icon' />
                                                <Card.Text className='service-title'>
                                                    <p>{servicedata.servicename}</p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                ))}
                            </Row>
                        </div>
                    </div>
                </div>}

            {isTaborMobile && <div>

     <p className='serviceweoffertitle' data-aos="fade-right" >Service we offer</p>
   
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                            <div className='service'>
                                <Row xs={1} md={1} lg={3} className="g-4 servicerow" >
                                    {servicedata.map((servicedata) => (
                                        <SwiperSlide>
                                            <Link to={'/allservice'}>
                                                <Card className='Service-card' data-aos="zoom-in">
                                                    <Card.Body>
                                                        <Card.Img variant="top" src={servicedata.img} className='service-card-icon' />
                                                        <Card.Text className='service-title'>
                                                            <p>{servicedata.servicename}</p>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Row>
                            </div>

                    

                </Swiper>

                </div>
            
            }





        </>
    )
}

export default Serviceweoffer