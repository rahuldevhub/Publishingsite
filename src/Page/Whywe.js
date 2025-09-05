import React, { useEffect } from 'react'
// import MetaTags from 'react-meta-tags';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// import Header from '../Components/header/Header'
import '../css/whywe.css'
import { Row, Col } from 'react-bootstrap'
import Getintouch from '../Components/Getintouch'
import { Link } from 'react-router-dom';
import whywe1 from '../Assets/whywe/whywe1.webp'
import whywe2 from '../Assets/whywe/whywe2.webp'
import whywe3 from '../Assets/whywe/whywe3.webp'
import whywe4 from '../Assets/whywe/whywe4.webp'
import whywe5 from '../Assets/whywe/whywe5.webp'
import whywe6 from '../Assets/whywe/whywe6.webp'
import whywe7 from '../Assets/whywe/whywe7.webp'


const Whywe = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <>
      <HelmetProvider>

        <Helmet>
          <title>Ritera Publishing Empowering Authors to Publish Their Dreams </title>
          

          <meta id="meta-description" name="description" content="Discover Ritera Publishing, India's leading self-publishing company. Learn about our mission, expert services, and Customized packages for your Book." />
          <meta name='robots' content='index,follow' />
          <meta name='keywords' content='self publishing, service, books, authors, reader ,free publishing, cover design, manuscript, ritera, publishing company, customized package ' />
          <meta id="og-title" property="og:title" content="Ritera Publishing Empowering Authors to Publish Their Dreams" />
          <link rel="canonical" href="https://www.riterapublishing.com/aboutus" />


          <meta property="og:title" content="About Ritera Publishing | Trusted Book Publishing House" />
          <meta property="og:description" content="Ritera Publishing is one of the best book publishing houses in India. Learn more about our team and how we help authors publish their books in India." /> 
          <meta property="og:image" content="https://www.riterapublishing.com/static/media/logo.811019c4d0bbf0600926.webp" />
          <meta property="og:url" content="https://riterapublishing.com/aboutus" />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="About Ritera Publishing | Trusted Book Publishing House" />
          <meta name="twitter:description" content="Ritera Publishing is one of the best book publishing houses in India. Learn more about our team and how we help authors publish their books in India." />
          <meta name="twitter:image" content="https://www.riterapublishing.com/static/media/logo.811019c4d0bbf0600926.webp" />
          <meta name="twitter:url" content="https://riterapublishing.com/aboutus" />

          <script type="application/ld+json">
            {`
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "About Ritera Publishing",
              "url": "https://www.riterapublishing.com/aboutus",
              "description": "Learn more about Ritera Publishing, a trusted self-publishing company helping authors in India bring their books to life."
            }
            `}
          </script>
        </Helmet>

      </HelmetProvider>

      <div className='Whywe' id='Whywe'>
        {/* <Header /> */}

        <div className='whywe-bgimg'>
          <div className='whywe-blackdrop'>

            <div className='whywe-title'>Empowering Authors to Publish Their Dreams with Ritera</div>
          </div>
        </div>


        <div className='whywe-content'>

        <div >
            <p className='whywe-subcontent-title' >Free Publishing</p>
            <Row className='whywe-subcontent-row'>
              <Col lg="6" md="6" sm="1">
                <img src={whywe7} alt='A globe resting on books, symbolizing global knowledge and education through publishing.' className='whywe-subcontent-img1' data-aos="zoom-in"></img>

              </Col>
              <Col lg="6" md="6" sm="1" className='whywe-subcontent-col2' data-aos="fade-up">
                <p className='whywe-subcontent-description'>
                Ritera offers a unique self-publishing experience that sets us apart. On our platform, you can publish your short stories, poems, and articles for free, reaching a global audience. Even better—your poem will be featured in an anthology alongside 10 international authors, distributed across 160 countries and published on Amazon.

