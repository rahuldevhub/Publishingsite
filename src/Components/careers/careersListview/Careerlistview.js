import React from 'react'
import '../careersListview/careerlistview.css'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import careerdata from '../../../Assets/data/careerdata';
import { Link } from 'react-router-dom';

const Careerlistview = () => {
 
  return (
    <div className='Careerlistview'>
<>

      <HelmetProvider>

        <Helmet>

          <title>Careers at Ritera Publishing | Join Our Innovative Tech Team</title>
          <meta id="meta-description" name="description" content="Explore exciting career opportunities at Ritera Publishing. We're hiring passionate professionals in software development, UI/UX, and digital innovation." />
          <meta name='robots' content='index,follow' />
          <meta name='keywords' content='self publishing, service, books, authors, reader ,free publishing, cover design, manuscript, ritera, publishing company, customized package ' />
          <link rel="canonical" href="https://www.riterapublishing.com/careers" />


        </Helmet>

      </HelmetProvider>

      <div className='careerspage' id='careers'>

        <h1 className='careers-title1'>Where Careers Meet Creativity.</h1>

        <p className='careers-description1'>At Ritera Publishing, every story deserves a stage. Whether you’re an industry pro or a fresh talent, we offer space to grow, create, and make an impact.</p>
      

        <p className='careers-title-job'>Current Job Openings</p>

        <div>
          <Row xs={1} sm={1} md={2} lg={4} className="g-4 careers">

            {careerdata.map((data, idx) => (
              <Col key={idx}>
                <Link to={`/careers/${data.Jobtitle.toLowerCase().replace(/\s+/g, '-')}`}>
                <Card className='careers-card'>
                  <div className='careers-card-content'>


                    <Card.Body className='careers-card-body'>

                      <Card.Text className='careers-card-description'>
                        <h3>{data.Jobtitle}</h3>
                        <p>{data.description}</p>
                      </Card.Text>
                      {/* <button className='careers-button'> Currently Unavaliable</button> */}

                    </Card.Body>
                  </div>
                </Card>
                </Link>
                
              </Col>
            ))}


          </Row>
        </div>


      </div>
    </>


    </div>
  )
}

export default Careerlistview