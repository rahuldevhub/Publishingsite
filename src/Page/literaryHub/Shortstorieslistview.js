import React, { useEffect } from 'react'
import './literaryhublistviewstyle.css';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const Shortstorieslistview = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='Shortstorieslistview'>

            <div className='literaryhub-bgimg'>
                <div className='literaryhub-blackdrop'>

                    <div className='literaryhub-title'>Short Stories</div>
                </div>
            </div>


            <div className='literaryhub-content' >
                <h2>Coming soon</h2>
                <div className='literaryhub-article-container1'>
                    {/* <Row>
                        {poemdata.map((data) => (

                            <Col className='literaryhub-content-card'>
                                <Link to={`/literaryhub-poems/${data.title}`}>
                                    <Row>

                                        <Col lg='3' sm='6'>
                                            <img src={data.img} className='literaryhub-cover-img'></img>
                                        </Col>

                                        <Col lg='9' className='literary-cardcontent-col'>
                                            <p className='literaryhub-cardcontent-title'>{data.title}</p>
                                            <p className='literaryhub-cardcontent-description'>{data.description}</p>
                                            <p className='literaryhub-cardcontent-authorname'>{data.authorname}</p>
                                            <p className='literaryhub-cardcontent-posteddate'>Published on: {data.posdate}</p>
                                        </Col>

                                    </Row>
                                </Link>
                            </Col>

                        ))}

                    </Row> */}




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

export default Shortstorieslistview