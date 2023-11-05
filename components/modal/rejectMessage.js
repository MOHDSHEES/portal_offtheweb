import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function RejectMessage(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Resaon</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={props.reject}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Message</Form.Label>

            <Form.Control
              autoFocus
              onChange={(e) => props.setReason(e.target.value)}
              value={props.reason}
              as="textarea"
              placeholder="provide the reason of rejection..."
              rows={3}
              required
            />
          </Form.Group>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
