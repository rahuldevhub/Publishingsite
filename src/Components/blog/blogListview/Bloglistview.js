import React, { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import './bloglistview.css'
import Card from 'react-bootstrap/Card';
// import blog from '../../../Assets/blogimg/blog1.webp'
import MediaQuery, { useMediaQuery } from "react-responsive";

import Breadcrumb from "../Breadcrumbs.js";
import { IoIosArrowForward } from "react-icons/io";
import blogdata from '../../../Assets/data/blogdata.js';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Bloglistview = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const crumbs = [
        { label: "Home", path: "/" },
        { label: "Blog", path: null },// current page

    ];
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })

    return (
        <>



        <HelmetProvider>
        
                <Helmet>
        
                  <title>Ritera's Insights as Blog by Top Book Publishing Company in India </title>
                  <meta id="meta-description" name="description" content="Explore Ritera Publishing's blog for Self Publishing tips, trends, and news on  book publishing, e publishing with the top book publishing house in India." />
                  
                  <meta name='robots' content='index,follow' />
                  <meta name='keywords' content='book publishers, publishing houses, amazon book publishing, publishing houses in india, book publishing company near me, publish a book in india, e publishing, amazon and book publishing, publishing company in india, book publishing company in india, book and publishing, book publishing, publication houses india, book publications in india ' />
                  
                  
                  <link rel="canonical" href="https://www.riterapublishing.com/blog" />
        
                    
                    
                    <meta property="og:title" content="Explore the Blogs about Publishing from Ritera Publishing India" />
                    <meta property="og:description" content="Read the blogs on book publishing, amazon book publishing, self publishing in India, and tips from Ritera one of top self book publishing houses in India." />
                    <meta property="og:image" content="https://www.riterapublishing.com/static/media/logo.811019c4d0bbf0600926.webp" />
                    <meta property="og:url" content="https://riterapublishing.com/blog" />
                    <meta property="og:type" content="website" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Ritera Publishing Blog | Self-Publishing Tips & Trends" />
                    <meta name="twitter:description" content="Get expert insights on publishing your book, from Amazon publishing to self-publishing tips, directly from Ritera’s blog." />
                    <meta name="twitter:image" content="https://www.riterapublishing.com/static/media/logo.811019c4d0bbf0600926.webp" />
                    <meta name="twitter:url" content="https://www.riterapublishing.com/blog" />

                    <script type="application/ld+json">
                        {`
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Ritera Insights",
          "url": "https://www.riterapublishing.com/blog",
          "description": "Explore publishing tips, self-publishing guides, and industry updates from Ritera Publishing.",
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
                <div className='Bloglistview'>
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
                                        {blogdata.slice(0, 4).map((data) => (
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
                                    <h1>Ritera Publishing Blog – Insights, Tips & Industry News</h1>


                                    <div>
                                        <Row className='Bloglistview-card-row'>
                                            {blogdata.slice().reverse().map((data) => (


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
                <div className='Bloglistview'>
                    <Col lg='9' className='Bloglistview-right-col'>
                        <div className='Bloglistview-rightdiv'>
                            <Breadcrumb crumbs={crumbs} />
                            <h1>Blogs</h1>
                            <div className='Bloglistview-leftdiv'>
                                <h3>Our Blogs</h3>
                                <ul className='Bloglistview-leftdiv-components'>
                                    <Link to='/blog'><li> <IoIosArrowForward /> All Blogs</li></Link>
                                    <Link to='/blog-category/our-books'> <li> <IoIosArrowForward /> Our Books</li></Link>
                                    <Link to='/blog-category/inside-ritera'><li> <IoIosArrowForward /> Inside Ritera</li></Link>
                                    <Link to='/blog-category/self-publishing'><li> <IoIosArrowForward /> Self Publishing</li></Link>
                                </ul><hr />

                            </div>

                            <div>
                                <div className='Bloglistview-card-row'>
                                    {blogdata.slice().reverse().map((data) => (


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

export default Bloglistview