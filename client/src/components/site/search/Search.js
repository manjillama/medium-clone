import React from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import Stories from './Stories';
import People from './People';
import { fetchStories, fetchPeople } from 'services/searchService';
const queryString = require('query-string');

export default class Search extends React.Component {
  constructor(){
    super();
    this.state = {
      stories:[],
      people: [],
      query: ''
    }
  }

  componentDidMount(){
    // To delay blog data send
    this.timeout =  0;

    /*
    * If query string is present in url i.e. /users?q=tamang
    */
    this._searchInitializer(this.props.history.location.search);

  }

  componentWillReceiveProps(nextProps){
    /*
      When user navigate forward and backward from browser
    */
    this._searchInitializer(nextProps.history.location.search);
  }

  _searchInitializer(qString){
    const parsed = queryString.parse(qString);
    const query = parsed.q;
    if(query){
      this.setState({query});
      this.fetchSearchData(query);
    }
  }

  onSearch = e => {
    this.setState({query:e.target.value}, () => {
      if(this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        const {query} = this.state;
        if(query !== ''){ // if input is not empty
          this.fetchSearchData(query);
          this.props.history.push(`${this.props.history.location.pathname}?q=${query}`);
        }else{
          this.setState({ stories:[], people:[] });
          this.props.history.push(this.props.history.location.pathname);
        }
      }, 800);
    });
  }

  fetchSearchData(query){
    fetchStories(query).then(res => {
      this.setState({stories: res.data})
    });
    fetchPeople(query).then(res => {
      this.setState({people: res.data})
    });
  }

  __renderContent(url){
      if(url === '/search'){
        return <Stories stories={this.state.stories}/>
      }else if(url === '/search/users'){
        return <People people={this.state.people}/>
      }else{
        return <h1 style={{width:100+'%'}}>Page not found</h1>
      }
  }

  _renderTabs(url){
    let storyLink;
    let userLink;

    if(this.state.query === ''){
      storyLink = '/search';
      userLink = '/search/users';
    }else{
      storyLink = `/search?q=${this.state.query}`;
      userLink = `/search/users?q=${this.state.query}`;
    }


    if(url === '/search'){
      return (
        <ul className="list-inline">
          <li><Link to={storyLink} className="active">Stories</Link></li>
          <li><Link to={userLink}>People</Link></li>
        </ul>
      );
    }else if(url === '/search/users'){
      return (
        <ul className="list-inline">
          <li><Link to={storyLink}>Stories</Link></li>
          <li><Link to={userLink} className="active">People</Link></li>
        </ul>
      );
    }

    return (
      <ul className="list-inline">
        <li><Link to={storyLink} className="active">Stories</Link></li>
        <li><Link to={userLink}>People</Link></li>
      </ul>
    );
  }

  render(){
    const url = this.props.location.pathname;
    return (
      <section className="mjl-container p-search">

        <input value={this.state.query} autoComplete="off" placeholder="Search Threadly" onChange={this.onSearch} className="text-input"/>

        <div className="s-wrapper">
          <nav>
            {this._renderTabs(url)}
          </nav>

          <div className="s-content d--flex">

            {this.__renderContent(url)}

            <div className="s-adv">
            <span className="adv-t text--muted">
              <img
                style={{height: 14+'px',marginRight: 5+'px'}}
                src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE1IDE1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNSAxNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggZD0iTTE0Ljk4Miw3QzE0LjczNiwzLjI1NiwxMS43NDQsMC4yNjMsOCwwLjAxN1YwSDcuNUg3djAuMDE3QzMuMjU2LDAuMjYzLDAuMjYzLDMuMjU2LDAuMDE3LDdIMHYwLjUgICBWOGgwLjAxN0MwLjI2MywxMS43NDQsMy4yNTYsMTQuNzM2LDcsMTQuOTgyVjE1aDAuNUg4di0wLjAxOGMzLjc0NC0wLjI0Niw2LjczNi0zLjIzOCw2Ljk4Mi02Ljk4MkgxNVY3LjVWN0gxNC45ODJ6IE00LjY5NSwxLjYzNSAgIEM0LjIxMiwyLjI3NywzLjgxMSwzLjA4MiwzLjUxOSw0SDIuMDIxQzIuNjczLDIuOTgzLDMuNTk5LDIuMTYsNC42OTUsMS42MzV6IE0xLjQ5OCw1aDEuNzU4QzMuMTIyLDUuNjMyLDMuMDM3LDYuMzAzLDMuMDEsN0gxLjAxOSAgIEMxLjA3Miw2LjI5NiwxLjIzOCw1LjYyMywxLjQ5OCw1eiBNMS4wMTksOEgzLjAxYzAuMDI3LDAuNjk3LDAuMTEyLDEuMzY4LDAuMjQ2LDJIMS40OThDMS4yMzgsOS4zNzcsMS4wNzIsOC43MDQsMS4wMTksOHogICAgTTIuMDIxLDExaDEuNDk3YzAuMjkyLDAuOTE4LDAuNjkzLDEuNzIzLDEuMTc3LDIuMzY1QzMuNTk5LDEyLjg0LDIuNjczLDEyLjAxOCwyLjAyMSwxMXogTTcsMTMuOTM2ICAgQzUuOTcyLDEzLjY2MSw1LjA4NywxMi41NTcsNC41NSwxMUg3VjEzLjkzNnogTTcsMTBINC4yNjlDNC4xMjgsOS4zNzcsNC4wMzksOC43MDQsNC4wMSw4SDdWMTB6IE03LDdINC4wMSAgIGMwLjAyOS0wLjcwNCwwLjExOC0xLjM3NywwLjI1OS0ySDdWN3ogTTcsNEg0LjU1QzUuMDg3LDIuNDQzLDUuOTcyLDEuMzM5LDcsMS4wNjVWNHogTTEyLjk3OSw0aC0xLjQ5NiAgIGMtMC4yOTMtMC45MTgtMC42OTMtMS43MjMtMS4xNzgtMi4zNjVDMTEuNCwyLjE2LDEyLjMyNywyLjk4MywxMi45NzksNHogTTgsMS4wNjVDOS4wMjcsMS4zMzksOS45MTMsMi40NDMsMTAuNDUsNEg4VjEuMDY1eiBNOCw1ICAgaDIuNzNjMC4xNDIsMC42MjMsMC4yMjksMS4yOTYsMC4yNiwySDhWNXogTTgsOGgyLjk5Yy0wLjAyOSwwLjcwNC0wLjExOCwxLjM3Ny0wLjI2LDJIOFY4eiBNOCwxMy45MzZWMTFoMi40NSAgIEM5LjkxMywxMi41NTcsOS4wMjcsMTMuNjYxLDgsMTMuOTM2eiBNMTAuMzA1LDEzLjM2NWMwLjQ4My0wLjY0MywwLjg4NS0xLjQ0NywxLjE3OC0yLjM2NWgxLjQ5NiAgIEMxMi4zMjcsMTIuMDE4LDExLjQsMTIuODQsMTAuMzA1LDEzLjM2NXogTTEzLjUwMiwxMGgtMS43NThjMC4xMzQtMC42MzIsMC4yMTktMS4zMDMsMC4yNDYtMmgxLjk5ICAgQzEzLjkyOCw4LjcwNCwxMy43NjIsOS4zNzcsMTMuNTAyLDEweiBNMTEuOTksN2MtMC4wMjctMC42OTctMC4xMTItMS4zNjgtMC4yNDYtMmgxLjc1OGMwLjI2LDAuNjIzLDAuNDI2LDEuMjk2LDAuNDc5LDJIMTEuOTl6IiBmaWxsPSIjNmU2ZTZlIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" alt=""/>
              Sponsored
              </span>
              <div>
                <a href="https://www.ghyampostore.com" rel="noopener noreferrer" target="_blank">
                  <img src="/static/images/ghyampo-sb.png" alt="ghyampo store banner"/>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>
    );
  }
}
