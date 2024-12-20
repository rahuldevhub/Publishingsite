import React, { useEffect } from 'react'
import './style/singlearticleview.css'
import { Row, Col } from 'react-bootstrap'
import shortstoryData from '../../Assets/data/shortstorydata';
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


const SingleStoryView = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { slug } = useParams();

    const singlestory = shortstoryData.find((item) => item.title === slug);
    return (
        
        <div className='SingleArticleView'>

            <div className='Poemcontent-margin'>

                <h1 className='articlecontent-title'>{singlestory.title}</h1>

                <div>
                    <img src={singlestory.imgUrl} className='articlecontent-coverpic'></img>
                    <Row>
                        <Col lg='8'>
                            {/* {poemcontent.map((data) => ( */}
                            <div key={singlestory.story} style={{ marginBottom: '2rem' }}>

                                <p className='poemcontent-content'>
                                    {singlestory.story.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}</p></div>
                            {/* ))} */}
                        </Col>

                        <Col lg='4'>
                            <div className='poemcontent-sidecard'>

                                <h4>Story Details</h4>

                                <p> {singlestory.storySynopsis}</p>
                                <p>Author Name: {singlestory.authorname}</p>
                                <p>Posted Date: {singlestory.posteddate}</p>
                                <div className="Demo__container">

                                    <div className="Demo__some-network">
                                        <FacebookShareButton url={`https://www.riterapublishing.com/literayhub-short-stories/`} className="Demo__some-network__share-button">
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton></div>

                                    <div className="Demo__some-network">
                                        <TwitterShareButton url={`https://www.riterapublishing.com/literayhub-short-stories/`} title={singlestory.title} className="Demo__some-network__share-button">
                                            <XIcon size={32} round />
                                        </TwitterShareButton></div>

                                    <div className="Demo__some-network">

                                        <WhatsappShareButton
                                            url={`https://www.riterapublishing.com/literayhub-short-stories/`}
                                            title={singlestory.title}
                                            separator=":: "
                                            className="Demo__some-network__share-button"
                                        >
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>
                                    </div>

                                    <div className="Demo__some-network">
                                        <LinkedinShareButton
                                            url={`https://www.riterapublishing.com/literayhub-short-stories/`}
                                            className="Demo__some-network__share-button"
                                        >
                                            <LinkedinIcon size={32} round />
                                        </LinkedinShareButton>
                                    </div>
                                </div>

                                <hr />
                                <h4>Author Details</h4>
                                <h3 className='poemcontent-sidecard-name'>{singlestory.authorname}</h3>
                                <p>{singlestory.authorBio}</p>
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

export default SingleStoryView