import React, { useEffect } from 'react'
import Header from '../components/header/Header'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import '../css/packagepage.css'
import { Link } from 'react-router-dom';
import Popupcontactus from '../components/popup/Popupcontactus';
const Packagespage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div className='Packagespage'>
        <Header/>

        <div className='allservice-title-top'>
                <p className='allservice-overall-title' >Packages</p>
            </div>


            <div className='packagepage-overall'>
            <Row xs={2} sm={2} md={3} lg={3} className="g-4 ">
            <div className='packagepage-card'>
<Card  >
    <Card.Body >
        <div className=''>
            <p className='package-title'>Package 1</p>
            <p className='package-subtitle'>Essential services with standard cover and interior designs,
                and eBook formatting for budding authors /Online
                distribution in India stores.</p>
            <p className='package-Price'>₹8,999</p>

        </div>
        <ul className='package-features'>

            <li>Personal Publishing Manager</li>
            <li>Standard Cover Design</li>
            <li>Standard Interior Design</li>
            <li>Online PaperBack Distribution (India)</li>
            <li>E-Book Placement (Google) </li>

        </ul>
        <Popupcontactus />

    
    </Card.Body>
</Card>

</div>
<div className='packagepage-card2' >
<Card  >
    <Card.Body>
        <div className=''>
            <p className='package-title'>Package 2</p>
            <p className='package-subtitle'>Comprehensive support for aspiring authors with free
                Author copies, certificate, and and eBook placement on
                Google and Kobo /Online distribution in India</p>
            <p className='package-Price'>₹12,999</p>
            <ul className='package-features'>
                <li>All service in previous</li>
                <li>80% Royalty for Author</li>
                <li>Author Copies & Certificate</li>
                <li>E-Book (Google, Kindle)</li>
                <li>Online Paperback distribution</li>

            </ul>
            <Popupcontactus />


        </div>
    </Card.Body>
</Card>
</div>
<div className='packagepage-card'>

<Card  >
    <Card.Body>
        <div className='package-title'>
            <p className=''>Package 3</p>
            <p className='package-subtitle'>All-inclusive package with International Distribution
                premium cover and interior design, Prime placement,
                promotions, and free author session for ambitious authors</p>

            <p className='package-Price'>₹29,999</p>

            <ul className='package-features'>
                <li>All service in previous</li>
                <li>100% Royalty for Author</li>
                <li>Premium Cover Design</li>
                <li>Premium Interior Design</li>
                <li>International PaperBack Distribution</li>
            </ul>
            <Popupcontactus />

           
        </div>
    </Card.Body>
</Card>
</div>
</Row>
            </div>

            <br/>
            <br/>


{/* <div>
            <Row xs={2} md={2} lg={3} className="g-4  packageall">

<Card className='level1-card'>
    <Card.Body >
        <div className='card-content'>
            <p className='level1-title'>Package 4</p>
            <p className='level1-description'>Advanced cover & Interior design, extensive marketing
                campaigns, early or post reviews, promotions and prime
                listing..</p>
            <p className='level1-Price'>₹49,999</p>
            <button className='level1-button'>Choose this plan</button>
        </div>
        <ul className='package-features'>
            <li>All service in previous</li>

            <li>Advance Cover Design</li>
            <li>Advance Interior Design</li>
            <li>International PaperBack Distribution (India)</li>
            <li>E-Book Placement</li>
            <li>Amazon A+ listing</li>

        </ul>
        <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link>


    </Card.Body>
</Card>

<Card className='level1-card'>
    <Card.Body>
        <div className='card-content'>
            <p className='level1-title'>Package 5</p>
            <p className='level1-description'>Spot light package including Author interviews,
                Customised designs, proofreading or copy editing sercice,
                Review campaigns, and additional author copies</p>
            <p className='level1-Price'>₹69,999</p>
            <button className='level1-button'>Choose this plan</button>

            <ul className='package-features'>
                <li>All service in previous</li>
                <li>Complimentry Proof reading or Copy editing</li>
                <li>Customized Cover Design</li>
                <li>Advance interior Design</li>
                <li>International Paperback distribution</li>

            </ul>
            <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link>

        </div>
    </Card.Body>
</Card>


<Card className='level1-card'>
    <Card.Body>
        <div className='card-content'>
            <p className='level1-title'>Package 6</p>
            <p className='level1-description'>Elite services including developmental editing,
                Proofreading & Copy editing, marketing support, Print
                media promotions and etc for seasoned authors.</p>
            <p className='level1-Price'>₹1,18,999</p>
            <button className='level1-button'>Choose this plan</button>

            <ul className='package-features'>
                <li>Personal Publishing Manager</li>
                <li>Proff Reading (40k words)</li>
                <li>Copy Editing (15k words)</li>
                <li>Customized Cover Design</li>
                <li>International Paperback distribution</li>
                <li>E-book Placements</li>
                <li>Author Vedio on website</li>
              
            </ul>
        
            <Link to={'/packages'}><button className='seeallpackages'>See all Features</button></Link>

        </div>
    </Card.Body>
</Card>


</Row>
</div> */}


    </div>
  )
}

export default Packagespage