import React from 'react';
import './Search.css';

export default class Search extends React.Component {

  handleOnSubmit = (e) => {
    e.preventDefault();
  }

  render(){
    return (
      <section className="container--sm p-search">
        <form onSubmit={this.handleOnSubmit}>
          <input autoComplete="off" placeholder="Search Threadly" className="text-input"/>
        </form>
      </section>
    );
  }
}
