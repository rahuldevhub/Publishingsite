import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../contactusform/contactusform.css'

const Contactusform = () => {
    return (
        <Form className='Contactusform'   >
            {/* <p className='contactform-title'>Contact Us</p> */}


            <Form.Group className="mb-3" controlId="formBasicPassword">
                {/* <Form.Label>Name</Form.Label> */}
                <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
                {/* <Form.Label>Mobile Number</Form.Label> */}
                <Form.Control type="text" placeholder="Enter your number" />

            </Form.Group>
            <Form.Group className="mb-3">
                {/* <Form.Label>Reason for Contacting</Form.Label> */}
                <Form.Select aria-label="Default select example">
                    <option>Select Reason for Contacting</option>
                    <option value="1">Manuscript Submission</option>
                    <option value="2">Package Details</option>
                    <option value="3">Other Services</option>
                </Form.Select>
                <Form.Text className="text-muted">
                    Your details are in safe hands.
                </Form.Text></Form.Group>

          <a href="mailto:riterapublishing@gmail.com?body=My custom mail body">  <Button className='contactus' type="submit">
                Submit
            </Button></a>
        </Form>
    )
}

export default Contactusform