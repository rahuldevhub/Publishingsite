import React,{useEffect} from 'react'
import './literaryhubsubpages.css'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
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