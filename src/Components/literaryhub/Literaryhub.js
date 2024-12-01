import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import literaryicon from '../../Assets/study.png'
import articleicon from '../../Assets/otherimg/articles.png'
import shorticon from '../../Assets/otherimg/shortstories.png'
import poem from '../../Assets/otherimg/poem.png'
const Literaryhub = () => {
  return (
    <div className='Literaryhub' id='Literaryhub'>

      <div >
        <Row>


          <Col>
            <div>
              <Link to={'/literaryhub-poems'}>
                <Card className='landingpage-article-container' data-aos="zoom-in-right">
                  <Card.Body>
                    <Card.Img variant="top" src={poem} className='landingpage-article-img' />
                    <Card.Text><h2>Poems</h2></Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          </Col>

          <Col>
            <div>
              <Link to={'/literayhub-articles'}>

                <Card className='landingpage-article-container' data-aos="zoom-in">
                  <Card.Body>
                    <Card.Img variant="top" src={articleicon} className='landingpage-article-img' />
                    <Card.Text><h2>Articles</h2></Card.Text>
                  </Card.Body>
                </Card>
              </Link>

            </div>
          </Col>


          <Col>
            <div >
              <Link to={'/literayhub-short-stories'}>

                <Card className='landingpage-article-container' data-aos="zoom-in-left">
                  <Card.Body>
                    <Card.Img variant="top" src={shorticon} className='landingpage-article-img' />
                    <Card.Text><h2>Short Stories</h2></Card.Text>
                  </Card.Body>
                </Card>
              </Link>

            </div>
          </Col>


        </Row>
        {/* <button className='landingpage-article-button2'> See all Article</button> */}
      </div>


    </div>
  )
}

export default Literaryhub