import React,{useEffect} from 'react'
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

const Ourbooks = () => {
     useEffect(() => {
                window.scrollTo(0, 0);
            }, []);
    const crumbs = [
        { label: "Home", path: "/" },
        { label: "Blog", path: "/blog" },
        { label: "Our-Books", path: null }, // current page

    ];
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })
    return (
        <>


        <HelmetProvider>
        
                <Helmet>
        
                  <title>Discover Books Published by Ritera the Best Publishing Company</title>
                  <meta id="meta-description" name="description" content="Explore books published by Ritera Publishing – a top book publishing company in India offering free publishing and professional self publishing services." />
                  
                  <meta name='robots' content='index,follow' />
                  <meta name='keywords' content='book publishers, publishing houses, amazon book publishing, publishing houses in india, book publishing company near me, publish a book in india, e publishing, amazon and book publishing, publishing company in india, book publishing company in india, book and publishing, book publishing, publication houses india, book publications in india ' />
                  
                  <meta id="og-title" property="og:title" content="Discover Books Published by Ritera the Best Publishing Company" />
                  <link rel="canonical" href="https://www.riterapublishing.com/blog-category/our-books" />
        
                </Helmet>
        
              </HelmetProvider>

        {isDesktopOrLaptop &&
            <div className='Ourbooks'>
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
                                <h1>Explore Books Published by Ritera – Quality Meets Creativity</h1>


                                <div>
                                    <Row className='Bloglistview-card-row'>
                                        {blogdata
                                    .filter(item => item.category === "Our-Books")
                                        
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
        <div className='Ourbooks'>
            <Col lg='9' className='Bloglistview-right-col'>
                <div className='Bloglistview-rightdiv'>
                    <Breadcrumb crumbs={crumbs} />
                    <h1>Blogs</h1>
                

                    <div>
                        <div className='Bloglistview-card-row'>
                            {blogdata
                                .filter(item => item.category === "Our-Books")

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

export default Ourbooks