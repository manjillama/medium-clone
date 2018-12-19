import React from 'react';

export default class StoryPublish extends React.Component{

  renderSavingState(){
    if(this.props.savingState === 'onprogress'){
      return <span>Saving</span>;
    }else if(this.props.savingState === 'saved'){
      return <span>Saved</span>
    }
  }

  render(){
    return (
      <div className="d--flex flex-sb" style={{alignItems: 'flex-end'}}>
        <div className="text--muted">
          {this.renderSavingState()}
        </div>
        <div>
          <button className="mjl-btn-sm mjl-btn btn--p-hollow">Ready To Publish?</button>
        </div>
      </div>
    );
  }
}
