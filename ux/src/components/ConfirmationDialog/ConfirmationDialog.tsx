import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';

interface ConfirmationDialogProps {
  show: boolean;
  title?: string;
  message?: string;
  yesText?: string;
  noText?: string;
  onDismiss?: (result: boolean) => void;
}

export const ConfirmationDialog: React.FunctionComponent<ConfirmationDialogProps> = (props) => {
  const [show, setShow] = useState(props.show);

  useEffect(() => {
    setShow(props.show);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show]);

  const dismiss = (value: boolean)  => props.onDismiss ? props.onDismiss(value) : setShow(value);

  return (
    <Modal show={show} onHide={() => dismiss(false)} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => dismiss(true)}>{props.yesText || 'Yes'}</Button>
        <Button variant="secondary" onClick={() => dismiss(false)}>{props.noText || 'No'}</Button>
      </Modal.Footer>
    </Modal>
  );
};
