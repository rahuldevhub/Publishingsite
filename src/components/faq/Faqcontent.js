import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import './faqcontent.css'
const Faqcontent = () => {
  return (
    <div className='Faqcontent'>


<Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header >What genres does Ritera Focuses on?</Accordion.Header>
        <Accordion.Body className='faq-description'>
        At Ritera, we publish a wide range of genres including fiction, non-fiction, poetry, 
        memoirs, and more. Our goal is to provide a platformfor diverse voices and stories that resonate with readers.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>Does Ritera accept submissions from new authors?</Accordion.Header>
        <Accordion.Body className='faq-description'>
        Absolutely! We welcome submissions from both new andexperienced authors. Our team is dedicated to
         discovering andnurturing emerging talent, and we're excited to consider manuscriptsfrom writers of all backgrounds
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>How long does the publishing process take?</Accordion.Header>
        <Accordion.Body className='faq-description'>
        The timeline for publishing can vary depending on the specific needsof each project. However, we strive to work efficiently whilemaintaining the highest quality standards. Generally,
         the processtakes anywhere from a months to two from manuscript submissionto publication.
        </Accordion.Body>
      </Accordion.Item>


      <Accordion.Item eventKey="3">
        <Accordion.Header>What marketing support do you provide for authors?</Accordion.Header>
        <Accordion.Body className='faq-description'>
        We offer a range of marketing support services to help authorspromote their books and 
        connect with readers. This includesassistance with book launch events, social media promotion, authorwebsite development, book reviews, and more. We work closely withauthors to develop personalized marketing strategies that align withtheir goals and target audience.
        </Accordion.Body>
      </Accordion.Item>



      <Accordion.Item eventKey="4">
        <Accordion.Header>What sets Ritera apart from other publishing houses?</Accordion.Header>
        <Accordion.Body className='faq-description'>
        At Ritera, we pride ourselves on our personalized approach andcommitment to author satisfaction. We prioritize clearcommunication, timely delivery, and transparent collaborationthroughout the publishing journey. Our talented
         team and uniqueworking style ensure that every book receives the attention and careit deserves.
        </Accordion.Body>
      </Accordion.Item>


      <Accordion.Item eventKey="5">
        <Accordion.Header>How can I submit my manuscript to Ritera?</Accordion.Header>
        <Accordion.Body className='faq-description'>
        You can submit your manuscript to us through our websitesubmission portal. Please review our submission guidelines carefullybefore sending in your manuscript to ensure that it meets ourrequirements. 
        Our editorial team will review your submission and getback to you with feedback and next steps.
        </Accordion.Body>
      </Accordion.Item>

    </Accordion>
    </div>
  )
}

export default Faqcontent