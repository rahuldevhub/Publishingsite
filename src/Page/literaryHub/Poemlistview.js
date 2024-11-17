import React, { useEffect } from 'react'
import './literaryhublistviewstyle.css';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import dummycover from '../../Assets/landingpagewhywe.jpg';
import img01 from '../../Assets/cover1.webp';

export const Poemlistview = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const poemdata = [
        {
            id: 1,
            title: 'Happily Ever After',
            authorname: "Saran Raj",
            img: img01,
            description: "The poem “Happily ever after” portrays a man in his 80s, sitting in a graveyard, drenched in sweat, with tired, worn hands. Unable to escape the void left by his wife’s death, he decides to commit suicide, not by shooting himself, hanging, or bleeding to death. Instead, he dozed himself high and dig a grave beside his wife’s, seeking peaceful rest by her side. He writes one last poem before dawn and places it atop her cemetery with her favourite California poppies.",
            posdate: "Oct 29th 2024",
        },
        // {
        //     id: 2,
        //     title: 'Happily Ever After',
        //     authorname: "Saran Raj",
        //     img: dummycover,
        //     description: "The poem “Happily ever after” portrays a man in his 80s, sitting in a graveyard, drenched in sweat, with tired, worn hands. Unable to escape the void left by his wife’s death, he decides to commit suicide, not by shooting himself, hanging, or bleeding to death. Instead, he dozed himself high and dig a grave beside his wife’s, seeking peaceful rest by her side. He writes one last poem before dawn and places it atop her cemetery with her favourite California poppies.",
        //     posdate: "Oct 20th 2024",
        // },

    ]


    return (
        <div className='Poemlistview'>

            <div className='literaryhub-bgimg'>
                <div className='literaryhub-blackdrop'>

                    <div className='literaryhub-title'>Poems</div>
                </div>
            </div>



            <div className='literaryhub-content' >
                <h2>New Poems</h2>
                <div className='literaryhub-article-container1'>
                    <Row>
                        {poemdata.map((data) => (

                            <Col className='literaryhub-content-card'>
                                <Link to={`/literaryhub-poems/${data.title}`}>
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
            <p>Publish your work Free</p>
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
