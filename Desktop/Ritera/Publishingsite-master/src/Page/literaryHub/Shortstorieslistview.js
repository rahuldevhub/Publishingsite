import React, { useEffect } from 'react'
import './literaryhublistviewstyle.css';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import cover1 from '../../Assets/literaryhub/shortstory/cover1.png'
import cover2 from '../../Assets/literaryhub/shortstory/cover2.png'
const Shortstorieslistview = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const newstorydata = [
        {
            id: 1,
            title: "The Smell of Boiling Milk",
            authorname: "Vidhushi Jain",
            img: cover2,
            description: "In the heart of an Indian household, the scent of boiling milk at dawn symbolizes the deep-rooted rituals and traditions that shape daily life. The story explores the protagonist's realization that life, much like boiling milk, demands constant attention and respect. Through the lens of her grandmother's meticulous care, she learns the importance of being present and finding order in chaos. The narrative delves into the duality of Indian culture, balancing reverence and rebellion, patience and urgency. Ultimately, it celebrates the beauty in the mundane and the significance of seemingly small moments.",
            posdate: "Dec 20th 2024",
        },
        {
           id: 2,
           title: "Love in Eldoria",
           authorname: "Jennifer Mars",
           img: cover1,
           description: "In the kingdom of Eldoria, King Aric's reign is marked by prosperitybut also loneliness. He meets Elara, a kind and intelligent maid, and they forma deepconnection. Despite societal prejudices, Aric declares his love for Elara and their intention to rule together. The people of Eldoria, moved by their sincerity, eventuallyaccept their union. Aric and Elara's love becomes a beacon of hope and unity, provingthat true love can overcome even the deepest prejudices. Their story transforms intoalegend, inspiring the kingdom for generations to come.",
           posdate: "Dec 5th 2024",
       },

      
    
       
      
     
   ]
    return (
        <div className='Shortstorieslistview'>

            <div className='literaryhub-bgimg'>
                <div className='literaryhub-blackdrop'>

                    <div className='literaryhub-title'>Short Stories</div>
                </div>
            </div>


            <div className='literaryhub-content' >
                <h2>New Stories</h2>
                <div className='literaryhub-article-container1'>
                  <Row className='literaryhub-article-container1-row'>
                                          {newstorydata.map((data) => (
                  
                                              <Col className='literaryhub-content-card' data-aos="zoom-in">
                                                  <Link to={`/literayhub-short-stories/${data.title}`}>
                                                      <Row>
                                                          <Col lg='3' sm='6'>
                                                              <img src={data.img} className='literaryhub-cover-img'></img>
                                                          </Col>
                                                          <Col lg='9' className='literary-cardcontent-col'>
                                                              <p className='literaryhub-cardcontent-title'>{data.title}</p>
                                                              <p className='literaryhub-cardcontent-description'>{data.description}</p>
                                                              <p className='literaryhub-cardcontent-authorname'>{data.authorname}</p>
                                                              <p className='literaryhub-cardcontent-posteddate'>Published on: {data.posdate}</p>
                                                              {/* <button className='landingpage-article-button'> See more</button> */}
                                                          </Col>
                  
                                                      </Row>
                                                  </Link>
                                              </Col>
                  
                                          ))}
                  
                                      </Row>

                </div>

            </div>




            <div className='literaryhub-hookredirect'>
                <Row className='literaryhub-hookredirect-content'>
                    <Col lg="12" md='6' sm="4" >
                        <p>Publish your work for free</p>
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

export default Shortstorieslistview