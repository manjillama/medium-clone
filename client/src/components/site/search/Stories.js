import React from 'react';

export default () => {
  const backgroundImage = 'https://manjiltamang-threadly.s3.ap-south-1.amazonaws.com/1_FXta44aycRPHPxDkFssi3IgOxIUXuoki.jpg';

  return (
    <div className="s-c">

      <div>
        <div style={{margin: `${20}px ${0}`}}>
          <img className="user--img"
            src="https://manjiltamang-threadly.s3.ap-south-1.amazonaws.com/1_xG6j0K1DgI1YiAzC1bItZL2s090EYXDQ.jpg"
            alt="Manjil Tamang"/>
          <div className="user-i">
            <a href="/">Manjil Tamang</a>
            <span className="text--muted">Jan 19, 2017</span>
          </div>
        </div>
        <div className="s-story">
          <div className="story-box" style={{backgroundImage: `url(${backgroundImage})`}}>
          </div>
          <article>
            <h2>So long MVP. Hello Minimum Loveable Product.</h2>
            <p className="text--muted">
              Key Findings:Most common question which I had during my research on Elastic Search.1. Why Elasticsearch?A. The answer is simple, t...
            </p>
          </article>
        </div>
        <div className="s-story">
          <div className="story-box" style={{backgroundImage: `url(${backgroundImage})`}}>
          </div>
          <article>
            <h2>So long MVP. Hello Minimum Loveable Product.</h2>
            <p className="text--muted">
              Key Findings:Most common question which I had during my research on Elastic Search.1. Why Elasticsearch?A. The answer is simple, t...
            </p>
          </article>
        </div>
      </div>

      <div>
        <div style={{margin: `${15}px ${0}`}}>
          <img className="user--img"
            src="https://manjiltamang-threadly.s3.ap-south-1.amazonaws.com/1_xG6j0K1DgI1YiAzC1bItZL2s090EYXDQ.jpg"
            alt="Manjil Tamang"/>
          <div className="user-i">
            <a href="/">Manjil Tamang</a>
            <span className="text--muted">Jan 19, 2017</span>
          </div>
        </div>
        <div className="s-story">
          <div className="story-box" style={{backgroundImage: `url(${backgroundImage})`}}>
          </div>
          <article>
            <h2>So long MVP. Hello Minimum Loveable Product.</h2>
            <p className="text--muted">
              Key Findings:Most common question which I had during my research on Elastic Search.1. Why Elasticsearch?A. The answer is simple, t...
            </p>
          </article>
        </div>
      </div>

    </div>
  );
}
