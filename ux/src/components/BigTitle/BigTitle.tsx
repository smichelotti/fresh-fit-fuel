import React from 'react';

export interface titleProps {
    name: string;
}
export const BigTitle: React.FunctionComponent<titleProps> = (props) => {
    return (
        <>
            <div style={{backgroundImage: "url(/crossword.png)", backgroundColor: '#1ABC9C'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="product-bit-title text-center">
                                <h2>{props.name}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BigTitle