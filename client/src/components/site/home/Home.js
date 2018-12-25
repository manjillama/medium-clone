import React from 'react';
import CategoryNav from 'components/site/includes/CategoryNav';
import { connect } from 'react-redux';
import './Home.css';
class Home extends React.Component{
  render(){
    return (
      <div>
        <CategoryNav/>
        <section className="h-page">
          <div className="d--flex h-c-wrap flex-fw">

            <div className="main-c" >

              <div>
                <h4 className="p-t">Latest</h4>
                <div className="c-item d--flex">
                  <div>
                    <h3>What Are The Habits Of Successful People?</h3>
                    <article>
                      <p className="d-summary text--muted">The 7 Habits of Highly Effective People is one of the best-selling books of all time. The advice is solid, but there’s one huge problem with it: the title.</p>
                      <div className="c-info">
                        <p>Manjil Tamang</p>
                        <span className="text--muted">18, Dec 13</span>
                      </div>
                    </article>
                  </div>
                  <div className="h-s-img">
                  </div>
                </div>

                <div className="c-item d--flex">
                  <div>
                    <h3>What Are The Habits Of Successful People?</h3>
                    <article>
                      <p className="d-summary text--muted">The 7 Habits of Highly Effective People is one of the best-selling books of all time. The advice is solid, but there’s one huge problem with it: the title.</p>
                      <div className="c-info">
                        <p>Manjil Tamang</p>
                        <span className="text--muted">18, Dec 13</span>
                      </div>
                    </article>
                  </div>
                </div>
              </div>

            </div>
            <div className="h-s">
              <span className="adv-t text--muted">
                <img
                  style={{height: 14+'px',marginRight: 5+'px'}}
                  src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE1IDE1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNSAxNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggZD0iTTE0Ljk4Miw3QzE0LjczNiwzLjI1NiwxMS43NDQsMC4yNjMsOCwwLjAxN1YwSDcuNUg3djAuMDE3QzMuMjU2LDAuMjYzLDAuMjYzLDMuMjU2LDAuMDE3LDdIMHYwLjUgICBWOGgwLjAxN0MwLjI2MywxMS43NDQsMy4yNTYsMTQuNzM2LDcsMTQuOTgyVjE1aDAuNUg4di0wLjAxOGMzLjc0NC0wLjI0Niw2LjczNi0zLjIzOCw2Ljk4Mi02Ljk4MkgxNVY3LjVWN0gxNC45ODJ6IE00LjY5NSwxLjYzNSAgIEM0LjIxMiwyLjI3NywzLjgxMSwzLjA4MiwzLjUxOSw0SDIuMDIxQzIuNjczLDIuOTgzLDMuNTk5LDIuMTYsNC42OTUsMS42MzV6IE0xLjQ5OCw1aDEuNzU4QzMuMTIyLDUuNjMyLDMuMDM3LDYuMzAzLDMuMDEsN0gxLjAxOSAgIEMxLjA3Miw2LjI5NiwxLjIzOCw1LjYyMywxLjQ5OCw1eiBNMS4wMTksOEgzLjAxYzAuMDI3LDAuNjk3LDAuMTEyLDEuMzY4LDAuMjQ2LDJIMS40OThDMS4yMzgsOS4zNzcsMS4wNzIsOC43MDQsMS4wMTksOHogICAgTTIuMDIxLDExaDEuNDk3YzAuMjkyLDAuOTE4LDAuNjkzLDEuNzIzLDEuMTc3LDIuMzY1QzMuNTk5LDEyLjg0LDIuNjczLDEyLjAxOCwyLjAyMSwxMXogTTcsMTMuOTM2ICAgQzUuOTcyLDEzLjY2MSw1LjA4NywxMi41NTcsNC41NSwxMUg3VjEzLjkzNnogTTcsMTBINC4yNjlDNC4xMjgsOS4zNzcsNC4wMzksOC43MDQsNC4wMSw4SDdWMTB6IE03LDdINC4wMSAgIGMwLjAyOS0wLjcwNCwwLjExOC0xLjM3NywwLjI1OS0ySDdWN3ogTTcsNEg0LjU1QzUuMDg3LDIuNDQzLDUuOTcyLDEuMzM5LDcsMS4wNjVWNHogTTEyLjk3OSw0aC0xLjQ5NiAgIGMtMC4yOTMtMC45MTgtMC42OTMtMS43MjMtMS4xNzgtMi4zNjVDMTEuNCwyLjE2LDEyLjMyNywyLjk4MywxMi45NzksNHogTTgsMS4wNjVDOS4wMjcsMS4zMzksOS45MTMsMi40NDMsMTAuNDUsNEg4VjEuMDY1eiBNOCw1ICAgaDIuNzNjMC4xNDIsMC42MjMsMC4yMjksMS4yOTYsMC4yNiwySDhWNXogTTgsOGgyLjk5Yy0wLjAyOSwwLjcwNC0wLjExOCwxLjM3Ny0wLjI2LDJIOFY4eiBNOCwxMy45MzZWMTFoMi40NSAgIEM5LjkxMywxMi41NTcsOS4wMjcsMTMuNjYxLDgsMTMuOTM2eiBNMTAuMzA1LDEzLjM2NWMwLjQ4My0wLjY0MywwLjg4NS0xLjQ0NywxLjE3OC0yLjM2NWgxLjQ5NiAgIEMxMi4zMjcsMTIuMDE4LDExLjQsMTIuODQsMTAuMzA1LDEzLjM2NXogTTEzLjUwMiwxMGgtMS43NThjMC4xMzQtMC42MzIsMC4yMTktMS4zMDMsMC4yNDYtMmgxLjk5ICAgQzEzLjkyOCw4LjcwNCwxMy43NjIsOS4zNzcsMTMuNTAyLDEweiBNMTEuOTksN2MtMC4wMjctMC42OTctMC4xMTItMS4zNjgtMC4yNDYtMmgxLjc1OGMwLjI2LDAuNjIzLDAuNDI2LDEuMjk2LDAuNDc5LDJIMTEuOTl6IiBmaWxsPSIjNmU2ZTZlIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" alt=""/>
                Sponsored
              </span>
              <div style={{border:1+'px solid'}}>
                Ghyampo Image
              </div>
            </div>

          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { state };
}

export default connect(mapStateToProps)(Home);
