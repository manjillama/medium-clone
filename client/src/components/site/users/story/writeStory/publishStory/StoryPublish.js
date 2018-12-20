import React from 'react';
import './StoryPublish.css';
import PublishModal from './PublishModal';

export default class StoryPublish extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      noStoryError: false,
      displayModal: false
    }
  }
  handlePublishClick = () => {
    if(this.props.blog.title === '' || this.props.blog.post === ''){
      this.setState({noStoryError: true}, () => {
        setTimeout(() => {
          this.setState({noStoryError: false});
        }, 3000);
      });
    }else{
      this.setState({displayModal: true})
    }
  }
  renderSavingState(){
    if(this.props.savingState === 'onprogress'){
      return <span>Saving</span>;
    }else if(this.props.savingState === 'saved'){
      return <span>Saved</span>
    }
  }

  closeModal = () => {
    this.setState({displayModal:false});
  }

  renderNoStoryError(){
    if(this.state.noStoryError){
      return (
        <div id="noStoryError">
          <p>Publishing will become available once you add title and story.</p>
        </div>
      );
    }
  }

  renderModal(){
    if(this.state.displayModal){
      return (
        <PublishModal closeModal={this.closeModal}/>
      )
    }
  }

  render(){
    return (
      <div className="d--flex flex-sb" style={{alignItems: 'flex-end'}}>
        <div className="text--muted">
          {this.renderSavingState()}
        </div>
        <div style={{position: 'relative'}}>
          <button onClick={this.handlePublishClick} className="mjl-btn-sm mjl-btn btn--p-hollow">Ready To Publish?</button>
          {this.renderNoStoryError()}
        </div>
        {this.state.displayModal && this.renderModal()}
      </div>
    );
  }
}
