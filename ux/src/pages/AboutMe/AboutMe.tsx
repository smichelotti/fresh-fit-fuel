import React from 'react';
import BigTitle from '../../components/BigTitle/BigTitle';

export const AboutMe: React.FunctionComponent = () => {
    return (
        <>

            <BigTitle name='About Me' />

            <div id="about-me-content" className="container">
                <div style={{ display: 'flex' }}>
                    <p className="customer-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sunt id doloribus vero
                    quam laborum quas alias dolores blanditiis iusto consequatur, modi aliquid eveniet eligendi
                    iure eaque ipsam iste, pariatur omnis sint! Suscipit, debitis, quisquam. Laborum commodi
                    veritatis magni at? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sunt id doloribus vero
                    quam laborum quas alias dolores blanditiis iusto consequatur, modi aliquid eveniet eligendi
                    iure eaque ipsam iste, pariatur omnis sint! Suscipit, debitis, quisquam. Laborum commodi
                    veritatis magni at? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sunt id doloribus vero
                    quam laborum quas alias dolores blanditiis iusto consequatur, modi aliquid eveniet eligendi
                    iure eaque ipsam iste, pariatur omnis sint! Suscipit, debitis, quisquam. Laborum commodi
                veritatis magni at?</p>
                </div>

                <div style={{ display: 'flex' }}>
                    <img style={{ margin: 'auto' }} src="jennaRowing.jpg" alt=""/>
                </div>

                <div style={{ display: 'flex' }}>
                    <p className="customer-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sunt id doloribus vero
                    quam laborum quas alias dolores blanditiis iusto consequatur, modi aliquid eveniet eligendi
                    iure eaque ipsam iste, pariatur omnis sint! Suscipit, debitis, quisquam. Laborum commodi
                    veritatis magni at? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sunt id doloribus vero
                    quam laborum quas alias dolores blanditiis iusto consequatur, modi aliquid eveniet eligendi
                    iure eaque ipsam iste, pariatur omnis sint! Suscipit, debitis, quisquam. Laborum commodi
                    veritatis magni at? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sunt id doloribus vero
                    quam laborum quas alias dolores blanditiis iusto consequatur, modi aliquid eveniet eligendi
                    iure eaque ipsam iste, pariatur omnis sint! Suscipit, debitis, quisquam. Laborum commodi
                veritatis magni at?</p>
                </div>
            </div>

        </>
    );
}