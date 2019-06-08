import React from 'react';
import './About.css';
import 'font-awesome/css/font-awesome.min.css';
export default class Contact extends React.Component{
  render(){
    return (
      <section className="p-about">
        <link href="https://fonts.googleapis.com/css?family=Abril+Fatface&display=swap" rel="stylesheet" />
        <article>
          <h1>Be Influential and Get Influenced! Welcome to Threadly.</h1>
          <p className="text-muted">
            Who really aren't visionaries? We all dream of changing the world or community for the betterment. But being a visionary and strong will only takes a person so far. <b>WE ALL NEED A TEAM TO MAKE IT WORK!</b> A Paul Allen for Bill Gates, Steve Wozniak for Steve Jobs.
            Threadly aims to provide a platform for such Nepalese people to share ideas and discover talents in close quarters.
            Read, share, make new friends, be influential and get influenced that's what Threadly is all about.
          </p>
        </article>
        <hr style={{margin: 22+'px '+0}}/>
        <h2>Meet the Creator</h2>
        <div className="text-center"><img src="/static/images/creator.jpg" alt="Threadly Creator" className="img--responsive"/></div>
        <p className="c-quote">
          <i className="fa fa-quote-left" aria-hidden="true"></i> Started as a pet project of mine.
            Threadly really started to come to life after I indulged myself more with the power of social media.
            To be able to find and connect similar people in a close proximity who shares the same vision as you is certainly a remarkable
            experience. <i className="fa fa-quote-right" aria-hidden="true"></i>
        </p>
        <p className="text-center text--muted">- Manjil Tamang</p>
      </section>
    );
  }
}
