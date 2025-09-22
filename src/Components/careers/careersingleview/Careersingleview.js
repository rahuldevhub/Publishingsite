import React, { useEffect } from 'react'
import careerdata from '../../../Assets/data/careerdata';
import { useParams } from 'react-router-dom';
import Breadcrumb from "../../blog/Breadcrumbs.js";
import './Careersingleview.css';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const Careersingleview = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { slug } = useParams();
    const singlecareer = careerdata.find((item) => item.Jobtitle.toLowerCase().replace(/\s+/g, '-') === slug);

    const crumbs = [
        { label: "Home", path: "/" },
        { label: "Job listing", path: "/careers" },
        { label: "Job details", path: null },// current page

    ];
    return (
        <div className='Careersingleview'>
            <div className='Careersingleview-topportion'>
                <h2 className='Careersingleview-title'>Ritera Publishing | Full time</h2>
                <h1 className='Careersingleview-jobtitle'>{singlecareer.Jobtitle}</h1>
                <Link to="https://forms.gle/H5nLLjfbCiYX9vCK7"><button className='Careersingleview-button'>I'm Interested</button></Link>
            </div>
            <div className='Careersingleview-bottomportion'>


                <div className='breadcrumbs-careers'> <Breadcrumb crumbs={crumbs} /></div>
                <hr />
                <Row>
                    <Col className='vl'>
                        <h2 className='Careersingleview-title2'>Job Description</h2>
                        {singlecareer.jobdescription
                            .trim()
                            .split('\n')
                            .map((point, index) => (
                                <li key={index} className='jdpoints'>{point.trim()} </li>
                            ))}
                            <hr className='jdwhhr'/>

                             <h2 className='Careersingleview-title2'>What we look forward to from you</h2>
                        {singlecareer.whatwelook
                            .trim()
                            .split('\n')
                            .map((point, index) => (
                                <li key={index} className='jdpoints'>{point.trim()} </li>
                            ))}
                    </Col>
                    <Col>

                        <h2 className='Careersingleview-title2'>Job Description</h2>
                        <h3 className='Careersingleview-subtitle2'>Country</h3>
                        <p className='Careersingleview-content'>India</p>
                        <h3 className='Careersingleview-subtitle2'>Industry</h3>
                        <p className='Careersingleview-content'>Self-publishing</p>
                        <h3 className='Careersingleview-subtitle2'> Job Type</h3>
                        <p className='Careersingleview-content'>Full time</p>




                    </Col>
                </Row>


            </div>

        </div>
    )
}

export default Careersingleview