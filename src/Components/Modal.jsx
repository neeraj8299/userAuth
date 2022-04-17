import { Button, Modal } from "react-bootstrap";

export default function Modals(props) {
  const {
    show,
    handleClose,
    heading,
    body,
    successBtnTxt,
    isCentered,
    variant,
    type,
    handleSubmit,
  } = props;
  return (
    <Modal show={show} centered={isCentered} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(type)}>
          Cancel
        </Button>
        <Button variant={variant} onClick={() => handleSubmit(type)}>
          {successBtnTxt}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
