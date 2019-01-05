import React from 'react';
import requireAuth from 'components/requireAuth';
import './Settings.css';
import config from 'config';
import { connect } from 'react-redux';
import { checkAvaiblity, changeUsername } from 'services/usernameService';
import ConfirmBox from 'components/site/utils/ConfirmBox';

class Settings extends React.Component {
  constructor(){
    super();
    this.state = {
      username: '',
      userExist: true,
      editMode: false,
      errorMsg: null,
      successMsg: null
    }
  }

  componentDidMount(){
    this.timeout =  0;
    this.userToken = localStorage.getItem('token');
    this.usernameRegex = /^[a-zA-Z0-9]+$/;
    this.setState({username: this.props.username});
  }

  onInputChange = (e) => {
    this.setState({username: e.target.value, userExist:true}, () => {
      this.searchUsernameAvaibility();
    });
  }

  searchUsernameAvaibility = () => {
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const { username } = this.state;
      if(username.length<4){
        this.setState({errorMsg: 'Username not available', successMsg: null})
      }else{
        var validate = this.state.username.match(this.usernameRegex);
        if(validate){
          let formData = new FormData();
          formData.append("username", username);
          checkAvaiblity(formData, this.userToken)
            .then((response) => {
              if(response.data.usernameExist){
                this.setState({errorMsg: 'Username not available', successMsg: null})
              }else{
                this.setState({errorMsg: null, successMsg: 'Username available', userExist:false})
              }
            });
        }else{
          this.setState({errorMsg: 'Username must consist of only number and letters', successMsg: null})
        }
      }

    }, 300);
  }

  onCancel = () => {
    this.setState(
      { editMode: false, userExist: true, errorMsg: null, successMsg: null, username: this.props.username }
    );
  }

  handleSubmit = () => {
    const { username } = this.state;
    let formData = new FormData();
    formData.append("username", username);
    changeUsername(formData, this.userToken)
      .then(() => {
        const redirectTo = config.BASE_URL+'/me/settings';
        window.location.href = redirectTo;
      });
  }

  _renderErrorMsg(){
    if(this.state.errorMsg){
      return <p className="text--danger"><small>{this.state.errorMsg}</small></p>
    }else if(this.state.successMsg){
      return <p className="text--primary"><small>{this.state.successMsg}</small></p>
    }
  }

  _renderBtn(){
    if(this.state.editMode){
      return (
        <div>
          {
            this.state.userExist ?
            (<button className="mjl-btn btn--p-hollow m-right" disabled>Save</button>)
            :
            <ConfirmBox
              className=""
              actionId='ok'
              handleConfirm={this.handleSubmit}
              text="Save"
              msg="When you change your username, existing links to your profile will no longer work. You must update this link on any external sites."/>
            // (<button className="mjl-btn btn--p-hollow m-right" onClick={this.handleSubmit}>Save</button>)
          }
          <button className="mjl-btn def" onClick={this.onCancel}>Cancel</button>
        </div>
      )
    }else{
      return <button className="mjl-btn def" onClick={()=>{this.setState({editMode: true})}}>Edit Username</button>
    }
  }

  render(){
    return (
      <section className="container--sm p-u-settings">
        <h1>Settings</h1>
        <div className="s-block">
          <h2 className='b-header'>Account</h2>
          <ul>
            <li className="d--flex flex-sb flex-fw">
              <div className="f-f">
                <h3>Your username</h3>
                <div>
                  <span>{config.BASE_URL}/@</span>
                  {
                    this.state.editMode ?
                    (<input maxLength="30" value={this.state.username} onChange={this.onInputChange}/>)
                    :
                    (<input maxLength="30" disabled value={this.state.username}/>)
                  }
                </div>
                {this._renderErrorMsg()}
              </div>

              <div className="u-btns">
                {this._renderBtn()}
              </div>
            </li>
          </ul>
        </div>
      </section>
    );
  }

}

function mapStateToProps(state){
  return { username: state.auth.authenticated.user.username}
}

export default connect(mapStateToProps, null) (requireAuth(Settings));
