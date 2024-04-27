import React from 'react'
import '../css/Detailedabout.css'
import { Row, Col } from 'react-bootstrap';

const Detailedabout = () => {
  return (
    <div>
        <div className='Detailedabout-title-top' >
        <p className='Detailedabout-title' >About us</p>
        </div>
        <div className='Detailedabout'>
            <p className='detailedabout-subtitle' ><span className='detailedabout-companyname'>At Ritera,</span> our passion for literature drives everything we do. As anaspiring publishing house, we're dedicated to 
            providing premium servicesand deliverables at affordable prices, ensuring that every author's workreceives the attention and care it deserves.
             We believe wholeheartedly inthe power of literature to enrich lives and make the world a better place,which is why we prioritize author satisfaction
              above all else. With ourunwavering commitment to excellence and the recent partnership withRatix, we are thrilled to expand our offerings and access a 
              wealth oftalented designers and professionals. Together, we're excited to continueour journey of fostering creativity, getting authors under the spotlight
              ,connecting readers with captivating stories, and making a meaningfulimpact in the world of literature
              
              </p>
         
            <p className='detailedabout-subtitle' >With committed and passionate employees, who driven by the love for literature, our team members are 
            dedicated to providing exceptional service to our authors and readers alike. From our talented editors who meticulously refine
            manuscripts to our creative designers who craft captivating covers, each member of our team plays a vital role in bringing your stories 
            to life. With an xperienced and talented proof readers and reviewing team, we make a special place for you and our books.</p>
                <p className='detailedabout-subtitle'>
                    So welcome to Ritera, Where every word counts and every story shines.
                </p>
        <div className='characters'>

            <Row className='characters'>
                <Col lg='4'>picture</Col>
                <Col lg='8'>
                <p className='detailedabout-subtitle' >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
            Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                </Col>
            </Row>


            <Row className='characters'>
                <Col lg='8'>
                <p className='detailedabout-subtitle' >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
            Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>


                </Col>
                <Col lg='4'>
             picture
                </Col>
            </Row>


            <Row className='characters'>
                <Col lg='4'>picture</Col>
                <Col lg='8'>
                <p className='detailedabout-subtitle' >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
            Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

                </Col>
            </Row>











        </div>




    </div>
    </div>
  )
}

export default Detailedabout