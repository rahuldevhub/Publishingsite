import React,{useEffect} from 'react'
import './literaryhubsubpages.css'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import dummycover from '../../Assets/landingpagewhywe.jpg'

const ShortStories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='ShortStories'>

      <div className='literaryhub-bgimg'>
        <div className='literaryhub-blackdrop'>

          <div className='literaryhub-title'>Short Stories</div>
        </div>
      </div>



      <div className='literaryhub-content' >
      <h2>New Short Stories</h2>

<div className='landingpage-article-container'>
  <Row>
<Col className='article-content-card'>
  <Row>
    <Col lg='3'>

      <img src={dummycover} className='literaryhub-cover-img'></img>
    </Col>
    <Col lg='9' className='landingpage-article-col'>
      <p className='landingpage-article-description'>As an aspiring publishing house, Ritera stands apart with our unique approach and unwavering commitment to authors' satisfaction. While we hold respect for other publishers in the field  While we hold respect for other publishers.</p>
      <button className='landingpage-article-button'> See more</button>
    </Col>
  </Row>
  </Col>


  <Col className='article-content-card'>
  <Row>
    <Col lg='3'>

      <img src={dummycover} className='literaryhub-cover-img'></img>
    </Col>
    <Col lg='9' className='landingpage-article-col'>
    <p className='landingpage-article-description'>As an aspiring publishing house, Ritera stands apart with our unique approach and unwavering commitment to authors' satisfaction. While we hold respect for other publishers in the field  While we hold respect for other publishers.</p>
    <button className='landingpage-article-button'> See more</button>
    </Col>
  </Row>
  </Col>

  </Row>



</div>
.

      </div>


      <div className='literaryhub-hookredirect'>
        <Row className='literaryhub-hookredirect-content'>
          <Col lg="12" md='6' sm="4" >
            <p>Publish your content Free</p>
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

export default ShortStories