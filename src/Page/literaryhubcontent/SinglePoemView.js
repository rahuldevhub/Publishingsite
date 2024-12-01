import React, { useEffect } from 'react'
import './style/singlepoemview.css'
import { Row, Col } from 'react-bootstrap'
import poemData from '../../Assets/data/poemdata';
// import dumcover from '../../Assets/cover1.webp';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon,
    XIcon,
} from "react-share";

const SinglePoemView = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { slug } = useParams();

    const singlepoem = poemData.find((item) => item.title === slug);
    return (
        <div className='SinglePoemView'>

            <div className='Poemcontent-margin'>

                <h1 className='poemcontent-title' data-aos="fade-down">{singlepoem.title}</h1>

                <div>
                    <img src={singlepoem.imgUrl} className='poemcontent-coverpic'></img>
                    <Row>
                        <Col lg='8'>
                            {/* {poemcontent.map((data) => ( */}
                            <div key={singlepoem.poem} style={{ marginBottom: '2rem' }}>

                                <p className='poemcontent-content' data-aos="fade-up">
                                    {singlepoem.poem.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}</p></div>
                            {/* ))} */}
                        </Col>

                        <Col lg='4'>
                            <div className='poemcontent-sidecard'>

                                <h4  data-aos="fade-up">Poem Details</h4>

                                <p> {singlepoem.poemSynopsis}</p>
                                <p>Poet: {singlepoem.authorname}</p>
                                <p>Posted Date: {singlepoem.posteddate}</p>
                                <div className="Demo__container">

                                    <div className="Demo__some-network">
                                        <FacebookShareButton url={`https://www.riterapublishing.com/literaryhub-poems/`} className="Demo__some-network__share-button">
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton></div>

                                    <div className="Demo__some-network">
                                        <TwitterShareButton url={`https://www.riterapublishing.com/literaryhub-poems/`} title={singlepoem.title} className="Demo__some-network__share-button">
                                            <XIcon size={32} round />
                                        </TwitterShareButton></div>

                                    <div className="Demo__some-network">

                                        <WhatsappShareButton
                                            url={`https://www.riterapublishing.com/literaryhub-poems/`}
                                            title={singlepoem.title}
                                            separator=":: "
                                            className="Demo__some-network__share-button"
                                        >
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>
                                    </div>

                                    <div className="Demo__some-network">
                                        <LinkedinShareButton
                                            url={`https://www.riterapublishing.com/literaryhub-poems/`}
                                            className="Demo__some-network__share-button"
                                        >
                                            <LinkedinIcon size={32} round />
                                        </LinkedinShareButton>
                                    </div>
                                </div>

                                <hr />
                                <h4>Author Details</h4>
                                <h3 className='poemcontent-sidecard-name'>{singlepoem.authorname}</h3>
                                <p>{singlepoem.authorBio}</p>
                            </div>

                        </Col>
                    </Row>


                </div>


            </div>


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

export default SinglePoemView