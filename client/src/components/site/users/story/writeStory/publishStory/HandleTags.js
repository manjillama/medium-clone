import React from 'react';

export default class HandleTags extends React.Component{
  constructor(){
    super();
    this.state = {
      tags : [],
      showPlaceholder: true
    }
  }
  componentDidMount(){
    this.editor = document.getElementById("tagEditor");
    this.editor.addEventListener("input", this.handleChange, false);
  }

  handleChange = (e) => {
    const val = e.target.innerText;

    if(val === ''){
      this.setState({showPlaceholder: true})
    }else{
      this.setState({showPlaceholder: false})
    }

    // Checking for comma
    if (val.indexOf(',') !== -1) {
      const tag = val.split(',')[0];
      this.editor.innerText = '';
      this.setState({
        tags: [...this.state.tags, tag],
        showPlaceholder: true
      });
    }
  }

  renderTags(){
    return this.state.tags.map((tag, index) =>
      <span key={index}>{tag}</span>
    )
  }

  render(){
    return (
      <div className="handleTags">
        <h2>Prepare your story for readers</h2>
        <p>Add or change tags (up to 5) so readers know what your story is about</p>
        <p>Review Threadly’s <a target="_blank" href="/threadly/policy" style={{textDecoration:'underline'}}>rules</a> to ensure that your story meets our community standards.</p>
        <br/>
          <div className="p-add-tags">
            <div className="tags-wrapper" style={{display: 'inline-block'}}>
              {this.renderTags()}
            </div>
            <div className="c-input-wrap" style={{position: 'relative'}}>
              { this.state.showPlaceholder && (<span className="text--muted c-placeholder">Add a tag...</span>)}
              <div contentEditable={true} id="tagEditor"></div>
            </div>
          </div>
      </div>
    );
  }
}
