import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Row, Col } from 'react-bootstrap'

import 'swiper/css';
import 'swiper/css/pagination';
import './testimonial.css';
import { Autoplay, Pagination } from 'swiper/modules';
import women1 from '../../Assets/testimonials/women1.png'
import men1 from '../../Assets/testimonials/men1.png'
const Testimonials = () => {

    let testimonial = [
        {
            id: 1,
            name: "Meenakshi Balan",
            designation: "Author, Activist",
            content: "Getting honest reviews is tough as an indie author. Ritera supported me by suggesting where to ask for reader feedback and helped highlight my book in their Litspace community.",
            img: women1,
        },
        {
            id: 2,
            name: "Jaishree",
            designation: "Psychologist",
            content: "To be honest, I was looking for a self-publisher in India to publish my short piece regarding psychology. I spoke with a few publishers, but believe me, Ritera stood tall than others. They didn't go for economical stuffs on the first place. They Listened. That's what the primary stuff is.",
            img: women1,
        },
        {
            id: 3,
            name: "Shahitha Fareen",
            designation: "Poet, Physiotherapist.",
            content: "Publishing Jade Julep has truly been one of the most beautiful and unexpected moments of my year. The team at Ritera Publishing worked tirelessly to bring this project to life. What amazed me the most was the speed and sincerity with which they poured their efforts into the process. Every single team member-from editors to coordinators-was thoughtful, supportive, and truly passionate about their work. I'm still in awe of the hard work they put in, and I feel incredibly grateful to have had the chance to publish through them.",
            img: women1,
        },
        {
            id: 4,
            name: "Karthik",
            designation: "Poet, Reviewer.",
            content: "Before signing up with Ritera, I honestly thought, “this is just a start up and what if everything (Jade Julep) goes wrong?”. But their service was fully professional, and my jaw dropped at the way they presented. ",
            img: men1,
        },
        {
            id: 5,
            name: "Saran Raj",
            designation: "Author",
            content: "Ritera Publishing made my publishing journey smooth and inspiring. Their professionalism, support, and attention to detail truly elevated my work. Looking forward to the continued publishing process with them.",
            img: men1,
        },
        {
            id: 6,
            name: "Ananya",
            designation: "Reviewer",
            content: "Loved the whole process! Hope you guys grow more.",
            img: women1,
        },
        {
            id: 7,
            name: "Ashvi",
            designation: "Poet, Doctor.",
            content: "I used Litspace to share some of my personal essays and short poems. Later, Ritera offered to include one piece in their upcoming anthology. A great way to ease into the self-publishing in India.",
            img: women1,
        },
        {
            id: 8,
            name: "Aravind Mishra",
            designation: "Author, CEO (Blaider Tech)",
            content: "I was surprised to see my book available not just in India but also in the US and UK. Ritera took care of the international listing and print-on-demand setup, which made global distribution easy.",
            img: men1,
        },
        {
            id: 9,
            name: "Kiruba Janarthnan",
            designation: "Author",
            content: "The publishing manager, Kowsalya, I worked with at Ritera was incredibly supportive throughout the process. From finalising the manuscript to handling the event details for my book launch, they made everything easier for me as a first-time author",
            img: men1,
        },
        {
            id: 10,
            name: "Ansidha Jagadheeshan.",
            designation: "Author",
            content: "Excellent experience with this publishing house in India—they helped me publish a book in India, design cover, assign ISBN, and list on Amazon.",
            img: women1,
        },



    ]
    const [expandedCards, setExpandedCards] = useState({});
    const swiperRef = useRef(null);

    const isMobile = window.innerWidth <= 768;
    return (
        <div className='Testimonials'>
            <h2 className="testimonial-title">✨ Hear From Our Authors</h2>
            <p className="testimonial-subtitle">
                Discover how Ritera helped bring their stories to life — from manuscript to masterpiece.
            </p>

            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                centeredSlides={true}
                loop={true}
                loopAdditionalSlides={5}
                speed={800}
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
                modules={[Pagination, Autoplay]}
                className="mySwiper-testimonial"
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {testimonial.map((data) => {

                    const maxChar = 300;
                    const isExpanded = expandedCards[data.id] || false;
                    const isLong = data.content.length > maxChar;
                    const displayedText = isExpanded ? data.content : data.content.slice(0, maxChar);

                    return (
                        <SwiperSlide key={data.id}

                            onMouseEnter={() => {
                                if (!isMobile) {
                                    swiperRef.current?.autoplay?.stop();
                                    setExpandedCards((prev) => ({ ...prev, [data.id]: true }));
                                }
                            }}
                            onMouseLeave={() => {
                                if (!isMobile) {
                                    swiperRef.current?.autoplay?.start();
                                    setExpandedCards((prev) => ({ ...prev, [data.id]: false }));
                                }
                            }}
                        >
                            <div
                                className={`swipercard ${isExpanded ? 'expanded' : ''}`}
                                onMouseEnter={() => {
                                    swiperRef.current?.autoplay?.stop();
                                    setExpandedCards((prev) => ({ ...prev, [data.id]: true }));
                                }}
                                onMouseLeave={() => {
                                    swiperRef.current?.autoplay?.start();
                                    setExpandedCards((prev) => ({ ...prev, [data.id]: false }));
                                }}
                            >
                                <div className='swipercontent'>
                                    <img src={data.img} alt='authorimg' className='testimonial-avatar' />
                                    <p className='Testimonials-text'>
                                        {displayedText}
                                        {!isExpanded && isLong && '...'}
                                        {isMobile && isLong && (
                                            <span
                                                onClick={() =>
                                                    setExpandedCards((prev) => ({
                                                        ...prev,
                                                        [data.id]: !isExpanded,
                                                    }))
                                                }
                                                className="read-more-toggle"
                                            >
                                                {isExpanded ? ' Show less' : ' Read more'}
                                            </span>
                                        )}
                                    </p>
                                    <h2 style={{ fontFamily: 'Brittany Signature' }} className='Testimonials-name'>{data.name}</h2>
                                    <p className='Testimonials-designation'>{data.designation}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    )
}

export default Testimonials