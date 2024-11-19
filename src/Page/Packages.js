import React, { useEffect } from 'react'
import '../css/packagepage.css'
// import Header from '../Components/header/Header'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Getintouch from '../Components/Getintouch';
import Popupcontactus from '../Components/Popupcontactus';

const Packages = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='Packages' id='Packages'>

      <div className='Packages-bgimg'>
        <div className='Packages-blackdrop'>
          {/* <Header /> */}
          <div className='Packages-title'>Packages</div>
        </div>
      </div>
      <div className='packages-content-bg '>
        <div className='packages-content'>
          <div className='whywe-subcontent-title'>Tailored Solutions for Every Author’s Journey.</div>
          <p className='whywe-subcontent-description'>As an aspiring publishing house, Ritera stands apart with our unique approach and unwavering commitment to authors' satisfaction. While we hold respect for other publishers in the field, we embrace different ideologies and possess a talented crew with a distinct working style. At Ritera, we promise that you'll never be left with doubts or dissatisfaction.</p>

          <h3>Basic</h3>
          {/* <p className='whywe-subcontent-description'>As an aspiring publishing house, Ritera stands apart with our unique approach and unwavering commitment to authors' satisfaction. While we hold respect for other publishers in the field, we embrace different ideologies and possess a talented crew with a distinct working style. At Ritera, we promise that you'll never be left with doubts or dissatisfaction.</p> */}

          <div className='Package1'>
            <Row xs={1} md={2} lg={3} className="g-4 packageall">
              <Card className='level1-card' >
                <Card.Body >
                  <div className='card-content'>
                    <p className='level1-title'>Essential </p>
                    <p className='level1-Price'>₹8,999</p>
                    <p className='packagepage-subtitle'>Essential services with standard cover and interior designs,
                      and eBook formatting for budding authors /Online
                      distribution in Indian stores.</p>
                  </div>
                  <ul className='package-features'>
                    <li>Personal Publishing Manager</li>
                    <li>Standard Cover Design</li>
                    <li>Standard Interior Design</li>
                    <li>Online PaperBack Distribution (India)</li>
                    <li>E-Book Placement (Google) </li>
                    <li>Copy Rights </li>
                    <li>ISBN + Barcode </li>
                    <li>Author Dashboard </li>
                    <li>Post Publishing Support </li>
                    <li>60% Royalty for Author</li>
                  </ul>
                  <Popupcontactus />
                  {/* <button className='seeallpackages'>See all Features</button> */}
                </Card.Body>
              </Card>

              <Card className='level1-card' >
                <Card.Body>
                  <div className='card-content'>
                    <p className='level1-title'>Standard </p>
                    <p className='level1-Price'>₹12,999</p>
                    <p className='packagepage-subtitle'>Comprehensive support for aspiring authors with free
                      Author copies, certificate, and and eBook placement on
                      Google and Kobo /Online distribution in India</p>

                    <ul className='package-features'>
                      <li>All service in previous</li>
                      <li>80% Royalty for Author</li>
                      <li>Author Copies & Certificate</li>
                      <li>E-Book (Google, Kindle)</li>
                      <li>Standard cover design</li>
                      <li>Interior Design</li>
                      <li>Online Paperback distribution (India)</li>
                      <li>Publishing Plan</li>
                      <li>Digital Proof</li>
                    </ul>
                    <Popupcontactus />

                    {/* <button className='seeallpackages'>See all Features</button> */}

                  </div>
                </Card.Body>
              </Card>

              <Card className='level1-card' >
                <Card.Body>
                  <div className='card-content'>
                    <p className='level1-title'>Advanced</p>
                    <p className='level1-Price'>₹29,999</p>
                    <p className='packagepage-subtitle'>All-inclusive package with International Distribution
                      premium cover and interior design, Prime placement,
                      promotions, and free author session for ambitious authors</p>
                    <ul className='package-features'>
                      <li>All service in previous</li>
                      <li>100% Royalty for Author</li>
                      <li>Premium Cover Design</li>
                      <li>Premium Interior Design</li>
                      <li>International PaperBack Distribution</li>
                      <li>E-Book ( google, kindle, kobo)</li>
                      <li>Author copies (10)</li>
                      <li>Amazon Prime placement (3mon)</li>
                      <li>Kindle Promotion</li>
                      <li>Book Reviews</li>
                      <li>Free Author Session</li>
                      <li>Beta Reading</li>
                    </ul>
                    <Popupcontactus />

                    {/* <button className='seeallpackages'>See all Features</button>
                   */}
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
                <Card.Body >
                  <div className='card-content'>
                    <p className='level1-title'>Elite </p>
                    <p className='level1-Price'>₹49,999</p>
                    <p className='packagepage-subtitle'>Advanced cover & Interior design, extensive marketing
                      campaigns, early or post reviews, promotions and prime
                      listing.</p>
                  </div>
                  <ul className='package-features'>
                    <li>All service in previous</li>
                    <li>Advanced Cover Design</li>
                    <li>Advanced Interior Design</li>
                    <li>International PaperBack Distribution</li>
                    <li>E-Book Placement</li>
                    <li>Amazon A+ listing</li>
                    <li>Amazon Prime (6 Mon)</li>
                    <li>Amazon Ads (3 Mon)</li>
                    <li>Kindle Promotions</li>
                    <li>Book Reviews</li>
                  </ul>
                  <Popupcontactus />

                  {/* <button className='seeallpackages'>See all Features</button> */}
                </Card.Body>
              </Card>

              <Card className='level1-card' >
                <Card.Body>
                  <div className='card-content'>
                    <p className='level1-title'>Premium </p>
                    <p className='level1-Price'>₹69,999</p>
                    <p className='packagepage-subtitle'>Spot light package including Author interviews,
                      Customised designs, proofreading or copy editing sercice,
                      Review campaigns, and additional author copies</p>

                    <ul className='package-features'>
                      <li>All service in previous</li>
                      <li>Complimentry Proof reading or Copy editing</li>
                      <li>Customized Cover Design</li>
                      <li>Advanced interior Design</li>
                      <li>International Paperback distribution</li>
                      <li>E-Book Placement</li>
                      <li>Kindle Promotion</li>
                      <li>Social Media Promotion (Post Publishing)</li>
                      <li>Book Reviews</li>
                      <li>Author Copies</li>
                      <li>Author Video</li>
                    </ul>
                    <Popupcontactus />

                    {/* <button className='seeallpackages'>See all Features</button> */}

                  </div>
                </Card.Body>
              </Card>

              <Card className='level1-card' >
                <Card.Body>
                  <div className='card-content'>
                    <p className='level1-title'>Exclusives</p>
                    <p className='level1-Price'>₹1,19,999</p>
                    <p className='packagepage-subtitle'>Elite services including developmental editing,
                      Proofreading & Copy editing, marketing support, Print
                      media promotions and etc for seasoned authors.</p>
                    <ul className='package-features'>
                      <li>Personal Publishing Manager</li>
                      <li>Proof Reading (40k words)</li>
                      <li>Copy Editing (15k words)</li>
                      <li>Customized Cover Design</li>
                      <li>International Paperback distribution</li>
                      <li>E-book Placements</li>
                      <li>Author Video on website</li>
                      <li>Kindle Promotion</li>
                      <li>Print media Promotion</li>
                      <li>Social Media Promotion (Pre and Post Publishing)</li>

                      <li>Marketing Plan suggestion</li>
                      <li>Publishing Event Handling</li>
                    </ul>
                    <Popupcontactus />

                    {/* <button className='seeallpackages'>See all Features</button> */}
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
  )
}

export default Packages