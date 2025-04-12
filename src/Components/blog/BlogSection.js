import React from 'react'
import './blog.css'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import blogimg01 from '../../Assets/blogimg/blog1.webp'
import blogimg02 from '../../Assets/blogimg/blog2.webp'
import blogimg03 from '../../Assets/blogimg/blog3.webp'
export const BlogSection = () => {

  const poemdata = [
    {
      id: 1,
      title: 'Author’s Praise: Saran Raj’s Take on Ritera Publishing.',
      // authorname: "Vishnu K. Prasanna",
      img: blogimg03,
      description: "At Ritera Publishing, we take immense pride in the relationships we build with authors. A testament to our commitment to excellence came through...",
      posdate: "Mar 24,2025",
      dataaos:500,
      url: "https://medium.com/@riterapublishing/authors-praise-saran-raj-s-take-on-ritera-publishing-c5c31cbdf5d6"
      
    },
    {
      id: 2,
      title: 'From Manuscript to Masterpiece',
      // authorname: "Ritera Publishing",
      img: blogimg02,
      description: "For many Authors, the journey from writing their manuscript to seeing it published is worth everything. At Ritera Publishing, we understand the passion and dedication it takes to bring a book to…",
      posdate: "Mar 8,2025",
      dataaos:1000,
      url: "https://medium.com/@riterapublishing/from-manuscript-to-masterpiece-c03e451114b4?source=friends_link&sk=81223ffdbda6254b522490f6f1229e11"
    },
    {
      id: 3,
      title: 'Self-Publishing Your Book',
      // authorname: "Frank Gilmore",
      img: blogimg01,
      description: "In the world of self-publishing houses, Ritera stands out not only for the service and support we provide but also for the shared passion for literature that we and our authors embrace. We’re here to…",
      posdate: "Mar 1,2025",
      dataaos:2000,
      url: "https://medium.com/@riterapublishing/self-publishing-your-book-94f41836768a?source=friends_link&sk=1ba3ecd5fbd44295283a48d203dd075d"
    },

  ]
  return (
    <div className='BlogSection' id='BlogSection'>

      <div>
        <Row className='literaryhub-article-container1-row'>



          {poemdata.map((data) => (

            <Col className='blog-content-card' data-aos="zoom-in" data-aos-duration={data.dataaos}>
              <a href={data.url} target="_blank" rel="noopener noreferrer">

                <div className='lg:w-2/3 flex justify-center object-contain mx-auto h-48 lg:h-96 blog-swipercard' >
                  <div className='swipercontent'>
                    <img src={data.img} alt='blog-cover-img2' className='blog-cover-img2'></img>

                    <div className='blog-cardcontent-col'>

                      <p className='blog-cardcontent-title'>{data.title}</p>
                      <p className='blog-cardcontent-description'>{data.description}</p>
                      {/* <p className='literaryhub-cardcontent-authorname'>{data.authorname}</p> */}
                      <p className='blog-cardcontent-posteddate'> {data.posdate}</p>

                    </div>
                  </div>
                </div>
              </a>

            </Col>


          ))}

        </Row>

      </div>



    </div>
  )
}
