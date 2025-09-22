import React, { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Breadcrumb from "../Breadcrumbs.js";
// import blog from '../../../Assets/blogimg/blog1.webp'
import { IoIosArrowForward } from "react-icons/io";
import './Blogsingleview.css'
import blogdata from '../../../Assets/data/blogdata.js';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MediaQuery, { useMediaQuery } from "react-responsive";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const BlogSingleview = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { slug } = useParams();
    const singleblog = blogdata.find((item) => item.title === slug);

    const crumbs = [
        { label: "Home", path: "/" },
        { label: "Blog", path: "/blog" },
        { label: `${singleblog.category}`, path: `/blog-category/${singleblog.category}` },// current page

    ];
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })
    return (
        <>

            <HelmetProvider>

                <Helmet>

                    <title>{singleblog.title}</title>
                    <meta id="meta-description" name="description" content={singleblog.metadescription} />
                    <meta name='robots' content='index,follow' />
                    <meta name='keywords' content='self publishing, service, books, authors, reader ,free publishing, cover design, manuscript, ritera, publishing company, customized package ' />

                    {singleblog.schema}


                </Helmet>

            </HelmetProvider>
            {isDesktopOrLaptop &&
                <div className='BlogSingleview'>
                    <Container className='bloglistview-container'>

                        <Row>
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


                            <Col lg='8' className='BlogSingleview-right-col'>

                                <div className='breadcrumbs'> <Breadcrumb crumbs={crumbs} /></div>



                                <>
                                    <h2 className='Blogcontenttitle'>{singleblog.title}</h2>

                                    <p className='Blogcontentsubtitle'> {singleblog.subtitle}</p>

                                    <img src={singleblog.imgUrl} className='Blogcontentimg' alt='Blogcontentimg'></img>

                                    <div className='Blogcontentdescription'>
                                        {singleblog.content
                                            .trim()
                                            .split("\n\n")
                                            .map((block, index) => {
                                                if (block.startsWith("## ")) {
                                                    return <h2 key={index}>{block.replace("## ", "")}</h2>;
                                                }
                                                return <p key={index}>{block}</p>;
                                            })}


                                    </div>
                                </>



                            </Col>
                        </Row>

                    </Container>
                </div>
            }
            {isTaborMobile &&
                <Col lg='8' className='BlogSingleview-right-col'>

                    <div className='breadcrumbs'> <Breadcrumb crumbs={crumbs} /></div>



                    <>
                        <h2 className='Blogcontenttitle'>{singleblog.title}</h2>

                        <p className='Blogcontentsubtitle'> {singleblog.subtitle}</p>

                        <img src={singleblog.imgUrl} className='Blogcontentimg' alt='Blogcontentimg'></img>

                        <div className='Blogcontentdescription'
                            dangerouslySetInnerHTML={{ __html: singleblog.content }}
                        >


                        </div>
                    </>



                </Col>
            }

        </>

    )
}

export default BlogSingleview