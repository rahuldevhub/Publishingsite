import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../css/Getintouch.css'
import { Row, Col } from 'react-bootstrap'
import insta from '../Assets/socialmedia/instalogo.webp'
// import facebook from '../Assets/socialmedia/fblogo.webp'
// import xlogo from '../Assets/socialmedia/xlogo.webp'
import whatsapp from '../Assets/socialmedia/whatsapplogo.webp'
import linkedin from '../Assets/socialmedia/linkedinlogo.webp'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

const Getintouch = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        alert("Thank you! Your message has been sent.");

        emailjs.sendForm('service_ivsbffk', 'template_symmsej', form.current, {
            publicKey: 'EPw5IJ4VuRmSRdQZg',
        })
            .then(
                () => {
                    console.log('SUCCESS!');
                    e.target.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    

    return (
        <div className='Getintouch' id='Getintouch'>

            <Row className='Getintouch-row'>

                <Col lg="6" md="6" sm="4">
                    <div className='Getintouch-left-content'>
                        <h2>Get in Touch</h2>


                        <Link to={'https://www.instagram.com/ritera_publishing/#/'} target='_blank'> <img src={insta} alt='Instagram branding icon for top book publishing house promoting self publishing in India' className='socialmedia-img' data-aos="zoom-in-down" data-aos-duration="1000" /> </Link>


                        <Link to={'https://wa.me/9488854787'} target='_blank'> <img src={whatsapp} alt='3D WhatsApp logo cube, indicating easy contact with book publishing company in India for self publishing support' className='socialmedia-img' data-aos="zoom-in-down" data-aos-duration="1500" /></Link>

                        {/* <Link to={'https://www.instagram.com/ratix_infotech?igsh=Y2dtZWJ1djlqYTQ2&utm_source=qr'} target='_blank'> <img src={facebook} alt='sample' className='socialmedia-img' data-aos="zoom-in-down" data-aos-duration="2000" /></Link><br /> */}
                        <Link to={'https://www.linkedin.com/company/ritera-publishing/?viewAsMember=true'} target='_blank'> <img src={linkedin} alt='3D WhatsApp logo cube, indicating easy contact with book publishing company in India for self publishing support' className='socialmedia-img' data-aos="zoom-in-down" data-aos-duration="2500" /></Link>



                        <Form className='Contactusform' ref={form} onSubmit={sendEmail}  >
                            {/* <p className='contactform-title'>Contact Us</p> */}

                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Control required type="text" name='user_name' placeholder="Full Name" className='landingpage-contact-label' />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control required type="email" name="user_email" placeholder="Email" className='landingpage-contact-label' />
                            </Form.Group>

                            <Form.Group className="mb-3"  >
                                <Form.Control required type="text" name="user_number" placeholder="Phone Number" className='landingpage-contact-label' />

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Select required aria-label="Default select example" name='user_selection' className='landingpage-contact-label'>
                                    {/* <input onChange={(e) => setService(e.target.value)} /> */}
                                    <option>Select Reason for Contacting</option>
                                    <option value="Manuscript Submission">Manuscript Submission</option>
                                    <option value="Package Details">Package Details</option>
                                    <option value="Other Services">Other Services</option>
                                </Form.Select>
                            </Form.Group>


                            <Form.Check type="checkbox" name='user_subscribe' label= "Subscribe to our Newsletter" className='landingpage-contact-label-2' />

                            <Button className='contactus' type="submit" value="Send">Submit</Button>

                        </Form>
                    </div>
                </Col>


                <Col lg="6" md="6" sm="4">
                    <div className='Faqcontent'>
                        <h2>Frequently asked questions</h2>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header >What genres does Ritera Focuses on?</Accordion.Header>
                                <Accordion.Body className='faq-description'>
                                    At Ritera, we publish a wide range of genres including fiction, non-fiction, poetry,
                                    memoirs, and more. Our goal is to provide a platform for diverse voices and stories that resonate with readers.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Does Ritera accept submissions from new authors?</Accordion.Header>
                                <Accordion.Body className='faq-description'>
                                    Absolutely! We welcome submissions from both new and experienced authors. Our team is dedicated to
                                    discovering and nurturing emerging talent, and we're excited to consider manuscripts from writers of all backgrounds
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>How long does the publishing process take?</Accordion.Header>
                                <Accordion.Body className='faq-description'>
                                    The timeline for publishing can vary depending on the specific needs of each project. However, we strive to work efficiently while maintaining the highest quality standards. Generally,
                                    the process takes anywhere from a months to two from manuscript submission to publication.
                                </Accordion.Body>
                            </Accordion.Item>


                            <Accordion.Item eventKey="3">
                                <Accordion.Header>What marketing support do you provide for authors?</Accordion.Header>
                                <Accordion.Body className='faq-description'>
                                    We offer a range of marketing support services to help authors promote their books and
                                    connect with readers. This includes assistance with book launch events, social media promotion, author website development, book reviews, and more. We work closely withauthors to develop personalized marketing strategies that align with their goals and target audience.
                                </Accordion.Body>
                            </Accordion.Item>



                            <Accordion.Item eventKey="4">
                                <Accordion.Header>What sets Ritera apart from other publishing houses?</Accordion.Header>
                                <Accordion.Body className='faq-description'>
                                    At Ritera, we pride ourselves on our personalized approach and commitment to author satisfaction. We prioritize clear communication, timely delivery, and transparent collaboration throughout the publishing journey. Our talented
                                    team and unique working style ensure that every book receives the attention and care it deserves.
                                </Accordion.Body>
                            </Accordion.Item>


                            <Accordion.Item eventKey="5">
                                <Accordion.Header>How can I submit my manuscript to Ritera?</Accordion.Header>
                                <Accordion.Body className='faq-description'>
                                    You can submit your manuscript to us through our website submission portal. Please review our submission guidelines carefully before sending in your manuscript to ensure that it meets our requirements.
                                    Our editorial team will review your submission and getback to you with feedback and next steps.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="6">
                                <Accordion.Header>Why ritera leads best in service compared to other self publishing houses?</Accordion.Header>
                                <Accordion.Body className='faq-description'>
                                Within the competitive publishing industry, becoming a top self publishing house is no easy feat. Ritera stands out as a leading self publishing house in India by assembling highly skilled and experienced professionals across key departments. This strategic approach ensures authors experience a seamless and smooth publishing journey. At every stage of the publishing process, Ritera prioritizes the value 
                                of authors and their works, delivering exceptional service that harmonizes timeliness, precision, and remarkable results.
                                </Accordion.Body>
                            </Accordion.Item>


                        </Accordion>
                    </div>
                </Col>

            </Row>

        </div>
    )
}

export default Getintouch