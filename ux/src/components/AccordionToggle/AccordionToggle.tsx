import React from 'react';
import { useAccordionToggle } from 'react-bootstrap';

interface AccordionToggleProps {
    eventKey: string;
    navType: string;
    text: string;
}


export const AccordionToggle: React.FunctionComponent<AccordionToggleProps> = (props) => {
    const changeOnClick = useAccordionToggle(props.eventKey, () =>
        console.log('props', props)
    );


    return (
        <>
            <button
            type="button"
            onClick={changeOnClick}
            className={props.navType}
            >
                {props.text}
            </button>
        </>
    )
}

export default AccordionToggle