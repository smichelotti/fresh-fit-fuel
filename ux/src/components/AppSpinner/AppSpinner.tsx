import React from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';

interface AppSpinnerProps { text: string };

export const AppSpinner: React.FunctionComponent<AppSpinnerProps> = (props) => {
  
  return (
    <div className="container mt-4 d-flex justify-content-center">
      <Spinner animation="border" variant="primary" />
      <h4 className="ml-3">{props.text}</h4>
    </div>
  );
};
