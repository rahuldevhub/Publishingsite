import React, { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
// import './bloglistview.css'
import Card from 'react-bootstrap/Card';
// import blog from '../../../Assets/blogimg/blog1.webp'
import Breadcrumb from "../Breadcrumbs.js";
import { IoIosArrowForward } from "react-icons/io";
import blogdata from '../../../Assets/data/blogdata.js';
import { Link } from 'react-router-dom';

import MediaQuery, { useMediaQuery } from "react-responsive";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Insideritera = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const crumbs = [
        { label: "Home", path: "/" },
        { label: "Blog", path: "/blog" },
        { label: "Inside-Ritera", path: null },// current page

    ];
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })
    return (
        <>
              <HelmetProvider>
                
                        <Helmet>
                
                          <title> Inside Ritera Publishing – Stories from best Self Publishing House</title>
                          <meta id="meta-description" name="description" content="Go behind the scenes with Ritera Publishing – a trusted book publishing house in India offering quality services in e publishing and amazon publishing." />
                          
                          <meta name='robots' content='index,follow' />
                          <meta name='keywords' content='book publishers, publishing houses, amazon book publishing, publishing houses in india, book publishing company near me, publish a book in india, e publishing, amazon and book publishing, publishing company in india, book publishing company in india, book and publishing, book publishing, publication houses india, book publications in india ' />
                          <link rel="canonical" href="https://www.riterapublishing.com/blog-category/inside-ritera" />
                
                
                    <meta property="og:title" content="Inside Ritera the Top Self Book Publishing House - Culture & News" />
                    <meta property="og:description" content="Go behind the scenes at Ritera Publishing, a top self book publishing house in India. Meet our team and see how we support writers in the world." />
                    <meta property="og:image" content="https://www.riterapublishing.com/static/media/logo.811019c4d0bbf0600926.webp" />
                    <meta property="og:url" content="https://riterapublishing.com/blog-category/inside-ritera" />
                    <meta property="og:type" content="website" />


                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Inside Ritera Publishing | Behind the Scenes at India's Top Book Publishing House" />
                    <meta name="twitter:description" content="See the faces and stories that power Ritera Publishing. Discover our team, our culture, and how we help authors shine." />
                    <meta name="twitter:image" content="https://www.riterapublishing.com/static/media/logo.811019c4d0bbf0600926.webp" />
                    <meta name="twitter:url" content="https://www.riterapublishing.com/blog-category/inside-ritera" />

                    <script type="application/ld+json">
                        {`
                            {
                            "@context": "https://schema.org",
                            "@type": "CollectionPage",
                            "name": "Inside Ritera",
                            "description": "Behind-the-scenes stories and culture from Ritera Publishing – India’s trusted self-publishing house.",
                            "url": "https://www.riterapublishing.com/blog-category/inside-ritera",
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
                <div className='Insideritera'>
                    <Container className='bloglistview-container'>
                        <Row >


                            <Col lg='3' className='Bloglistview-left-col vl'>

                                <div className='Bloglistview-leftdiv'>
                                    <h3>Our Blogs</h3>
                                    <ul className='Bloglistview-leftdiv-components'>

                                        <Link to='/blog'><li> <IoIosArrowForward /> All Blogs</li></Link>
                                        <Link to='/blog-category/our-books'> <li> <IoIosArrowForward /> Our Books</li></Link>
                                        <Link to='/blog-category/inside-ritera'><li> <IoIosArrowForward /> Inside Ritera</li></Link>
                                        <Link to='/blog-category/self-publishing'><li> <IoIosArrowForward /> Self Publishing</li></Link>

                                    </ul><hr />
                                    <h3>Trending Blogs</h3>
                                    <div className='trendingblog'>
                                        {blogdata
                                    .filter(item => item.category === "Inside-Ritera")
                                        
                                        .slice(0, 4).map((data) => (
                                            < Link to={`/blog/${data.title}`} >

                                                <Row className='trendingblog-card'>
                                                    <Col lg='4'>
                                                        <img src={data.imgUrl} alt='blogimg' className='trendingblog-img' />
                                                    </Col>
                                                    <Col lg='8' >
                                                        <p className='trendingblog-title'>{data.title}</p>
                                                        <p className='trendingblog-subtitle'> {data.subtitle}</p>
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
                                    <h1>Blogs</h1>
                                    <h1>Behind the Scenes at Ritera – Stories, Culture & Vision</h1>


                                    <div>
                                        <Row className='Bloglistview-card-row'>
                                            {blogdata
                                            .filter(item => item.category === "Inside-Ritera")
                                            .slice().reverse().map((data) => (


                                                <Card className='Bloglistview-card' >
                                                    <Link to={`/blog/${data.title}`} >
                                                        <Card.Body className='Bloglistview-card-body'>
                                                            <Card.Img variant="jade julep" src={data.imgUrl} className='Bloglistview-img' />
                                                            <Card.Text><p>{data.title} </p></Card.Text>
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
             <div className='Insideritera'>
                <Col lg='9' className='Bloglistview-right-col'>
                    <div className='Bloglistview-rightdiv'>
                        <Breadcrumb crumbs={crumbs} />
                        <h1>Blogs</h1>
                    

                        <div>
                            <div className='Bloglistview-card-row'>
                                {blogdata
                                    .filter(item => item.category === "Inside-Ritera")

                                    .slice().reverse().map((data) => (


                                        <Card className='Bloglistview-card' >
                                            <Link to={`/blog/${data.title}`} >
                                                <Card.Body className='Bloglistview-card-body'>
                                                    <Card.Img variant="jade julep" src={data.imgUrl} className='Bloglistview-img' />
                                                    <Card.Text><p>{data.title} </p></Card.Text>
                                                </Card.Body>

                                            </Link>
                                        </Card>

                                    ))}

                            </div>
                        </div>


                    </div>
                </Col>
                </div>
            }
        </>
    )
}

export default Insideritera