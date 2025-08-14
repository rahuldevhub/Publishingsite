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
            <meta name='keywords' content='careers, jobs, hiring, software development, UI/UX design, digital innovation, Ritera Publishing, work with us, publishing company jobs, tech jobs' />
            <link rel="canonical" href="https://www.riterapublishing.com/careers" />

            <meta property="og:title" content="Careers at Ritera Publishing | Work in Tech & Creativity" />
            <meta property="og:description" content="Join Ritera Publishing's tech-driven team. Explore jobs in software development, UI/UX, and creative digital solutions." />
            <meta property="og:image" content="https://www.riterapublishing.com/static/media/logo.811019c4d0bbf0600926.webp" />
            <meta property="og:url" content="https://www.riterapublishing.com/careers" />
            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Careers at Ritera Publishing | Join Our Tech & Creative Team" />
            <meta name="twitter:description" content="We're hiring talented people in software development, UI/UX, and digital publishing. Be part of Ritera's innovative team." />
            <meta name="twitter:image" content="https://www.riterapublishing.com/static/media/logo.811019c4d0bbf0600926.webp" />
            <meta name="twitter:url" content="https://www.riterapublishing.com/careers" />


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