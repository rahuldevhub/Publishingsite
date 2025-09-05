import React, { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
// import poemData from '../../../Assets/data/poemdata';
import { IoIosArrowForward } from "react-icons/io";
import Breadcrumb from '../../blog/Breadcrumbs.js'
// import './scriblysingleview.css'
import '../scriblysingleview/scriblysingleview.css'
import Card from 'react-bootstrap/Card';
import  { useMediaQuery } from "react-responsive";


import litspace from '../../../Assets/data/litspacedata.js';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Articlewriteups = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const crumbs = [
        { label: "Home", path: "/" },
        { label: "Litspace", path: "/litspace" },
        { label: "Articles", path: null },// current page

    ];
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })
    return (
        <>
        <HelmetProvider>
        
                <Helmet>
        
                  <title>Articles by Creative Writers – Publish with Ritera Publishing India</title>
                  <meta id="meta-description" name="description" content="Read thought-provoking articles on LitSpace. Start your journey with Ritera – a leading publishing company in India offering affordable e publishing." />
                  
                  <meta name='robots' content='index,follow' />
                  <meta name='keywords' content='book publishers, publishing houses, amazon book publishing, publishing houses in india, book publishing company near me, publish a book in india, e publishing, amazon and book publishing, publishing company in india, book publishing company in india, book and publishing, book publishing, publication houses india, book publications in india ' />
                  
                  <link rel="canonical" href="https://www.riterapublishing.com/litspace-category/article" />
        
        
                    <meta property="og:title" content="Writer Articles | Litspace by Ritera Publishing" />
                    <meta property="og:description" content="Explore articles and essays from writers supported by Ritera Publishing through Litspace, a leading best self publishing company in India." />
                    <meta property="og:image" content="https://www.riterapublishing.com/static/media/logo.811019c4d0bbf0600926.webp" />
                    <meta property="og:url" content="https://riterapublishing.com/litspace-category/article" />
                    <meta property="og:type" content="website" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Creative Articles on LitSpace – Start Writing with Ritera" />
                    <meta name="twitter:description" content="Browse thoughtful articles from Indian authors and publish your own work with Ritera Publishing – the top self publishing house." />
                    <meta name="twitter:image" content="https://www.riterapublishing.com/static/media/logo.811019c4d0bbf0600926.webp" />
                    <meta name="twitter:url" content="https://www.riterapublishing.com/litspace-category/article" />

                    <script type="application/ld+json">
                     {`
                    {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Articles – LitSpace by Ritera Publishing",
                        "description": "Explore unique articles and thought-provoking writing from Indian authors through LitSpace. Publish your own with Ritera Publishing.",
                        "url": "https://www.riterapublishing.com/litspace-category/article",
                        "publisher": {
                        "@type": "Organization",
                        "name": "Ritera Publishing",
                        "url": "https://www.riterapublishing.com"
                        }
                    }
                    `}
                    </script>

                </Helmet>
        
              </HelmetProvider>
        {isDesktopOrLaptop &&
            <div className='Articlewriteups'>
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
                                        < Link to={`/litspace/${data.title.toLowerCase().replace(/\s+/g, '-')}`} >

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

                                <h1>Explore Articles by Writers – Begin Your Publishing Journey with Ritera</h1>


                                <div>
                                    <Row className='Bloglistview-card-row'>
                                        {litspace
                                         .filter(item => item.category === 'Article')
                                        .slice().reverse().map((data) => (


                                            <Card className='litspacelistview-card' >
                                                <Link to={`/litspace/${data.title.toLowerCase().replace(/\s+/g, '-')}`} >
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
            <div className='Articlewriteups'>
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
                                 .filter(item => item.category === 'Article')
                                .slice().reverse().map((data) => (


                                    <Card className='litspacelistview-card' >
                                        <Link to={`/litspace/${data.title.toLowerCase().replace(/\s+/g, '-')}`} >
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

export default Articlewriteups