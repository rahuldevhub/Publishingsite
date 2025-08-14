import React from 'react'
import './Newrelease.css'
// import { Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
// import jade from '../../Assets/latestrelease/jade.jpg'
// import revelations from '../../Assets/latestrelease/revelations.jpg'
import bookdata from '../../Assets/data/bookdata';

import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Row, Col } from 'react-bootstrap'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const Newrelease = () => {
    return (
        <div className='Newrelease'>

            <div>

                <Row>
                    <Col lg='4' className='vl Newrelease-content d-flex flex-column justify-content-center position-relative'>
                        <div className="geometric-bg"></div>
                        <h2 className='Newrelease-title'>Ritera's New Release</h2>
                        <p className='Newrelease-subtitle'>
                            Discover the latest books straight from our passionate authors. Dive into stories that inspire, inform, and ignite imagination.
                        </p>
                    </Col>
                    <Col lg='8' >
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={20}
                            // loop={true}
                            // loopAdditionalSlides={5}
                            // speed={800}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 15,
                                    centeredSlides: false,
                                },
                                480: {
                                    slidesPerView: 1.2,
                                    spaceBetween: 20,
                                },
                                640: {
                                    slidesPerView: 1.5,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2.2,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 3.2,
                                    spaceBetween: 40,
                                },
                            }}
                            navigation={false}

                            modules={[Pagination, Autoplay]}
                            className="mySwiper"
                        >

                            {bookdata.map((data, index) => (
                                <SwiperSlide key={index}>
                                    <div className='flex justify-center object-contain mx-auto h-48 lg:h-96 bookswipercard' data-aos="zoom-in">
                                        <div className='bookswipercontent'>
                                            <Link to={`/books/${data.title.toLocaleLowerCase().replace(/\s+/g, '-')}`}>
                                                <Card className='Newrelease-container'>
                                                    <Card.Body>
                                                        <div className="Newrelease-img-container">
                                                            <Card.Img
                                                                variant="top"
                                                                src={data.imgUrl}
                                                                className='Newrelease-img'
                                                                alt={data.imgalt}
                                                            />
                                                        </div>
                                                        <Card.Text>
                                                            <h3 className="card-title-ellipsis" >
                                                                {data.title}
                                                                {data.badge && <span className="badge-new">{data.badge}</span>}
                                                            </h3>
                                                        </Card.Text>
                                                        <Card.Text>
                                                            <p className="card-subtitle-ellipsis">{data.subtitle}</p>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Col>
                </Row>



            </div>


        </div>
    )
}

export default Newrelease