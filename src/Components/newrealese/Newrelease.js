import React from 'react'
import './Newrelease.css'
import { Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
// import jade from '../../Assets/latestrelease/jade.jpg'
// import revelations from '../../Assets/latestrelease/revelations.jpg'
import bookdata from '../../Assets/data/bookdata';
const Newrelease = () => {
    return (
        <div className='Newrelease'>
            <h1>Recently Published</h1>

            <div>
                <Row xs='2'>
      {bookdata.map((data)=>(
                    <Col xs='6'>                   
                           <Link to={`/books/${data.title}`}>
                                <Card className='Newrelease-container' >
                            
                                    <Card.Body>
                                        <Card.Img variant="jade julep" src={data.imgUrl} className='Newrelease-img' />
                                        <Card.Text><h1>{data.title}</h1></Card.Text>
                                        <Card.Text><p>{data.subtitle}</p></Card.Text>
                                    </Card.Body>
                                   
                                </Card>
                                </Link>
                   
                    </Col>
                ))}

                    {/* <Col xs='6'>
                       
                    <Link to={`/books/${'Revelations of Infinite Life'}`}>
                        
                                <Card className='Newrelease-container' data-aos="zoom-in-left">
                                    <Card.Body>
                                        <Card.Img variant="top" src={revelations} className='Newrelease-img' />
                                        <Card.Text><h1>Revelations of Infinite Life</h1></Card.Text>
                                        <Card.Text><p>Dr. Wesly Abraham</p></Card.Text>
                                    </Card.Body>
                                </Card>
                                </Link>
                        
                    </Col> */}
                </Row>
            </div>


        </div>
    )
}

export default Newrelease