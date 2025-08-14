import React, { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import poemData from '../../../Assets/data/poemdata';
import { IoIosArrowForward } from "react-icons/io";
import Breadcrumb from '../../blog/Breadcrumbs.js'
import './scriblysingleview.css'

import litspace from '../../../Assets/data/litspacedata.js';
import MediaQuery, { useMediaQuery } from "react-responsive";

import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    FacebookIcon,
    LinkedinIcon,
    WhatsappIcon,

    XIcon,
} from "react-share";

const Scriblysingleview = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { slug } = useParams();
    const singlelitspace = litspace.find((item) => item.title.toLowerCase().replace(/\s+/g, '-') === slug);

    const crumbs = [
        { label: "Home", path: "/" },
        { label: "Litspace", path: "/litspace" },
        { label: `${singlelitspace.category}`, path: null }, // current page
    ];
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })
    return (
        <>
            {isDesktopOrLaptop &&
                <div className='Scriblysingleview'>
                    <div className='litspacesingleview-pad'>
                        <Container className='bloglistview-container'>

                            <Row>
                                <Col lg='2' className='litspace-singleview-right-col vl'>

                                    <div className='litspacelistview-leftdiv'>
                                        <h3 className='litspacelistview-left-right-heading'>Our write-ups</h3>
                                        <ul className='Bloglistview-leftdiv-components'>
                                            <Link to='/litspace'> <li> <IoIosArrowForward /> All writeups</li></Link>
                                            <Link to='/litspace-category/poem'> <li> <IoIosArrowForward /> Poems</li></Link>
                                            <Link to='/litspace-category/article'><li> <IoIosArrowForward /> Articles</li></Link>
                                            <Link to='/litspace-category/short-story'><li> <IoIosArrowForward /> Short Stories</li></Link>
                                        </ul><hr />
                                        <h3>Trending Blogs</h3>
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

                                <Col lg='7' className='litspaceSingleview-mid-col vl'>

                                    <div className='breadcrumbs'> <Breadcrumb crumbs={crumbs} /></div>

                                    <>
                                        <h2 className='Blogcontenttitle'>{singlelitspace.title}</h2>



                                        <img src={singlelitspace.imgUrl} className='Blogcontentimg' alt='Blogcontentimg'></img>


                                        {singlelitspace.category === "Article" || singlelitspace.category === 'Short-Story' ? (
                                            <div
                                                className="Blogcontentdescription article-alignment"
                                                dangerouslySetInnerHTML={{ __html: singlelitspace.content }}
                                            />
                                        ) : (
                                            <div className="poem-wrapper poem-alignment">

                                                <p className="poemcontent-content" data-aos="fade-up">
                                                    {singlelitspace.poem.split('\n').map((line, i) => (
                                                        <span key={i}>{line}<br /></span>
                                                    ))}
                                                </p>
                                            </div>
                                        )}





                                    </>




                                </Col>


                                <Col lg='3' className='litspace-singleview-right-col'>
                                    <div className='Bloglistview-leftdiv'>
                                        <h3 className='litspacelistview-left-right-heading'>About</h3>
                                        <p className='Blogcontentsubtitle'>{singlelitspace.Synopsis}</p>
                                        <div className="Demo__container">

                                            <div className="Demo__some-network">
                                                <FacebookShareButton url={`https://www.riterapublishing.com/litspace/${singlelitspace.title}`} className="Demo__some-network__share-button">
                                                    <FacebookIcon size={32} round />
                                                </FacebookShareButton></div>

                                            <div className="Demo__some-network">
                                                <TwitterShareButton url={`https://www.riterapublishing.com/litspace/${singlelitspace.title}`} title={singlelitspace.title} className="Demo__some-network__share-button">
                                                    <XIcon size={32} round />
                                                </TwitterShareButton></div>

                                            <div className="Demo__some-network">

                                                <WhatsappShareButton
                                                    url={`https://www.riterapublishing.com/litspace/${singlelitspace.title}`}
                                                    title={singlelitspace.title}
                                                    separator=":: "
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <WhatsappIcon size={32} round />
                                                </WhatsappShareButton>
                                            </div>

                                            <div className="Demo__some-network">
                                                <LinkedinShareButton
                                                    url={`https://www.riterapublishing.com/litspace/${singlelitspace.title}`}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <LinkedinIcon size={32} round />
                                                </LinkedinShareButton>
                                            </div>
                                        </div>
                                        <hr />
                                        <h3>Author Details</h3>
                                        <p className='Blogcontentsubtitle'>{singlelitspace.authorBio}</p>


                                    </div>
                                </Col>


                            </Row>
                        </Container>
                    </div>
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
                </div>
            }
            {isTaborMobile &&
                <div className='Scriblysingleview'>
                    <div className='litspacesingleview-pad'>
                        <Container className='bloglistview-container'>

                            <Row>


                                <Col lg='7' className='litspaceSingleview-mid-col vl'>

                                    <div className='breadcrumbs'> <Breadcrumb crumbs={crumbs} /></div>

                                    <>
                                        <h2 className='Blogcontenttitle'>{singlelitspace.title}</h2>



                                        <img src={singlelitspace.imgUrl} className='Blogcontentimg' alt='Blogcontentimg'></img>


                                        {singlelitspace.category === "Article" || singlelitspace.category === 'Short-Story'? (
                                            <div
                                                className="Blogcontentdescription article-alignment"
                                                dangerouslySetInnerHTML={{ __html: singlelitspace.content }}
                                            />
                                        ) : (
                                            <div className="poem-wrapper poem-alignment">

                                                <p className="poemcontent-content" data-aos="fade-up">
                                                    {singlelitspace.poem.split('\n').map((line, i) => (
                                                        <span key={i}>{line}<br /></span>
                                                    ))}
                                                </p>
                                            </div>
                                        )}

                                    </>




                                </Col>


                                <Col lg='3' className='litspace-singleview-right-col'>
                                    <div className='Bloglistview-leftdiv'>
                                        <h3 className='litspacelistview-left-right-heading'>About</h3>
                                        <p className='Blogcontentsubtitle'>{singlelitspace.Synopsis}</p>
                                        <div className="Demo__container">

                                            <div className="Demo__some-network">
                                                <FacebookShareButton url={`https://www.riterapublishing.com/litspace/${singlelitspace.title}`} className="Demo__some-network__share-button">
                                                    <FacebookIcon size={32} round />
                                                </FacebookShareButton></div>

                                            <div className="Demo__some-network">
                                                <TwitterShareButton url={`https://www.riterapublishing.com/litspace/${singlelitspace.title}`} title={singlelitspace.title} className="Demo__some-network__share-button">
                                                    <XIcon size={32} round />
                                                </TwitterShareButton></div>

                                            <div className="Demo__some-network">

                                                <WhatsappShareButton
                                                    url={`https://www.riterapublishing.com/litspace/${singlelitspace.title}`}
                                                    title={singlelitspace.title}
                                                    separator=":: "
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <WhatsappIcon size={32} round />
                                                </WhatsappShareButton>
                                            </div>

                                            <div className="Demo__some-network">
                                                <LinkedinShareButton
                                                    url={`https://www.riterapublishing.com/litspace/${singlelitspace.title}`}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <LinkedinIcon size={32} round />
                                                </LinkedinShareButton>
                                            </div>
                                        </div>
                                        <hr />
                                        <h3>Author Details</h3>
                                        <p className='Blogcontentsubtitle'>{singlelitspace.authorBio}</p>


                                    </div>
                                </Col>


                            </Row>
                        </Container>
                    </div>

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
                </div>
            }
        </>
    )
}

export default Scriblysingleview