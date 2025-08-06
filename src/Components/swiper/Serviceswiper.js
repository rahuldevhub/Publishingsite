import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './serviceswiper.css';
import { Navigation } from 'swiper/modules';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { useMediaQuery } from 'react-responsive';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import proofreading from '../../Assets/serviceicons/proofreading.webp'
import marketing from '../../Assets/serviceicons/marketing.webp'
import articles from '../../Assets/serviceicons/articles.webp'
import betareading from '../../Assets/serviceicons/betareading.webp'
import copywriting from '../../Assets/serviceicons/copywriting.webp'
import International from '../../Assets/serviceicons/international.webp'

import { Autoplay } from 'swiper/modules';

const Serviceswiper = () => {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })
    return (
        <div>
            {isDesktopOrLaptop && <Swiper 
            // autoplay={{
            //     delay: 3000,
            //     disableOnInteraction: false,
            //   }}
    
            navigation={true} modules={[Navigation, Autoplay]} className="mySwiper">
                <SwiperSlide>

                    <Row xs={1} md={2} lg={3} className="g-4  services-card">

                        <Card className='servicecard'data-aos="zoom-in-right" >
                            <Card.Body >
                                <div className='service-card-content'>
                                    <img src={proofreading} className='service-card-icon' alt='Fountain pen editing a document, representing proofreading services by top self book publishing company in India'></img>
                                    <h3 className='service-card-title'>Proof Reading </h3>
                                    <p className='service-card-description'>Having a well polished manuscript is crucial. Our team of expert proof readers is dedicated to enhancing your work by meticulously correcting grammatical errors, punctuation errors and etc. Additionally, we ensure that your document maintains consistent formatting and style. </p>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className='servicecard' data-aos="zoom-in" >
                            <Card.Body>
                                <div className='service-card-content'>
                                    <img src={marketing} className='service-card-icon' alt='Hand holding icons of marketing tools, showing e publishing and book promotions by self publishing in India experts'></img>
                                    <h3 className='service-card-title'>Marketing </h3>
                                    <p className='service-card-description'>We excel in both traditional and digital marketing strategies, conducting thorough marketing analysis that considers your book’s genre and theme.
                                        A dedicated marketing consultant will be assigned to ensure your book receives the attention it deserves to shine.

                                    </p>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className='servicecard'data-aos="zoom-in-left" >
                            <Card.Body>
                                <div className='service-card-content'>
                                    <img src={articles} className='service-card-icon' alt='Image of book representing free book Publishing at Ritera Publishing'></img>
                                    <h3 className='service-card-title'>Free Publishing </h3>
                                    <p className='service-card-description'>Ritera offers a free publishing platform for your poems,short stories, and articles. We bring your work to the spotlight and make sure both you and your work reach worldwide. Share your creativity with the world at no cost!</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Row>

                </SwiperSlide>

                <SwiperSlide>
                    <Row xs={1} md={2} lg={3} className="g-4  services-card">

                        <Card className='servicecard' >
                            <Card.Body >
                                <div className='service-card-content'>
                                    <img src={betareading} className='service-card-icon' alt='Beta reading services offered by self publishing house in India for aspiring authors'></img>
                                    <h3 className='service-card-title'>Beta reading </h3>
                                    <p className='service-card-description'>Beta readers are mandatory in the assessment of manuscripts before publishing. Ritera's beta readers will provide feedback on the plot, pacing, and overall readability. Add, our beta readers will impart valuable insights, urging authors to consider their feedback thoughtfully.
                                        {/* and providing a report to facilitate any necessary revisions. */}
                                        
                                        </p>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className='servicecard' >
                            <Card.Body>
                                <div className='service-card-content'>
                                    <img src={copywriting} className='service-card-icon' alt='Creative copywriting concept illustrated with typewriter, text elements, and artistic graphics.'></img>
                                    <h3 className='service-card-title'>Copy writing </h3>
                                    <p className='service-card-description'>Copywriters at Ritera bear significant responsibilities. They meticulously edit and proofread your manuscript to ensure clarity and accuracy. They craft compelling and engaging descriptions for various platforms. 
                                        {/* Additionally, they collaborate closely with designers, marketers, and authors to maintain a consistent voice and message across all materials.  */}
                                        {/* When it comes to writing a blog for you, our copywriters apply SEO strategies to maximize reach and visibility */}

                                    </p>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className='servicecard' >
                            <Card.Body>
                                <div className='service-card-content'>
                                    <img src={International} className='service-card-icon' alt='globe representing international reach of books through International distribution'></img>
                                    <h3 className='service-card-title'>International </h3>
                                    <p className='service-card-description'>By partnering with well experienced global distributors, Ritera guarantees that your book reaches around 160 countries, 45000+ online bookstores, libraries and retailers worldwide.</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Row>

                </SwiperSlide>
            </Swiper>
            }


            {isTaborMobile && <Swiper
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
                            <Card className='servicecard'data-aos="zoom-in" >
                                <Card.Body >
                                    <div className='service-card-content'>
                                        <img src={proofreading} className='service-card-icon' alt='Fountain pen editing a document, representing proofreading services by top self book publishing company in India'></img>
                                        <h3 className='service-card-title'>Proof Reading </h3>
                                        <p className='service-card-description'>Having a well polished manuscript is crucial. Our team of expert proof readers is dedicated to enhancing your work by meticulously correcting grammatical errors, punctuation errors and etc. Additionally, we ensure that your document maintains consistent formatting and style.</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </SwiperSlide>

                        <SwiperSlide>
                        <Card className='servicecard' >
                            <Card.Body>
                                <div className='service-card-content'>
                                    <img src={marketing} className='service-card-icon' alt='Hand holding icons of marketing tools, showing e publishing and book promotions by self publishing in India experts'></img>
                                    <h3 className='service-card-title'>Marketing </h3>
                                    <p className='service-card-description'>We excel in both traditional and digital marketing strategies, conducting thorough marketing analysis that considers your book’s genre and theme. A dedicated marketing consultant will be assigned to ensure your book receives the attention it deserves to shine.

                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                        </SwiperSlide>

                        <SwiperSlide>
                        <Card className='servicecard' >
                            <Card.Body>
                                <div className='service-card-content'>
                                    <img src={articles} className='service-card-icon' alt='Image of book representing free book Publishing at Ritera Publishing'></img>
                                   <h3 className='service-card-title'>Free Publishing </h3>
                                    <p className='service-card-description'>Ritera offers a free publishing platform for your poems,short stories, and articles. We bring your work to the spotlight and make sure both you and your work reach worldwide. Share your creativity with the world at no cost!</p>
                                </div>
                            </Card.Body>
                        </Card>
                        </SwiperSlide>



                        <SwiperSlide>
                        <Card className='servicecard' >
                            <Card.Body >
                                <div className='service-card-content'>
                                    <img src={betareading} className='service-card-icon' alt='Beta reading services offered by self publishing house in India for aspiring authors'></img>
                                    <h3 className='service-card-title'>Beta reading </h3>
                                    <p className='service-card-description'>Beta readers are mandatory in the assessment of manuscripts before publishing. Ritera's beta readers will provide feedback on the plot, pacing, and overall readability. 
                                        Add, our beta readers will impart valuable insights, urging authors to consider their feedback thoughtfully.
                                        {/* and providing a report to facilitate any necessary revisions. */}
                                        
                                        </p>
                                </div>
                            </Card.Body>
                        </Card>
                        </SwiperSlide>

                        <SwiperSlide>
                        <Card className='servicecard' >
                            <Card.Body>
                                <div className='service-card-content'>
                                    <img src={copywriting} className='service-card-icon' alt='Creative copywriting concept illustrated with typewriter, text elements, and artistic graphics.'></img>
                                    <h3 className='service-card-title'>Copy writing </h3>
                                    <p className='service-card-description'>Copywriters at Ritera bear significant responsibilities. They meticulously edit and proofread your manuscript to ensure clarity and accuracy. They craft compelling and engaging descriptions for various platforms.
                                        {/* Additionally, they collaborate closely with designers, marketers, and authors to maintain a consistent voice and message across all materials. */}
                                        {/* When it comes to writing a blog for you, our copywriters apply SEO strategies to maximize reach and visibility */}

                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                        </SwiperSlide>

                        <SwiperSlide>
                        <Card className='servicecard' >
                            <Card.Body>
                                <div className='service-card-content'>
                                    <img src={International} className='service-card-icon' alt='globe representing international reach of books through International distribution'></img>
                                    <h3 className='service-card-title'>International </h3>
                                    <p className='service-card-description'>By partnering with well experienced global distributors, Ritera guarantees that your book reaches around 160 countries, 45000+ online bookstores, libraries and retailers worldwide.</p>
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

export default Serviceswiper