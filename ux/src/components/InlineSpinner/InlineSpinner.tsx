import React from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';

interface AppSpinnerProps { text: string };

export const InlineSpinner: React.FunctionComponent<AppSpinnerProps> = (props) => {
  
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" variant="primary" />
      <h6 className="ml-3">{props.text}</h6>
    </div>
  );
};