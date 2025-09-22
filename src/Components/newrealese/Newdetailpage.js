import { React, useState, useEffect } from 'react'
import './Newdetailpage.css'
import { Row, Col } from 'react-bootstrap'
// import jade from '../../Assets/latestrelease/jade.jpg'
import revelations from '../../Assets/latestrelease/revelations.jpg'

import { useParams } from 'react-router-dom';
import bookdata from '../../Assets/data/bookdata';
// import ReadMoreReact from 'read-more-react';
import { IoIosStarOutline } from "react-icons/io";
const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text">
            {isReadMore ? text.slice(0, 400) : text}
            <span
                onClick={toggleReadMore}
                className="read-or-hide"
                style={{ color: "#a32525" }}
            >
                {isReadMore ? "...read more" : " show less"}
            </span>
        </p>
    );
};

const ReadMore2 = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text">
            {isReadMore ? text.slice(0, 300) : text}
            <span
                onClick={toggleReadMore}
                className="read-or-hide"
                style={{ color: "green" }}
            >
                {isReadMore ? "...read more" : " show less"}
            </span>
        </p>
    );
};


const Newdetailpage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { slug } = useParams();

    const singlebook = bookdata.find((item) => item.title.toLowerCase().replace(/\s+/g, '-') === slug);



    return (
        <div className='Newdetailpage' id='Newdetailpage'>

            <div>
                <Row>
                    <Col>
                        <img src={singlebook.imgUrl} alt='Book preview' className='Bookpreviewimg'></img>
                    </Col>
                    <Col>
                        <h1 className='booktitle'>{singlebook.title}</h1>
                        <p className='booksubtitle'>{singlebook.subtitle}</p>

                        <p>Author Name: <span className='singlelinecolordark'> {singlebook.authorname}</span> | Format: <span className='singlelinecolordark'>{singlebook.format}</span> | Genre: <span className='singlelinecolordark'>{singlebook.Genre}</span></p>
                        <IoIosStarOutline /> <IoIosStarOutline /> <IoIosStarOutline /> <IoIosStarOutline /> <IoIosStarOutline />
                        <hr />
                        <p className='bookdescription text-formating' >
                            <ReadMore> {singlebook.description} </ReadMore>
                        </p>
                        <h3>Paperback ₹{singlebook.price}</h3>
                        <h2>Avaliable {singlebook.urlbelowcontent} </h2>
                        <hr />
                        {/* <p>Note : {singlebook.urlbelowcontent}</p> */}

                        <button className='Buyonbutton' onClick={() => window.open(`${singlebook.url1}`, '_blank')}>Buy on Amazon</button>
                        <button className='Buyonbutton' onClick={() => window.open(`${singlebook.url2}`, '_blank')}>Buy on Flipkart</button>
                        <button className='Buyonbutton' onClick={() => window.open(`${singlebook.url3}`, '_blank')}>Buy on Pothi</button>
                        <br />

                    </Col>
                </Row>

                <div className='authordetails'>
                    <Row xs='1'>
                        <Col>
                            <img src={singlebook.imgUrl2} alt='Authorprofilepic' className='Authorprofilepic'></img>
                        </Col>
                        <Col>
                            <h3>{singlebook.authorname}</h3>
                            <p className='bookdescription text-formating'>
                                <ReadMore2>{singlebook.authorbio} </ReadMore2>
                            </p>
                        </Col>
                    </Row>
                </div>
            </div>

        </div>
    )
}

export default Newdetailpage