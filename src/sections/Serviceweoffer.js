import React from 'react'
import '../css/serviceweoffer.css'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import sample from '../assets/heart.png'
const Serviceweoffer = () => {

    let servicedata = [
        {
            servicename: 'Proof Reading',
            img: sample
        },
        {
            servicename: 'Copy Writing',
            img: sample
        },
        {
            servicename: 'International',
            img: sample
        },
        {
            servicename: 'Beta reading',
            img: sample
        },
        {
            servicename: 'Marketing',
            img: sample
        }, {
            servicename: 'See all Service',
            img: sample
        },
        // {
        //     servicename: 'Proof Reading',
        //     img: sample
        // },
        // {
        //     servicename: 'Proof Reading',
        //     img: sample
        // },
    ]
    return (
        <div className='serviceweoffer'>
            <p className='title' >Service we offer</p>
            <div className='service'>
                <Row xs={1} md={1} lg={3} className="g-4 servicerow" >
                    {servicedata.map((servicedata) => (

                  

<Link to={'/allservice'}>
                            <Card className='Service-card'>
                                <Card.Body>
                                    <Card.Img variant="top" src={servicedata.img} className='service-card-icon' />
                                    {/* <Card.Text className='service-dash'>
                                        <hr/>
                                      
                                    </Card.Text> */}
                                    <Card.Text className='service-title'>
                                        <p>{servicedata.servicename}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            </Link>
                    ))}
                </Row>
            </div>








        </div>
    )
}

export default Serviceweoffer