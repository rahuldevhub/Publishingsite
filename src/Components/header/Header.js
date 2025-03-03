import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'
import logo from '../../Assets/logo.webp'


const Header = () => {
  return (
    
    <Navbar collapseOnSelect expand="lg" sticky="top" className="bg-body-tertiary navbar-just  color">
      <Container className='container '>
        <Navbar.Brand href="/" className='Brandlogo'>
          <img src={logo} alt='logo image'  data-aos="flip-left"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='toggle' />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>

          <Nav className='Navbarcomponents'>
   
          <Nav.Link href="/" data-aos="fade-down">Home</Nav.Link>
            <Nav.Link href="/aboutus" data-aos="fade-down">About</Nav.Link>
            <Nav.Link href="/customize-package" data-aos="fade-down">Customize</Nav.Link>
            {/* <Nav.Link href="#Testimonials"> Testimonials</Nav.Link> */}
            {/* <Nav.Link href="/careers"> Careers</Nav.Link> */}
            <Nav.Link href="/packages" data-aos="fade-down">Packages</Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header