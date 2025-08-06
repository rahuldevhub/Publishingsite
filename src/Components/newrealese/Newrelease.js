import React from 'react'
import './Newrelease.css'
// import { Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
// import jade from '../../Assets/latestrelease/jade.jpg'
// import revelations from '../../Assets/latestrelease/revelations.jpg'
import bookdata from '../../Assets/data/bookdata';

import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const Newrelease = () => {
    return (
        <div className='Newrelease'>
            <h1>Ritera's New Release</h1>

            <div>



                <Swiper
                    slidesPerView={2}
                    spaceBetween={10}
                    centeredSlides={true}

                    // pagination={{
                    //   clickable: true,
                    // }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                    navigation={false}

                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                >

                    {bookdata.map((data) => (
                        <SwiperSlide>
                            <div className='lg:w-2/3 flex justify-center object-contain mx-auto h-48 lg:h-96 bookswipercard' data-aos="zoom-in">
                                <div className='bookswipercontent'>

                                    <Link to={`/books/${data.title}`}>
                                        <Card className='Newrelease-container' >

                                            <Card.Body>
                                                <Card.Img variant="jade julep" src={data.imgUrl} className='Newrelease-img' alt={data.imgalt} />
                                                <Card.Text><h1>{data.title}</h1></Card.Text>
                                                <Card.Text><p>{data.subtitle}</p></Card.Text>
                                            </Card.Body>

                                        </Card>
                                    </Link>


                                </div></div>

                        </SwiperSlide>

                    ))}
                </Swiper>



            </div>


        </div>
    )
}

export default Newrelease