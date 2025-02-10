import React, { useEffect } from 'react'
import './literaryhublistviewstyle.css';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import cover1 from '../../Assets/literaryhub/shortstory/cover1.png'
import cover2 from '../../Assets/literaryhub/shortstory/cover2.png'
import cover3 from '../../Assets/literaryhub/shortstory/cover3.webp'
import cover4 from '../../Assets/literaryhub/shortstory/cover4.webp'
const Shortstorieslistview = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const newstorydata = [
        {
            id: 1,
            title: "Through the Magnifier",
            authorname: "Amelia Jassie",
            img: cover4,
            description: "Amelia Jassie is an acclaimed contemporary author known for her evocative storytelling and deeply humanistic perspectives. Born in a quaint coastal town, Amelia's love for literature was nurtured by her parents, who filled their home with books of all genres. From a young age, she exhibited a keen sense of observation and an innate ability to find beauty in the world around her. Amelia pursued a degree in English Literature and Creative Writing, which further honed her skills and fueled her passion for storytelling. Her unique approach to writing—where she focuses on the positive aspects of life and human experience— has garnered her a dedicated readership. she continues to write, draw inspiration from nature, and mentor aspiring writers. Her work remains a beacon of hope, reminding readers that there is always beauty to be found, even in the simplest of things.",
            posdate: "Feb 10th 2025",
        },
        {
            id: 2,
            title: "A Journey of Two Souls",
            authorname: "Sakshi Dhilip",
            img: cover3,
            description: "Sakshi Dhilip is a passionate storyteller who finds beauty in the quiet moments of life. Her writing is deeply influenced by themes of love, loss, and companionship. Through her stories, she captures the essence of human emotions and the unspokenbonds that tie us together. When she’s not weaving heartfelt tales, Sakshi enjoys traveling, sipping tea by the window, and spending time with her own felinecompanions. A Journey of Two Souls is a testament to her belief that love andfriendship transcend time, age, and even species",
            posdate: "Jan 22th 2025",
        },
    ]

    const storydata = [
        {
            id: 1,
            title: "The Smell of Boiling Milk",
            authorname: "Vidhushi Jain",
            img: cover2,
            description: "In the heart of an Indian household, the scent of boiling milk at dawn symbolizes the deep-rooted rituals and traditions that shape daily life. The story explores the protagonist's realization that life, much like boiling milk, demands constant attention and respect. Through the lens of her grandmother's meticulous care, she learns the importance of being present and finding order in chaos. The narrative delves into the duality of Indian culture, balancing reverence and rebellion, patience and urgency. Ultimately, it celebrates the beauty in the mundane and the significance of seemingly small moments.",
            posdate: "Dec 20th 2024",
        },
        {
            id: 2,
            title: "Love in Eldoria",
            authorname: "Jennifer Mars",
            img: cover1,
            description: "In the kingdom of Eldoria, King Aric's reign is marked by prosperitybut also loneliness. He meets Elara, a kind and intelligent maid, and they forma deepconnection. Despite societal prejudices, Aric declares his love for Elara and their intention to rule together. The people of Eldoria, moved by their sincerity, eventuallyaccept their union. Aric and Elara's love becomes a beacon of hope and unity, provingthat true love can overcome even the deepest prejudices. Their story transforms intoalegend, inspiring the kingdom for generations to come.",
            posdate: "Dec 5th 2024",
        },
    ]


    return (
        <div className='Shortstorieslistview'>

            <div className='literaryhub-bgimg'>
                <div className='literaryhub-blackdrop'>

                    <div className='literaryhub-title'>Short Stories</div>
                </div>
            </div>


            <div className='literaryhub-content' >
                <h2>New Stories</h2>
                <div className='literaryhub-article-container1'>
                    <Row className='literaryhub-article-container1-row'>
                        {newstorydata.map((data) => (

                            <Col className='literaryhub-content-card' data-aos="zoom-in">
                                <Link to={`/literayhub-short-stories/${data.title}`}>
                                    <Row>
                                        <Col lg='4' sm='6'>
                                            <img src={data.img} className='literaryhub-cover-img'></img>
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
                <h2>Explore More</h2>


                <div className='literaryhub-article-container2'>

                    {storydata.map((data) => (
                        <Col className='literaryhub-content-card' data-aos="zoom-in">
                            <Link to={`/literayhub-short-stories/${data.title}`}>

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

export default Shortstorieslistview