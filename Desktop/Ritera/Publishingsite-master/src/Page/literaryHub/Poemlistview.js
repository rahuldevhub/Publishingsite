import React, { useEffect } from 'react'
import './literaryhublistviewstyle.css';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import img01 from '../../Assets/literaryhub/poemcoverimg/cover1.webp';
import img02 from '../../Assets/literaryhub/poemcoverimg/cover2.png';
import img03 from '../../Assets/literaryhub/poemcoverimg/cover3.png';
import img04 from '../../Assets/literaryhub/poemcoverimg/cover4.webp';
import img05 from '../../Assets/literaryhub/poemcoverimg/cover5.png';


export const Poemlistview = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const newpoemdata = [
         {
            id: 1,
            title: 'Sun in Africa',
            authorname: "Zuri",
            img: img05,
            description: "Sun in Africa” paints a vivid picture of Africa, a continent marked by both struggle and resilience. It highlights the harsh realities of poverty and hardship, yet celebrates the unbroken spirit and grace of its people.",
            posdate: "Dec 5th 2024",
        },
        {
            id: 2,
            title: 'To someone who’s struggling in silence',
            authorname: "Shahitha Fareen M",
            img: img04,
            description: "Author takes readers on an emotional journey through the highs and lows of life. This heartfelt piece emphasizes the importance of surrounding oneself with people who love unconditionally and bring out the best in us. It acknowledges the inevitable encounters with those who may cause pain and doubt but reassures that these negative influences are temporary. ",
            posdate: "Dec 1st 2024",
        },
      
    ]

    const poemdata = [
         {
            id: 3,
            title: 'Invisible strokes',
            authorname: "Stan Miller",
            img: img03,
            description: "In a grand, empty hall, an artist embarks on creating a masterpiece. Withnoaudience to witness his work, he finds solace and inspiration in solitude. Each brushstroke and color choice becomes a dance and a song, bringing the canvas to life. The poem explores the beauty of creating art for oneself, without the need for external validaion.",
            posdate: "Nov 25th 2024",
        },
        {
            id: 4,
            title: "Daddy's little girl",
            authorname: "Zain Al Fikri",
            img: img02,
            description: "In this moving poetry, a father and daughter set out on a peaceful journey at dawn, hand in hand, leaving behind their birthplace. The soft waves of the sea, as well as thepromise of a pleasant voyage, calm their hearts. As they sail, their laughter and unspoken intimacy create a tune of love and trust. The rising light colors the sky goldand amber, leading them to a new horizon of limitless possibilities.",
            posdate: "Nov 12th 2024",
        },
        {
            id: 5,
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

                    <div className='literaryhub-title'>Poems</div>
                </div>
            </div>



            <div className='literaryhub-content' >
                <h2>New Poems</h2>
                <div className='literaryhub-article-container1'>
                    <Row className='literaryhub-article-container1-row'>
                        {newpoemdata.map((data) => (

                            <Col className='literaryhub-content-card' data-aos="zoom-in">
                                <Link to={`/literaryhub-poems/${data.title}`}>
                                    <Row>
                                        <Col lg='3' sm='6'>
                                            <img src={data.img} className='literaryhub-cover-img'></img>
                                        </Col>
                                        <Col lg='9' className='literary-cardcontent-col'>
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
            <h2>Explore More</h2>


                <div className='literaryhub-article-container2'>

                    {poemdata.map((data) => (
                        <Col className='literaryhub-content-card' data-aos="zoom-in">
                            <Link to={`/literaryhub-poems/${data.title}`}>

                                <Row>
                                    <Col lg='2' sm='6'>
                                        <img src={data.img} className='literaryhub-cover-img2'></img>
                                    </Col>
                                    <Col lg='10' className='literary-cardcontent-col'>
                                        <p className='literaryhub-cardcontent-title'>{data.title}</p>
                                        <p className='literaryhub-cardcontent-description'>{data.description}</p>
                                        <p className='literaryhub-cardcontent-authorname'>{data.authorname}</p>
                                        <p className='literaryhub-cardcontent-posteddate'>Published on: {data.posdate}</p>
                                    </Col>
                                </Row>

                            </Link>

                        </Col>
                    ))}


                </div>



            </div>

            {/* end */}




            <div className='literaryhub-hookredirect'>
                <Row className='literaryhub-hookredirect-content'>
                    <Col lg="12" md='6' sm="4" >
                        <p>Publish your work for free</p>
                    </Col>

                    <Col lg="12" md='6' sm="4" className=' literaryhub-hookredirect-button'>
                        <Link to={'/literayhub-submission'}>
                            <button>See More</button>
                        </Link>
                    </Col  >
                </Row>
            </div>


        </div>
    )
}
