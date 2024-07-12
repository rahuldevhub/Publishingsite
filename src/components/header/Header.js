import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" className="bg-body-tertiary navbar-just  color">
      <Container className='container '>
        <Navbar.Brand href="/" className='Brandlogo'>
          {/* <img src={logo} alt='logo image'></img> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='toggle' />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>

          <Nav className='Navbarcomponents'>
          {/* <Nav.Link href="#deets">Home</Nav.Link> */}
          <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/aboutus">About Us</Nav.Link>
            <Nav.Link href="/allservice">Services</Nav.Link>
            {/* <Nav.Link href="#Testimonials"> Testimonials</Nav.Link> */}
            {/* <Nav.Link href="/careers"> Careers</Nav.Link> */}
            <Nav.Link href="/contact">Packages</Nav.Link>
            <Nav.Link href="/packages">Contact Us</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header