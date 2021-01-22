import React, { ChangeEvent, useState } from 'react';
import { Alert } from 'react-bootstrap';

export const DistributionInformation: React.FunctionComponent = () => {
    const [isDelivery, setIsDelivery] = useState(false);

    const onDeliveryMethodChange = (event: ChangeEvent<HTMLSelectElement>) => setIsDelivery(event.target.value === 'delivery');


    return (
        <>
            <p>How would you prefer to recieve your food:</p>
            <div className="d-flex justify-content-center">
                <select className="form-control" onChange={onDeliveryMethodChange} style={{ maxWidth: '35%'}}>
                    <option value="pick-up">Pick-Up</option>
                    <option value="delivery">Delivery</option>
                </select>
            </div>
            <Alert className="mt-2" variant="info">
                Delivery will be an extra $5 charge. We delivery within 20 miles!
            </Alert>
            {isDelivery &&
                <div className="justify-content-center">
                    <div className="form-group">
                        <label className="control-label">Full Name</label>
                        <input type="text" className="form-control" id="full_name_id" name="full_name" placeholder="John Deer" />
                    </div>

                    <div className="form-group">
                        <label className="control-label">Street Address 1</label>
                        <input type="text" className="form-control" id="street1_id" name="street1" placeholder="Street address, P.O. box, company name, c/o" />
                    </div>

                    <div className="form-group">
                        <label className="control-label">Street Address 2</label>
                        <input type="text" className="form-control" id="street2_id" name="street2" placeholder="Apartment, suite, unit, building, floor, etc." />
                    </div>

                    <div className="form-group">
                        <label className="control-label">City</label>
                        <input type="text" className="form-control" id="city_id" name="city" placeholder="Smallville" />
                    </div>

                    <div className="form-group">
                        <label className="control-label">Zip Code</label>
                        <input type="text" className="form-control" id="zip_id" name="zip" placeholder="#####"/>
                        </div>
                </div>
            }
        </>
    );
}

export default DistributionInformation