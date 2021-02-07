import React from 'react';
import BigTitle from '../../components/BigTitle/BigTitle';
import Image from 'react-bootstrap/esm/Image';

export const AboutMe: React.FunctionComponent = () => {
    return (
        <>

            <BigTitle name='About' />

            <div id="about-me-content" className="container mt-3">
              <p className="">
                Welcome to Fresh Fit Fuel! My name is Jenna Michelotti and I am so glad you are here. 
                I started meal prepping for myself over a year ago and it has been a game changer. 
                Not only does it save a lot of time and mental energy but it also is super healthy and fuels me throughout my day. 
                I am an elite level CrossFit teen athlete who trains 2-4 hours 6 days/week and I need to eat ALL. THE. TIME.
              </p>
              <p className="">
                The only thing that people don’t tell you about meal prepping is that it can be time consuming and stressful to put together. 
                That is why I created Fresh Fit Fuel… so you can have all the benefits of meal prep with none of the hassle.

                We have all experienced having “no food in the house” or you “don’t know what to eat” for a meal and end up just eating a bowl of cereal. 
                That is why Fresh Fit Fuel is the perfect solution because you will not only have a “no-thought” meal but also a healthy one! On top of all of that, you will be supporting a new small business! 
              </p>

              <div className="row mb-2 ml-1 mr-2">
                  <Image src="jennaRowing.jpg" style={{ margin: 'auto' }} rounded/>
              </div>
            </div>

        </>
    );
}