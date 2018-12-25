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
          <div className="d--flex flex-fw">
            <div className="main-c" >
            </div>
            <div className="h-s">
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
