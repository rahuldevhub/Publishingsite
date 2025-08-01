import React, { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
// import poemData from '../../../Assets/data/poemdata';
import { IoIosArrowForward } from "react-icons/io";
import Breadcrumb from '../../blog/Breadcrumbs.js'
import '../scriblysingleview/scriblysingleview.css'
import Card from 'react-bootstrap/Card';

import litspace from '../../../Assets/data/litspacedata.js';
import  { useMediaQuery } from "react-responsive";
import { Helmet, HelmetProvider } from 'react-helmet-async';


const Storywriteups = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const crumbs = [
        { label: "Home", path: "/" },
        { label: "Litspace", path: "/litspace" },
        { label: "Short-Stories", path: null },// current page

    ];

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })
    return (
        <>
        <HelmetProvider>
                
                        <Helmet>
                
                          <title>Short Stories That Inspire – Start Your Self Publishing Journey</title>
                          <meta id="meta-description" name="description" content="Discover engaging short stories from talented writers. Publish your Book own with Ritera Publishing – one of the best publishing houses in India" />
                          
                          <meta name='robots' content='index,follow' />
                          <meta name='keywords' content='book publishers, publishing houses, amazon book publishing, publishing houses in india, book publishing company near me, publish a book in india, e publishing, amazon and book publishing, publishing company in india, book publishing company in india, book and publishing, book publishing, publication houses india, book publications in india ' />
                          
                          <meta id="og-title" property="og:title" content="Short Stories That Inspire – Start Your Self Publishing Journey" />
                          <link rel="canonical" href="https://www.riterapublishing.com/litspace-category/short-story" />
                
                        </Helmet>
                
                      </HelmetProvider>
        {isDesktopOrLaptop &&
            <div className='Storywriteups'>
                <div className="litspace-marquee">
                    <marquee behavior="scroll" direction="left" scrollamount="4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <span key={index} style={{ marginRight: '40px', display: 'inline-flex', alignItems: 'center' }}>
                                Share your creativity on Litspace — publish your content for the world to see!
                                <button
                                    onClick={() => window.location.href = 'https://forms.zohopublic.in/riterapublishinggm1/form/Litspacesubmission/formperma/vfIvlvRtcQehjCWABZfqOMTxORNtAWtzasVCC_JCyXc'}
                                    style={{
                                        marginLeft: '10px',
                                        padding: '4px 10px',
                                        backgroundColor: '#6A1B1B',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Submit Now
                                </button>
                            </span>
                        ))}
                    </marquee>
                </div>

                <Container className='bloglistview-container'>
                    <Row >


                        <Col lg='3' className='Bloglistview-left-col vl'>

                            <div className='Bloglistview-leftdiv'>
                                <h3>Our Write-ups</h3>
                                <ul className='Bloglistview-leftdiv-components'>
                                    <Link to='/litspace'> <li> <IoIosArrowForward /> All writeups</li></Link>
                                    <Link to='/litspace-category/poem'> <li> <IoIosArrowForward /> Poems</li></Link>
                                    <Link to='/litspace-category/article'><li> <IoIosArrowForward /> Articles</li></Link>
                                    <Link to='/litspace-category/short-story'><li> <IoIosArrowForward /> Short Stories</li></Link>
                                </ul><hr />
                                <h3>Trending Write-ups</h3>
                                <div className='trendingblog'>
                                    {litspace.slice(0, 4).map((data) => (
                                        < Link to={`/litspace/${data.title}`} >

                                            <Row className='trendingblog-card'>
                                                <Col lg='4'>
                                                    <img src={data.imgUrl} alt='blogimg' className='trendingblog-img' />
                                                </Col>
                                                <Col lg='8' >
                                                    <p className='trendingblog-title'>{data.title}</p>
                                                    <p className='trendingblog-subtitle'> {data.Synopsis}</p>
                                                </Col>
                                            </Row>
                                        </Link>
                                    ))}


                                </div>
                            </div>
                        </Col>


                        <Col lg='9' className='Bloglistview-right-col'>
                            <div className='Bloglistview-rightdiv'>
                                <Breadcrumb crumbs={crumbs} />
                                <h1>Litspace</h1>

                                <h1 >Inspiring Short Stories by New Authors – Publish Yours Today</h1>


                                <div>
                                    <Row className='Bloglistview-card-row'>
                                        {litspace
                                         .filter(item => item.category === 'Short-Story')
                                        .slice().reverse().map((data) => (


                                            <Card className='litspacelistview-card' >
                                                <Link to={`/litspace/${data.title}`} >
                                                    <Card.Body className='Bloglistview-card-body'>
                                                        <Card.Img variant="jade julep" src={data.imgUrl} className='Bloglistview-img' />
                                                        <Card.Text><p className='litspacelistview-card-title'>{data.title} </p></Card.Text>
                                                        <Card.Text><p className='litspacelistview-card-category'>{data.category} </p></Card.Text>

                                                    </Card.Body>

                                                </Link>
                                            </Card>

                                        ))}




                                    </Row>
                                </div>


                            </div>
                        </Col>

                    </Row>
                </Container>



            </div>
        }
        {isTaborMobile &&
            <div className='Storywriteups'>
                <div className="litspace-marquee">
                <marquee behavior="scroll" direction="left" scrollamount="4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <span key={index} style={{ marginRight: '40px', display: 'inline-flex', alignItems: 'center' }}>
                                Share your creativity on Litspace — publish your content for the world to see!
                                <button
                                    onClick={() => window.location.href = 'https://forms.zohopublic.in/riterapublishinggm1/form/Litspacesubmission/formperma/vfIvlvRtcQehjCWABZfqOMTxORNtAWtzasVCC_JCyXc'}
                                    style={{
                                        marginLeft: '10px',
                                        padding: '4px 10px',
                                        backgroundColor: '#6A1B1B',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Submit Now
                                </button>
                            </span>
                        ))}
                    </marquee>
                </div>
                <Col lg='9' className='Bloglistview-right-col'>
                    <div className='Bloglistview-rightdiv'>
                        <Breadcrumb crumbs={crumbs} />
                        <h1>Litspace</h1>


                        <div>
                            <Row className='Bloglistview-card-row'>
                                {litspace
                                 .filter(item => item.category === 'Short-Story')
                                .slice().reverse().map((data) => (


                                    <Card className='litspacelistview-card' >
                                        <Link to={`/litspace/${data.title}`} >
                                            <Card.Body className='Bloglistview-card-body'>
                                                <Card.Img variant="jade julep" src={data.imgUrl} className='Bloglistview-img' />
                                                <Card.Text><p className='litspacelistview-card-title'>{data.title} </p></Card.Text>
                                                <Card.Text><p className='litspacelistview-card-category'>{data.category} </p></Card.Text>

                                            </Card.Body>

                                        </Link>
                                    </Card>

                                ))}




                            </Row>
                        </div>


                    </div>
                </Col>
            </div>
        }
        <div className='litspace-hookredirect'>
            <Row className='litspace-hookredirect-content'>
                <Col lg="12" md='6' sm="4" >
                    <h2>Publish What You Think — It’s Free!</h2>
                    <p className='litspace-subtitle'>Have ideas or stories? Share them on Litspace and get noticed by a curious audience.</p>
                </Col>

                <Col lg="12" md='6' sm="4" className=' litspace-hookredirect-button'>
                    <Link to={'https://forms.zohopublic.in/riterapublishinggm1/form/Litspacesubmission/formperma/vfIvlvRtcQehjCWABZfqOMTxORNtAWtzasVCC_JCyXc'} target='blank'>
                        <button>Submit Your Work</button>
                    </Link>
                </Col  >
            </Row>
        </div>

    </>
    )
}

export default Storywriteups