import React from 'react';
import './About.css';
import 'font-awesome/css/font-awesome.min.css';
export default class Contact extends React.Component{
  render(){
    return (
      <section className="p-about">
        <article>
          <h1>Be Influential and Get Influenced! Welcome to Threadly.</h1>
          <p>
            It wouldn't be an overstatement to say Nepal, as a country is undoubtedly one of the least developed nation gasping to catch up with rest of the world.
            I personally don't believe its because of lack of talent among Nepalese people.
            Talent doesn't necessarily comes with birth but something that's forged out of an individual with years of training.
            Here at Threadly, we firmly believe that.
            Threadly aims to provide a platform for such Nepalese people to share ideas and discover talents in close quarters.
            Read, share, be influential and get influenced that's what Threadly is all about.
          </p>
        </article>
        <h2>Meet the Creator</h2>
        <p className="c-quote">
          <i class="fa fa-quote-left" aria-hidden="true"></i> Started as a pet project of mine.
            Threadly really started to come to life after I indulged myself more with the power of social media.
            To be able to find and connect similar people in a close proximity who shares the same vision as you is certainly a remarkable
            experience. <i class="fa fa-quote-right" aria-hidden="true"></i>
        </p>
      </section>
    );
  }
}
