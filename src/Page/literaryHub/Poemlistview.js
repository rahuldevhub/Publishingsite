import React, { useEffect } from 'react'
import './literaryhublistviewstyle.css';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import img01 from '../../Assets/literaryhub/poemcoverimg/cover1.webp';
import img02 from '../../Assets/literaryhub/poemcoverimg/cover2.webp';
import img03 from '../../Assets/literaryhub/poemcoverimg/cover3.webp';
import img04 from '../../Assets/literaryhub/poemcoverimg/cover4.webp';
import img05 from '../../Assets/literaryhub/poemcoverimg/cover5.webp';
import img06 from '../../Assets/literaryhub/poemcoverimg/cover6.webp';
import img07 from '../../Assets/literaryhub/poemcoverimg/cover7.webp';
import img08 from '../../Assets/literaryhub/poemcoverimg/cover8.webp';
import img09 from '../../Assets/literaryhub/poemcoverimg/cover9.webp';
import img10 from '../../Assets/literaryhub/poemcoverimg/cover10.webp';
import img11 from '../../Assets/literaryhub/poemcoverimg/cover11.webp';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export const Poemlistview = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const newpoemdata = [
        {
            id: 1,
            title: "It's Better to Be Loved Than to Be Feared",
            authorname: "Ashvi",
            img: img11,
            description: "This poem explores the contrast between love and fear, emphasizing that love is a powerful, nurturing force that dispels darkness and brings warmth, while fear only restricts and controls...",
            posdate: "Feb 12th 2025",
        },
        {
            id: 2,
            title: 'Price-less Art',
            authorname: "Vishnu K. Prasanna",
            img: img10,
            description: "A poor artist, with a burning passion for his craft, finds solace in his artwork despite his financial struggles. His life takes a turn when he falls in love with a woman who becomes his muse...",
            posdate: "Feb 5th 2025",
        },
        

    ]

    const poemdata = [
        {
            id: 1,
            title: 'In the Park, A Father’s Prayer',
            authorname: "Frank Gilmore",
            img: img09,
            description: "In the Park, a Father's Prayer by Frank Gilmore is a tender exploration of a father's love and the quiet anxieties that accompany parenthood. The poem captures a poignant moment in a park, where a father finds joy in his young son's innocent delight. However, amidst the laughter and play, the father’s mind drifts to the challenges his child will inevitably face in the chaotic world.",
            posdate: "Jan 20th 2025",
        },
        {
            id: 2,
            title: 'Echoes of the Harvest Gone',
            authorname: "Austin Flint",
            img: img08,
            description: "Echoes of the Harvest Gone is a reflective poem by Austin Flint that delves intothepoignant imagery of a desolate backyard, once teeming with life. Through vivid descriptions and evocative language, Flint portrays the cycle of growth and decayinherent in nature. The poem speaks to the resilience of the human spirit, symbolizedby a farmer's unwavering hope despite the harsh realities of drought and death. Eachstanza weaves a tale of loss and renewal, ultimately suggesting that even in the face of adversity, life finds a way to endure and flourish.",
            posdate: "Jan 3rd 2025",
        },
        {
            id: 3,
            title: 'A Glimmer Of Hope',
            authorname: "Anshidha Jagadheesh",
            img: img07,
            description: "“A Glimmer Of Hope” reflects on the struggles and inner battles facedbyindividuals who seek peace and belonging in a world often quick to judge and isolate. It highlights the hidden strength within these individuals, their unwavering courage, and their unique journeys. The poem emphasizes the importance of unity, compassion, and acceptance, encouraging us to stand together, support one another, and celebratethe beauty of diversity. By nurturing a world of care and love, we can transformhardships into hope and create a brighter, more inclusive future.",
            posdate: "Dec 28th 2024",
        },
        {
            id: 4,
            title: 'Embrace the silence',
            authorname: "Julia Shade",
            img: img06,
            description: "Embrace of Silence by Julia Shade is a serene meditation on the joys of solitude and the profound peace found in embracing the void. Through delicateand introspective language, the poem captures the quiet beauty of beingaloneand the clarity that comes from within. Shade’s verses depict a soul at easeinthe stillness, finding solace and healing in the absence of external noise. Eachstanza reflects the tranquil journey of self-discovery and the serenity that emerges from solitude, celebrating the inner peace that arises whenoneembraces the emptiness",
            posdate: "Dec 15th 2024",
        },

        {
            id: 5,
            title: 'Sun in Africa',
            authorname: "Zuri",
            img: img05,
            description: "Sun in Africa” paints a vivid picture of Africa, a continent marked by both struggle and resilience. It highlights the harsh realities of poverty and hardship, yet celebrates the unbroken spirit and grace of its people.",
            posdate: "Dec 5th 2024",
        },
        {
            id: 6,
            title: 'To someone who’s struggling in silence',
            authorname: "Shahitha Fareen M",
            img: img04,
            description: "Author takes readers on an emotional journey through the highs and lows of life. This heartfelt piece emphasizes the importance of surrounding oneself with people who love unconditionally and bring out the best in us. It acknowledges the inevitable encounters with those who may cause pain and doubt but reassures that these negative influences are temporary. ",
            posdate: "Dec 1st 2024",
        },
        {
            id: 7,
            title: 'Invisible strokes',
            authorname: "Stan Miller",
            img: img03,
            description: "In a grand, empty hall, an artist embarks on creating a masterpiece. Withnoaudience to witness his work, he finds solace and inspiration in solitude. Each brushstroke and color choice becomes a dance and a song, bringing the canvas to life. The poem explores the beauty of creating art for oneself, without the need for external validaion.",
            posdate: "Nov 25th 2024",
        },
        {
            id: 8,
            title: "Daddy's little girl",
            authorname: "Zain Al Fikri",
            img: img02,
            description: "In this moving poetry, a father and daughter set out on a peaceful journey at dawn, hand in hand, leaving behind their birthplace. The soft waves of the sea, as well as thepromise of a pleasant voyage, calm their hearts. As they sail, their laughter and unspoken intimacy create a tune of love and trust. The rising light colors the sky goldand amber, leading them to a new horizon of limitless possibilities.",
            posdate: "Nov 12th 2024",
        },
        {
            id: 9,
            title: 'Happily Ever After',
            authorname: "Saran Raj",
            img: img01,
            description: "The poem “Happily ever after” portrays a man in his 80s, sitting in a graveyard, drenched in sweat, with tired, worn hands. Unable to escape the void left by his wife’s death, he decides to commit suicide, not by shooting himself, hanging, or bleeding to death. Instead, he dozed himself high and dig a grave beside his wife’s, seeking peaceful rest by her side. He writes one last poem before dawn and places it atop her cemetery with her favourite California poppies.",
            posdate: "Oct 29th 2024",
        },


    ]
    return (
        <div className='Poemlistview'>

            <div className='literaryhub-bgimg'>
                <div className='literaryhub-blackdrop'>

                    <h2 className='literaryhub-title'>The Poetry Corner</h2>
                    <p className='literaryhub-subtitle'>You can also publish your poem for free!</p>
                </div>
            </div>



            <div className='literaryhub-content' >
                <h2>Our New Collection of Poems</h2>
                <div className='literaryhub-article-container1'>
                    <Row className='literaryhub-article-container1-row'>
                        {newpoemdata.map((data) => (

                            <Col className='literaryhub-content-card' >
                                <Link to={`/literaryhub-poems/${data.title}`}>
                                    <Row>
                                        <Col lg='4' sm='6'>
                                            <img src={data.img} alt='literaryhub-cover-img' className='literaryhub-cover-img'></img>
                                        </Col>
                                        <Col lg='8' className='literary-cardcontent-col'>
                                            <p className='literaryhub-cardcontent-title'>{data.title}</p>
                                            <p className='literaryhub-cardcontent-description'>{data.description}</p>
                                            <p className='literaryhub-cardcontent-authorname'>{data.authorname}</p>
                                            <p className='literaryhub-cardcontent-posteddate'>Published on: {data.posdate}</p>
                                            {/* <button className='landingpage-article-button'> See more</button> */}
                                        </Col>

                                    </Row>
                                </Link>
                            </Col>

                        ))}

                    </Row>
                </div>


            </div>



            {/* start */}

            <div className='literaryhub-content2'>
                <h2>Let the Poetry Flow</h2>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1.5,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2.5,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 4.5,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <Row className='literaryhub-article-container1-row'>



                        {poemdata.map((data) => (

                            <Col className='literaryhub-content-card' data-aos="zoom-in">
                                

                                    <SwiperSlide>
                                    <Link to={`/literaryhub-poems/${data.title}`}>
                                        <div className='lg:w-2/3 flex justify-center object-contain mx-auto h-48 lg:h-96 swipercard' data-aos="zoom-in">
                                            <div className='swipercontent'>
                                            <img src={data.img} alt='literaryhub-cover-img2' className='literaryhub-cover-img2'></img>

                                                <div className='literary-cardcontent-col'>

                                                <p className='literaryhub-cardcontent-title'>{data.title}</p>
                                                {/* <p className='literaryhub-cardcontent-description'>{data.description}</p> */}
                                                <p className='literaryhub-cardcontent-authorname'>{data.authorname}</p>
                                                <p className='literaryhub-cardcontent-posteddate'> {data.posdate}</p>

                                            </div></div>
                                            </div>
                                            </Link>
                                    </SwiperSlide>

                                
                            </Col>


                        ))}

                    </Row>

                </Swiper>




                {/* <div className='literaryhub-article-container2'>

                    {poemdata.map((data) => (
                        <Col className='literaryhub-content-card' data-aos="zoom-in">
                            <Link to={`/literaryhub-poems/${data.title}`}>

                                <Row>
                                    <Col lg='4' sm='6'>
                                        <img src={data.img} className='literaryhub-cover-img2'></img>
                                    </Col>
                                    <Col lg='8' className='literary-cardcontent-col'>
                                        <p className='literaryhub-cardcontent-title'>{data.title}</p>
                                        <p className='literaryhub-cardcontent-description'>{data.description}</p>
                                        <p className='literaryhub-cardcontent-authorname'>{data.authorname}</p>
                                        <p className='literaryhub-cardcontent-posteddate'>Published on: {data.posdate}</p>
                                    </Col>
                                </Row>

                            </Link>

                        </Col>
                    ))}


                </div> */}



            </div>

            {/* end */}




            <div className='literaryhub-hookredirect'>
                <Row className='literaryhub-hookredirect-content'>
                    <Col lg="12" md='6' sm="4" >
                    <h2>Share Your Poem with the World — For Free!</h2>
                        <p className='literaryhub-subtitle'>Let your verses be heard. Publish your poem with us at no cost and inspire others</p>
                    </Col>

                    <Col lg="12" md='6' sm="4" className=' literaryhub-hookredirect-button'>
                        <Link to={'/literayhub-submission'}>
                            <button>Publish Your Poem</button>
                        </Link>
                    </Col  >
                </Row>
            </div>


        </div>
    )
}
