import React from "react";
import "./About.css";
import "font-awesome/css/font-awesome.min.css";
export default class Contact extends React.Component {
  render() {
    return (
      <section className="p-about">
        <link
          href="https://fonts.googleapis.com/css?family=Abril+Fatface&display=swap"
          rel="stylesheet"
        />
        <article>
          <h1>Welcome to Threadly.</h1>
          <p className="text-muted">
            Who really aren't visionaries? We all dream of changing the world or
            community for the betterment. But being a visionary and strong will
            only takes a person so far.{" "}
            <b>WE ALL NEED A TEAM TO MAKE IT WORK!</b> A Paul Allen for Bill
            Gates, Steve Wozniak for Steve Jobs. Threadly aims to provide a
            platform for such Nepalese people to share ideas and discover
            talents in close quarters. Read, share be influential and get
            influenced that's what Threadly is all about.
          </p>
        </article>
        <hr style={{ margin: 22 + "px " + 0 }} />
        <h2>Meet the Creator</h2>
        <div className="text-center">
          <a
            href="https://manjiltamang.vortexnepal.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              src="/static/images/creator.jpg"
              alt="Threadly Creator"
              className="img--responsive"
            />
          </a>
        </div>
        <p className="text-center text--muted">
          <a
            href="https://manjiltamang.vortexnepal.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <strong>Manjil Tamang</strong>
          </a>
        </p>
      </section>
    );
  }
}
