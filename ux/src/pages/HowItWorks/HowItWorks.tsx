import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BigTitle from '../../components/BigTitle/BigTitle';

export const HowItWorks: React.FunctionComponent = () => {
    return (
        <>
            <BigTitle name='How It Works' />

            <div id="how-it-works-content" className="container">
                <div style={{ display: 'flex' }}>
                    <p style={{ background: 'yellow' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sunt id doloribus vero
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
                    <img style={{ margin: 'auto' }} src="meal-prep2.jpg" />
                </div>

                <div style={{ display: 'flex' }}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sunt id doloribus vero
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