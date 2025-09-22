import React, { useEffect } from 'react'
import '../css/packagepage.css'
// import Header from '../Components/header/Header'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Getintouch from '../Components/Getintouch';
import Popupcontactus from '../Components/Popupcontactus';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Tooltip from '@mui/material/Tooltip';
import { IoInformationCircleOutline } from "react-icons/io5";
// import { styled } from '@mui/material/styles';

const Packages = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const CustomWidthTooltip = styled(({ className, ...props }) => (
  //   <Tooltip {...props} classes={{ popper: className }} />
  // ))({
  //   [`& .${tooltipClasses.tooltip}`]: {
  //     maxWidth: 500,
  //   },
  // });


  // const longText = ``;

  return (
    <>
      <HelmetProvider>

        <Helmet>

          <title>Explore the Packages of Ritera for your Publishing needs.</title>
          <meta id="meta-description" name="description" content="Explore Ritera Publishing’s packages designed for every author. Get professional editing, cover design, marketing, and more to publish your book" />
          <meta name='robots' content='index,follow' />
          <meta name='keywords' content='self publishing, service, books, authors, reader ,free publishing, cover design, manuscript, ritera, publishing company, customized package ' />
          <link rel="canonical" href="https://www.riterapublishing.com/packages" />


    <meta property="og:title" content="Explore Publishing Packages | Ritera Publishing India" />
    <meta property="og:description" content="Choose from affordable & customized book publishing packages at Ritera. We offer e-publishing, editing, and marketing services in India at the best price." />
    <meta property="og:image" content="https://www.riterapublishing.com/static/media/logo.811019c4d0bbf0600926.webp" />
    <meta property="og:url" content="https://www.riterapublishing.com/packages" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Explore Ritera's Publishing Packages" />
    <meta name="twitter:description" content="Affordable & customized publishing packages for authors. Get editing, design, and marketing with Ritera Publishing." />
    <meta name="twitter:image" content="https://www.riterapublishing.com/static/media/logo.811019c4d0bbf0600926.webp" />
    <meta name="twitter:url" content="https://www.riterapublishing.com/packages" />

    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Publishing Packages - Ritera Publishing",
          "url": "https://www.riterapublishing.com/packages",
          "description": "Discover Ritera Publishing's custom packages crafted for authors. Get editing, cover design, marketing, and more—all tailored for your publishing journey.",
          "about": {
            "@type": "Organization",
            "name": "Ritera Publishing"
          }
        }
      `}
    </script>
        </Helmet>

      </HelmetProvider>

      <div className='Packages' id='Packages'>

        <div className='Packages-bgimg'>
          <div className='Packages-blackdrop'>
            {/* <Header /> */}
            <div className='Packages-title'>Packages</div>
          </div>
        </div>
        <div className='packages-content-bg '>
          <div className='packages-content'>
            <h1 className='whywe-subcontent-title'>Discover Ritera's Publishing Packages Tailored for Every Author</h1>
            <p className='whywe-subcontent-description'>As a best self publishing house, Ritera stands apart with our unique approach and unwavering commitment to authors' satisfaction. While we hold respect for other publishers in the field, we embrace different ideologies and possess a talented crew with a distinct working style. At Ritera, we promise that you'll never be left with doubts or dissatisfaction.</p>

            <h3>Basic</h3>
            {/* <p className='whywe-subcontent-description'>As an aspiring publishing house, Ritera stands apart with our unique approach and unwavering commitment to authors' satisfaction. While we hold respect for other publishers in the field, we embrace different ideologies and possess a talented crew with a distinct working style. At Ritera, we promise that you'll never be left with doubts or dissatisfaction.</p> */}

            <div className='Package1'>
              <Row xs={1} md={2} lg={3} className="g-4 packageall">
                <Card className='level1-card' >
                  <Card.Body className='package-card-body' >
                    <div className='flex-items'>
                      <div className='card-content'>
                        <p className='level1-title'>Essential </p>
                        <p className='level1-description'>Essential services with standard cover and interior designs,
                          and eBook formatting for budding authors & Online
                          distribution in Indian stores.</p>
                        <p className='level1-Price'>₹8,999</p>
                      </div>
                      <ul className='package-features'>
                        <li><Tooltip title='From start to finish, a dedicated publishing manager will be by your side.'  >
                          <IoInformationCircleOutline />  </Tooltip>Personal Manager</li>
                        <li><Tooltip title='Minimal art work with 1 Concept and 3 Revisions.'>
                          <IoInformationCircleOutline /> </Tooltip>Standard Cover Design</li>
                        <li><Tooltip title='2 Designs with 2 Revisions'>
                          <IoInformationCircleOutline /> </Tooltip>Standard Interior formatting</li>
                        <li><Tooltip title='Distributed in India through Amazon and Flipkart India'>
                          <IoInformationCircleOutline /> </Tooltip>Local Distribution</li>
                        <li><Tooltip title='E-Book will be placed on Google play books'>
                          <IoInformationCircleOutline /> </Tooltip>E-Book Placement</li>
                        <li>Copy Rights + ISBN </li>
                        <li>100% Royalty for Author</li>
                        <li>Post Publishing Support </li>

                      </ul>
                    </div>
                    <div className='flex-items'>
                      <Popupcontactus /></div>
                  </Card.Body>
                </Card>

                <Card className='level1-card' >
                  <Card.Body className='package-card-body'>
                    <div className='flex-items'>

                      <div className='card-content'>
                        <p className='level1-title'>Standard </p>
                        <p className='level1-description'>Comprehensive support for aspiring authors with free
                          Author copies, certificate, E-Book placement on
                          Google and Kobo & Online distribution in India.</p>
                        <p className='level1-Price'>₹16,999</p>
                      </div>

                      <ul className='package-features'>
                        <li>
                          All services in previous</li>
                        <li><Tooltip title="E-Book will be placed on Google Play & Kindle">
                          <IoInformationCircleOutline /> </Tooltip>E-Book Placements (Kindle)</li>
                        <li><Tooltip title='5 Author copies (B/W)'>
                          <IoInformationCircleOutline /> </Tooltip>Author Copies</li>
                        <li> Author Certificate</li><br />
                        <li className='package-authorwebsite'><Tooltip title='A dedicated website will be provided, within the package cost.'>
                          <IoInformationCircleOutline /> </Tooltip>Exclusive: <br />Author Website</li>
                      </ul>
                    </div>
                    <div className='flex-items'>

                      <Popupcontactus />

                    </div>
                  </Card.Body>
                </Card>

                <Card className='level1-card' >
                  <Card.Body className='package-card-body'>

                    <div className='flex-items'>

                      <div className='card-content'>
                        <p className='level1-title'>Advanced</p>
                        <p className='level1-description'>All-inclusive package with International Distribution
                          premium cover and interior design, Prime placement,
                          promotions, and free author session for ambitious authors.</p>
                        <p className='level1-Price'>₹29,999</p>
                      </div>
                      <ul className='package-features'>
                        <li>All services in previous</li>
                        <li>100% Royalty for Author</li>
                        <li><Tooltip title='2 Concepts and 3 Corrections once the concept is fixed'>
                          <IoInformationCircleOutline /> </Tooltip>Premium Cover Design</li>
                        <li><Tooltip title='2 Design and 2 Revision'>
                          <IoInformationCircleOutline /> </Tooltip>Premium Interior formatting</li>
                        <li><Tooltip title='Distributed globally around 160 Countries and 40000+ Online Stories and Libraries'>
                          <IoInformationCircleOutline /> </Tooltip>International Distribution</li>
                        <li><Tooltip title='E-Book will be published on Kindle, Kobo and Google Play books.'>
                          <IoInformationCircleOutline /> </Tooltip>E-Book Placements</li>
                        <li><Tooltip title='10 Author Copies (B/W or Colour)'>
                          <IoInformationCircleOutline /> </Tooltip>Author copies</li>


                        <li><Tooltip title='10 Complementry reviews (pre/post publishing) '>
                          <IoInformationCircleOutline /> </Tooltip>Book Reviews</li>

                        <li><Tooltip title='A specialized beta reviewer will be assigned and will share their opinion before publishing.'>
                          <IoInformationCircleOutline /> </Tooltip>Beta Reading</li>

                        <li><Tooltip title='A specialized author session will be Arranged virtually (Video/Text) to overcome writers block or any other writing doubts.'>
                          <IoInformationCircleOutline /> </Tooltip>Free Author Session</li>
                        <li> Kindle Promotion</li>
                        <li> Amazon Prime Placement</li>
                      </ul>
                    </div>
                    <div className='flex-items'>

                      <Popupcontactus />
                      {/* <button className='seeallpackages'>See all Features</button> */}
                    </div>
                  </Card.Body>
                </Card>
              </Row>
            </div>


            <h3>Top - Tier</h3>
            {/* <p className='whywe-subcontent-description'>As an aspiring publishing house, Ritera stands apart with our unique approach and unwavering commitment to authors' satisfaction. While we hold respect for other publishers in the field, we embrace different ideologies and possess a talented crew with a distinct working style. At Ritera, we promise that you'll never be left with doubts or dissatisfaction.</p> */}

            <div className='Package1'>
              <Row xs={1} md={2} lg={3} className="g-4 packageall">
                <Card className='level1-card' >
                  <Card.Body className='package-card-body'>
                    <div className='flex-items'>

                      <div className='card-content'>
                        <p className='level1-title'>Elite </p>
                        <p className='level1-description'>Advanced cover & Interior design, extensive marketing
                          campaigns, early or post reviews, promotions and prime
                          listing.</p>
                        <p className='level1-Price'>₹49,999</p>


                      </div>
                      <ul className='package-features'>
                        <li> All services in previous</li>
                        <li><Tooltip title='3 Concepts and 3 Revisions once the concept is fixed.'>
                          <IoInformationCircleOutline /> </Tooltip>Advanced Cover Design</li>
                        <li><Tooltip title='3 Design and 3 Revision once the concept is fixed.'>
                          <IoInformationCircleOutline /> </Tooltip>Advanced Interior formatting</li>

                        <li> International Distribution</li>

                        <li>E-Book Placement</li>
                        <li>Amazon A+ listing</li>
                        <li>Amazon Prime</li>
                        <li>Amazon Ads</li>
                        <li>Book Reviews</li>
                        <li>Kindle Promotions</li>


                      </ul>
                    </div>
                    <div className='flex-items'>

                      <Popupcontactus /></div>


                  </Card.Body>
                </Card>

                <Card className='level1-card' >
                  <Card.Body className='package-card-body'>
                    <div className='flex-items'>

                      <div className='card-content'>
                        <p className='level1-title'>Premium </p>
                        <p className='level1-description'>Spot light package including Author interviews,
                          Customised designs, proofreading or copy editing sercice,
                          Review campaigns, and additional author copies.</p>
                        <p className='level1-Price'>₹69,999</p>

                        <ul className='package-features'>
                          <li>All services in previous</li>

                          {/* <li><Tooltip title={longText}>
                                                <IoInformationCircleOutline /> </Tooltip>Complimentry Services</li> */}

                          <li><Tooltip title='3 Design and 6 Revision once the Concept is fixed.'>
                            <IoInformationCircleOutline /> </Tooltip>Customized Cover Design</li>
                          <li><Tooltip title='3 Designs and 5 Revisions pnce the Concept is fixed.'>
                            <IoInformationCircleOutline /> </Tooltip>Customized Interior formatting</li>

                          <li><Tooltip title='Complementry reviews (Pre or Post Publishing).'>
                            <IoInformationCircleOutline /> </Tooltip>Book Reviews</li>

                          <li><Tooltip title='3 Beta reviewer will be assigned and will share their opinion before publishing.'>
                            <IoInformationCircleOutline /> </Tooltip>Beta Reading</li>

                          <li><Tooltip title='Social media promotions for your book will be executed on Instagram, facebook, twitter, and a blog will be posted on Medium.'>
                            <IoInformationCircleOutline /> </Tooltip>Social Media Promotion</li>

                          <li><Tooltip title='10 Author copies (B/W or Colour)'>
                            <IoInformationCircleOutline /> </Tooltip>Author Copies</li>
                          <li> Proof Reading</li>
                          <li> Author Video</li><br />

                          <li className='package-authorwebsite'><Tooltip title='A dedicated website will be provided, within the package cost.'>
                            <IoInformationCircleOutline /> </Tooltip>Exclusive: <br />Author Website</li>
                          {/* <li>Book Reviews</li>
                                            <li>E-Book Placement</li>
                                            <li>Kindle Promotion</li>
                                            <li>International Distribution</li> */}


                        </ul>
                      </div>
                    </div>
                    <div className='flex-items'>

                      <Popupcontactus /></div>


                  </Card.Body>
                </Card>

                <Card className='level1-card' >
                  <Card.Body className='package-card-body'>
                    <div className='flex-items'>

                      <div className='card-content'>
                        <p className='level1-title'>Exclusive </p>
                        <p className='level1-description'>Elite services including developmental editing,
                          Proofreading & Copy editing, marketing support, Print
                          media promotions and etc for seasoned authors.</p>
                        <p className='level1-Price'>₹1,19,999</p>



                        <ul className='package-features'>


                          <li><Tooltip title='3 Design and Unlimited revisions once the Concept is fixed'>
                            <IoInformationCircleOutline /> </Tooltip>Customized Cover Design</li>

                          <li><Tooltip title='3 Design and Unlimited revisions once the Concept is fixed'>
                            <IoInformationCircleOutline /> </Tooltip>Customized Interior formatting</li>

                          <li><Tooltip title='2 Proof readers will be assigned (Pre Publishing)'>
                            <IoInformationCircleOutline /> </Tooltip>Proof Reading</li>
                          <li><Tooltip title='Social media Promotions for your book will be executed on Instagram, facebook, twitter, and a blog will be posted on Medium.'>
                            <IoInformationCircleOutline /> </Tooltip>Social Media Promotion</li>


                          <li><Tooltip title='5 Beta reviewer will be assigned and will share their opinion before publishing.'>
                            <IoInformationCircleOutline /> </Tooltip>Beta Reading</li>
                          <li><Tooltip title='20 Author copies (B/W or Colour)'>
                            <IoInformationCircleOutline /> </Tooltip>Author Copies</li>

                          <li>Personal Publishing Manager</li>
                          <li>International Distribution</li>
                          <li>Copy Editing</li>
                          <li>Author Website</li>
                          <li>Author Video</li>
                          <li>Kindle Promotion</li>
                          <li>E-book Placements</li>
                          <li>Print media Promotion</li>
                          <li>Marketing Plan suggestion</li>
                          <li>Publishing Event Handling</li>

                        </ul>
                      </div>

                      <div className='flex-items'>

                        <Popupcontactus /></div>

                    </div>
                  </Card.Body>
                </Card>
              </Row>
            </div>

          </div>



        </div>
        <div className='packages-getintouch'>
          <Getintouch />
        </div>
      </div >
    </>
  )
}

export default Packages