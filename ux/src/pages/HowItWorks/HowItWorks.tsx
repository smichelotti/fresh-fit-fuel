import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import BigTitle from '../../components/BigTitle/BigTitle';

export const HowItWorks: React.FunctionComponent = () => {
  const steps = [
    { step: 1, title: 'New menu each week', text: 'The menu for the week will go live each week by 10pm on Sunday.' },
    { step: 2, title: 'Place order', text: 'At checkout, you will enter the required info. (Name, pick up or delivery, Venmo, etc)' },
    { step: 3, title: 'Venmo invoice', text: 'You will receive a request for payment via Venmo and that is HOW you will pay - due Friday 8pm.' },
    { step: 4, title: 'Sunday pick-up or delivery', text: 'Food will be prepared and ready to pick up or deliver on Sunday.' }
  ];

  return (
    <>
      <BigTitle name='How It Works' />

      <div id="how-it-works-content" className="container">
        
        {steps.map(x => (
          <>
            <div className="row">
              <div className="col-5 mx-auto">
                <Card key={x.step} text="white" className="mb-2 green-bg">
                  <Card.Header as="h5">Step {x.step} - {x.title}</Card.Header>
                  <Card.Body>
                    <Card.Text>{x.text}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>

            {(x.step !== (steps.length)) && <div className="row">
              <div className="col text-center">
                <i className="fa fa-arrow-down text-center pink" style={{fontSize: '50px'}}></i>
              </div>
            </div>}

          </>
        ))}

        <div className="row">
          <div className="col-4 mx-auto">
            <h3 className="text-center">Repeat for the next week!</h3>
          </div>
        </div>

      </div>
    </>
  );
}