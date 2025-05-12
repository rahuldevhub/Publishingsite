import React from 'react'
import './blog.css'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import MediaQuery, { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';


import blogimg01 from '../../Assets/blogimg/blog1.webp'
import blogimg02 from '../../Assets/blogimg/blog2.webp'
import blogimg03 from '../../Assets/blogimg/blog3.webp'
export const BlogSection = () => {

  const poemdata = [
    {
      id: 1,
      title: 'Life at Ritera: Employee Insights & Evolution',
      // authorname: "Frank Gilmore",
      img: blogimg01,
      description: "At Ritera Publishing, creativity meets purpose. Our workplace isn’t just about getting things done — it’s about collaboration, innovation, and the passion for writing. We empower voices, celebrate diverse perspectives...",
      posdate: "Apr 30,2025",
      dataaos:2000,
      url: "https://medium.com/@riterapublishing/life-at-ritera-employee-insights-evolution-621c4147ce63"
    },
    {
      id: 2,
      title: 'Jade Julep: A Testament to Free Publishing and Global Reachrom Manuscript to Masterpiece',
      // authorname: "Ritera Publishing",
      img: blogimg02,
      description: "In the ever-evolving world of literature, Jade Julep: An Anthology stands as a shining star of what can be achieved when creativity meets opportunity...",
      posdate: "Apr 14,2025",
      dataaos:1000,
      url: "https://medium.com/@riterapublishing/jade-julep-a-testament-to-free-publishing-and-global-reach-02b7f48857d8"
    },
    {
      id: 3,
      title: 'Author’s Praise: Saran Raj’s Take on Ritera Publishing.',
      // authorname: "Vishnu K. Prasanna",
      img: blogimg03,
      description: "At Ritera Publishing, we take immense pride in the relationships we build with authors. A testament to our commitment to excellence came through in the words of esteemed author Saran Raj...",
      posdate: "Mar 24,2025",
      dataaos:500,
      url: "https://medium.com/@riterapublishing/authors-praise-saran-raj-s-take-on-ritera-publishing-c5c31cbdf5d6"
      
    },
   

  ]

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
  const isTaborMobile = useMediaQuery({ query: '(max-width: 992px)' })
  return (
    <div className='BlogSection' id='BlogSection'>
{isDesktopOrLaptop &&
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
}
{isTaborMobile &&

<Swiper
slidesPerView={1}
spaceBetween={10}
pagination={{
    clickable: true,
}}
modules={[Pagination]}
className="mySwiper"
>


<div className='Package1'>
    <Row xs={1} md={2} lg={3} className="g-4 packageall">
      
    <SwiperSlide>
            <Card className='level1-card' >
            <Col className='blog-content-card' >
              <a href="https://medium.com/@riterapublishing/life-at-ritera-employee-insights-evolution-621c4147ce63"  target="_blank" rel="noopener noreferrer">

                <div className='lg:w-2/3 flex justify-center object-contain mx-auto h-48 lg:h-96 blog-swipercard' >
                  <div className='swipercontent'>
                    <img src={blogimg01} alt='blog-cover-img2' className='blog-cover-img2'></img>

                    <div className='blog-cardcontent-col'>

                      <p className='blog-cardcontent-title'>Life at Ritera: Employee Insights & Evolution</p>
                      <p className='blog-cardcontent-description'>At Ritera Publishing, creativity meets purpose. Our workplace isn’t just about getting things done — it’s about collaboration, innovation, and the passion for writing...</p>
                      {/* <p className='literaryhub-cardcontent-authorname'>{data.authorname}</p> */}
                      <p className='blog-cardcontent-posteddate'> Apr 29,2025</p>

                    </div>
                  </div>
                </div>
              </a>

            </Col>
            </Card>
            </SwiperSlide>

        <SwiperSlide>
            <Card className='level1-card' >
           
                <Col className='blog-content-card' >
              <a href="https://medium.com/@riterapublishing/jade-julep-a-testament-to-free-publishing-and-global-reach-02b7f48857d8"  target="_blank" rel="noopener noreferrer">

                <div className='lg:w-2/3 flex justify-center object-contain mx-auto h-48 lg:h-96 blog-swipercard' >
                  <div className='swipercontent'>
                    <img src={blogimg02} alt='blog-cover-img2' className='blog-cover-img2'></img>

                    <div className='blog-cardcontent-col'>

                      <p className='blog-cardcontent-title'>Jade Julep: A Testament to Free Publishing and Global Reach</p>
                      <p className='blog-cardcontent-description'>In the ever-evolving world of literature, Jade Julep: An Anthology stands as a shining star of what can be achieved when creativity meets opportunity...</p>
                      {/* <p className='literaryhub-cardcontent-authorname'>{data.authorname}</p> */}
                      <p className='blog-cardcontent-posteddate'> Apr 14,2025</p>

                    </div>
                  </div>
                </div>
              </a>

            </Col>
                    
      
            </Card>
            </SwiperSlide>

            <SwiperSlide>
            <Card className='level1-card' >
            <Col className='blog-content-card' >
              <a href="https://medium.com/@riterapublishing/authors-praise-saran-raj-s-take-on-ritera-publishing-c5c31cbdf5d6"  target="_blank" rel="noopener noreferrer">

                <div className='lg:w-2/3 flex justify-center object-contain mx-auto h-48 lg:h-96 blog-swipercard' >
                  <div className='swipercontent'>
                    <img src={blogimg03} alt='blog-cover-img2' className='blog-cover-img2'></img>


                    <div className='blog-cardcontent-col'>

                      <p className='blog-cardcontent-title'>Author’s Praise: Saran Raj’s Take on Ritera Publishing.</p>
                      <p className='blog-cardcontent-description'>At Ritera Publishing, we take immense pride in the relationships we build with authors. A testament to our commitment to excellence came through...</p>
                      {/* <p className='literaryhub-cardcontent-authorname'>{data.authorname}</p> */}
                      <p className='blog-cardcontent-posteddate'>Mar 24,2025</p>

                    </div>
                  </div>
                </div>
              </a>

            </Col>
            </Card>
            </SwiperSlide>



        


    </Row>
</div>


</Swiper>




}


    </div>
  )
}
