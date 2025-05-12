import React, { useEffect } from 'react'
import './literaryhublistviewstyle.css';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import img01 from '../../Assets/literaryhub/articlecoverimg/img01.webp';
import img02 from '../../Assets/literaryhub/articlecoverimg/img02.webp';
export const Articleslistview = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const newarticledata = [
        {
            id: 1,
            title: "The Importance of Literature in Our World",
            authorname: "Jessica miller",
            img: img01,
            description: "Literature has always been a cornerstone of human culture, offering a windowintothedepths of human experience and the complexities of society.",
            posdate: "Nov 10th 2024",
        },
        {
            id: 2,
            title: 'The Dynamics of Technology in the Modern World',
            authorname: "Rahul",
            img: img02,
            description: " In today’s rapidly evolving landscape, technology is a driving force reshaping everyaspect of our lives.",
            posdate: "Nov 3rd 2024",
        },
    ]

    // const articledata = [
    //     {
    //         id: 1,
    //         title: "The Importance of Literature in Our World",
    //         authorname: "Jessica miller",
    //         img: img01,
    //         description: "Literature has always been a cornerstone of human culture, offering a windowintothedepths of human experience and the complexities of society.",
    //         posdate: "Nov 10th 2024",
    //     },
    //     {
    //         id: 2,
    //         title: 'The Dynamics of Technology in the Modern World',
    //         authorname: "Rahul",
    //         img: img02,
    //         description: " In today’s rapidly evolving landscape, technology is a driving force reshaping everyaspect of our lives.",
    //         posdate: "Nov 3rd 2024",
    //     },

    // ]

    return (
        <div className='Articleslistview'>

            <div className='literaryhub-bgimg'>
                <div className='literaryhub-blackdrop'>

                    <h2 className='literaryhub-title'>The Article Avenue</h2>
                    <p className='literaryhub-subtitle'>Join a growing space of writers and thinkers. Publish your article for free and get noticed!</p>
                </div>
            </div>

            <div className='literaryhub-content' >
                <h2>Discover Our Latest Articles</h2>
                <div className='literaryhub-article-container1'>
                    <Row>
                        {newarticledata.map((data) => (

                            <Col className='literaryhub-content-card'>
                                <Link to={`/literayhub-articles/${data.title}`}>
                                    <Row>

                                        <Col lg='4' sm='6'>
                                            <img src={data.img}alt='literaryhub-cover-img' className='literaryhub-cover-img'></img>
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



            {/* 
            <div className='literaryhub-content2'>

                <div className='literaryhub-article-container2'>

                    {articledata.map((data) => (
                        <Col className='literaryhub-content-card'>
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



            </div> */}



            <div className='literaryhub-hookredirect'>
                <Row className='literaryhub-hookredirect-content'>
                    <Col lg="12" md='6' sm="4" >
                        <h2>Publish Your Article — For Free!</h2>
                        <p className='literaryhub-subtitle'>Have an insight to share? Publish your article with us for free and reach an engaged audience.</p>
                    </Col>

                    <Col lg="12" md='6' sm="4" className=' literaryhub-hookredirect-button'>
                        <Link to={'/literayhub-submission'}>
                            <button>Submit Your Article</button>
                        </Link>
                    </Col  >
                </Row>
            </div>

        </div>
    )
}