<br/>This free opportunity lets you showcase your talent, connect with readers worldwide, and grow your community—without any hidden charges. With such innovative offerings, Ritera proudly stands as one of India's top self-publishing houses, making it easy to publish your book at zero cost.
                </p>
              </Col>
            </Row>


          </div>


          <div >
            <p className='whywe-subcontent-title'>KEEP YOUR BOOK ERROR FREE—FOR FREE!</p>
            <Row className='whywe-subcontent-row'>
              <Col lg="6" md="6" sm="1">
                <img src={whywe1} alt='KEEP YOUR BOOK ERROR FREE—FOR FREE!' className='whywe-subcontent-img' data-aos="zoom-in"></img>

              </Col>
              <Col lg="6" md="6" sm="1" className='whywe-subcontent-col2' data-aos="fade-up">
                <p className='whywe-subcontent-description'>Craft a Flawless Book – Absolutely Free at Ritera! After publishing your work, encountering grammatical errors with each read is quite common. However, the process of correction need not be a hassle. While many self-publishing houses demand payment or limit the number of corrections, Ritera stands out by offering free lifetime grammatical corrections. No more counting or costs for refining your writing!</p>
              </Col>
            </Row>


          </div>

          <div >
            <p className='whywe-subcontent-title' >RED CARPET FOR YOUR WORK</p>
            <Row className='whywe-subcontent-row'>
              <Col lg="6" md="6" sm="1">
                <img src={whywe2} alt='RED CARPET FOR YOUR WORK' className='whywe-subcontent-img' data-aos="zoom-in"></img>

              </Col>
              <Col lg="6" md="6" sm="1" className='whywe-subcontent-col2' data-aos="fade-up">
                <p className='whywe-subcontent-description'>
                  Listing your book is the first step. To give your book its moment in the spotlight, Ritera has partnered with esteemed BookTubers and Bookstagrammers, who are the best in the industry. With their wide reach among the readers, they’ll elevate your work and reveal its brilliance and capabilities to the world!
                </p>
              </Col>
            </Row>


          </div>

          <div >
            <p className='whywe-subcontent-title'>TRADITIONAL IS SENSATIONAL</p>
            <Row className='whywe-subcontent-row'>
              <Col lg="6" md="6" sm="1">
                <img src={whywe3} alt='TRADITIONAL IS SENSATIONAL' className='whywe-subcontent-img'data-aos="zoom-in" ></img>

              </Col>
              <Col lg="6" md="6" sm="1" className='whywe-subcontent-col2' data-aos="fade-up">
                <p className='whywe-subcontent-description'>With a strong marketing team, Ritera offers top-notch marketing strategies in both digital and Traditional marketing. Like the cherished golden hour, paperbacks hold a timeless allure that surpasses their digital formats. Thus, Ritera’s specialized traditional marketing team place your work in offline stores and amidst the ongoing book events.  We ensure that your book finds its audience and the fame it deserves.</p>
              </Col>
            </Row>


          </div>

          <div >
            <p className='whywe-subcontent-title'>DIGITAL IS GENERATIONAL</p>
            <Row className='whywe-subcontent-row' >
              <Col lg="6" md="6" sm="1" >
                <img src={whywe4} alt='DIGITAL IS GENERATIONAL' className='whywe-subcontent-img' data-aos="zoom-in"></img>

              </Col>
              <Col lg="6" md="6" sm="1" className='whywe-subcontent-col2' data-aos="fade-up">
                <p className='whywe-subcontent-description'>Digital marketing in the current generation is crucial for success in the modern world. To stay relevant and capitalize on trends, Ritera’s digital marketing team provides comprehensive solutions to promote your book in every nook and cranny of the world. From refining your book’s rough draft to securing a place in the centre of the stage for awards, our digital marketing experts guide you every step of the way.</p>
              </Col>
            </Row>


          </div>

          <div>
            <p className='whywe-subcontent-title'>SOME SURPRISES AWAITS</p>
            <Row className='whywe-subcontent-row'>
              <Col lg="6" md="6" sm="1">
                <img src={whywe5} alt='SOME SURPRISES AWAITS' className='whywe-subcontent-img' data-aos="zoom-in"></img>

              </Col>
              <Col lg="6" md="6" sm="1" className='whywe-subcontent-col2' data-aos="fade-up">
                <p className='whywe-subcontent-description'>With each time you publish with us, we'll make you feel special with the author copies.  "No more clues—just anticipation". When you finally hold those copies in your hands, a special surprise awaits, unlike anything other publications offer.</p>
              </Col>
            </Row>


          </div>

          <div>
            <p className='whywe-subcontent-title'>AUTHOR SESSIONS</p>
            <Row className='whywe-subcontent-row'>
              <Col lg="6" md="6" sm="1">
                <img src={whywe6} alt='AUTHOR SESSIONS' className='whywe-subcontent-img' data-aos="zoom-in"></img>

              </Col>
              <Col lg="6" md="6" sm="1" className='whywe-subcontent-col2' data-aos="fade-up">
                <p className='whywe-subcontent-description'>Stuck in a writer's block? Doubting your manuscript? Fear not! Ritera’s got your back with "Author Sessions!"  Picture this: A virtual head to head with a seasoned author who’s battled the same struggles. Whether it’s plot a twists, character development, or that pesky writer’s block, we’ve got answers.
                  Ritera is the only self publishing house that exclusively offers "Author sessions" to bring the best version of your book. And sooner or later, we wish to see you in our team of specialized authors.
                </p>
              </Col>
            </Row>

            <div className='whywe-subcontent-title'>Setting New Standards in Self-Publishing Excellence</div>
            <div className='whywe-subcontent-description' data-aos="fade-up">
              <b>At Ritera,</b> our passion for literature drives everything we do. As an best self publishing house, we're dedicated to provide premium services and deliverables, ensuring that every author's work receives the attention and care it deserves. We wholeheartedly believe in the power of literature to enrich lives and make the world a better place. With our unwavering commitment to excellence and the recent partnership with Ratix, we are thrilled to expand our offerings and access a wealth of talented designers and professionals. Together, we're excited to continue our journey of fostering creativity, getting authors under the spotlight ,connecting readers with captivating stories, and making a meaningful impact in the world of literature.<br />
              <br/> Ritera has earned its reputation as the best self publishing house in India by redefining the publishing experience for authors. As a top self publishing house, we are committed to delivering excellence at every step, from manuscript refinement to marketing strategies. Our self publishing company prides itself on personalized support, innovative solutions, and a deep passion for literature, ensuring every author’s voice reaches its deserved audience with unmatched quality and care.<br/>
              <br /> With committed and passionate employees, who driven by the love for literature, our team members are dedicated to providing exceptional service to authors and readers. From our meticulous editors who refine manuscripts with care, to our creative designers who craft captivating book covers, each team member plays a vital role in bringing your stories to life. With an experienced proofreading and reviewing team, we create a special space for you and your books.<br />
              <br /> So welcome to Ritera: Best self publishing house in India, Where every word counts and every story shines.
            </div>
          </div>

        </div>


        <div className='whywe-hookredirect'>
          <Row className='whywe-hookredirect-content'>
            <Col lg="12" md='6' sm="4" >
              <p>Packages</p>
            </Col>

            <Col lg="12" md='6' sm="4" className=' whywe-hookredirect-button'>
              <Link to={'/packages'}><button>Explore</button></Link>
            </Col  >
          </Row>
        </div>


        <div className='whywe-getintouch'>
          <Getintouch />
        </div>



        <div className='landingpage-map'>
<div style={{ width: '100%', height: '450px' }}>
      <iframe
        title="Ritera Publishing Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.6050875444093!2d77.66989667481518!3d11.436183188755573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96944f3520c3d%3A0x7a14b115e60a872!2sRitera%20Publishing!5e0!3m2!1sen!2sin!4v1754379579690!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
</div>


      </div>
    </>
  )
}

export default Whywe