import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Typography } from "@mui/material";

export default function CustomAnalytics(props) {
  function close() {
    props.setShow(false);
  }
  function submitHandler(e) {
    e.preventDefault();
    props.getData();
    close();
  }

  const Inputchange = (event) => {
    const { name, value } = event.target;
    props.setDateRange({
      ...props.dateRange,
      [name]: value,
    });
  };

  return (
    <Modal
      {...props}
      show={props.show}
      onHide={close}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Custom Analytics
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Row>
            <Form.Group
              as={Col}
              md="6"
              className="mb-3"
              controlId="formStartDate"
            >
              <Form.Label>Start Date</Form.Label>

              <Form.Control
                autoFocus
                type="date"
                name="startDate"
                value={props.dateRange.startDate}
                onChange={Inputchange}
                required
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              className="mb-3"
              controlId="formEndDate"
            >
              <Form.Label>End Date</Form.Label>

              <Form.Control
                type="date"
                name="endDate"
                value={props.dateRange.endDate}
                onChange={Inputchange}
              />
            </Form.Group>
          </Row>
          <Typography variant="caption" sx={{ margin: "10px" }}>
            <b>Note:</b> If no end date is specified, the data will be presented
            up to the end of yesterday.
          </Typography>
          <Modal.Footer style={{ marginTop: "10px" }}>
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button variant="secondary" onClick={close}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
