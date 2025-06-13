import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import allemployeename from '../../Assets/data/employeedata'


const EmployeeId = () => {
    const {slug} = useParams();
    const singlemployee = allemployeename.find((item) => item.name === slug);
    return (
        <div className='EmployeeId'>
            <div>
                <Row>
                    <Col >
             
                        <Card className='Employee-container' >



                            <Card.Body>
                                {/* <Card.Img variant="employeeid" src={data.imgUrl} className='Newrelease-img' /> */}
                                <Card.Text><h1>{singlemployee.name}</h1></Card.Text>
                                <Card.Text><p>Cheif Technical officer</p></Card.Text>
                            </Card.Body>

                        </Card>
                    
                    </Col>
                    <Col>
                        <h1>About company</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default EmployeeId