import React from 'react'
import './Newrelease.css'
import { Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import jade from '../../Assets/latestrelease/jade.jpg'
import revelations from '../../Assets/latestrelease/revelations.jpg'
const Newrelease = () => {
    return (
        <div className='Newrelease'>
            <h1>Recently Published</h1>

            <div>
                <Row>
                    <Col>
                        <div>
                            <Link>
                                <Card className='Newrelease-container' data-aos="zoom-in-right">
                                    <Card.Body>
                                        <Card.Img variant="jade julep" src={jade} className='Newrelease-img' />
                                        <Card.Text><h1>Jade Julep</h1></Card.Text>
                                        <Card.Text><p>An Anthology</p></Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>
                    </Col>

                    <Col>
                        <div>
                            <Link>
                                <Card className='Newrelease-container' data-aos="zoom-in-left">
                                    <Card.Body>
                                        <Card.Img variant="top" src={revelations} className='Newrelease-img' />
                                        <Card.Text><h1>Revelations of Infinite Life</h1></Card.Text>
                                        <Card.Text><p>Dr. Wesly Abraham</p></Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>


        </div>
    )
}

export default Newrelease