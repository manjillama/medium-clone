import React from 'react';
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Please enter a valid email' : undefined

class SignInForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {error:false};
  }

  renderField(field){
    const {meta} = field;
    const lblClass = meta.touched && meta.error ? 'text--danger':'';
    const inputErr = `input-group ${meta.touched && meta.error ? 'got-danger':''}`;
    return (
      <div className={inputErr}>
        <label className={lblClass}>{meta.touched && meta.error ? meta.error: field.label}</label>
        <field.field
          className="mjl-input input--underlined"
          type={field.type}
          autoComplete="off"
          {...field.input}
        />
        <div className="text-help"></div>
      </div>
    );
  }
  onSubmit = formProps => {
    this.props.signIn(formProps, (error) => {
      if(error){
        this.setState({error: true});
      }else{
        this.props.closeModal();
        this.props.history.push('/');
      }
    });
  }
  __renderSigninError(){
    if(this.state.error){
      return <div><span className="text--danger" style={{fontWeight:'bold'}}>Incorrect username or password</span><br/><br/></div>;
    }
  }
  render(){
    const { handleSubmit, submitting, invalid } = this.props;
    return (
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
          type="input"
          validate={email}
          field="input"
          label="Your email"
          name="email"
          component={this.renderField}/>

          <Field
          type="password"
          field="input"
          label="Your password"
          name="password"
          component={this.renderField}/>

          <br/>
          {this.__renderSigninError()}
          <button type="submit" disabled={invalid || submitting} className="mjl-btn btn--dark">Log In</button>
        </form>
    )
  }
};

/*
 Redux Custom validation. Gets called upon each form actions
 */
function validate(values){
  const errors = {};
  // Validate the inputs from 'values'
  if (!values.email){
    errors.email = "Please enter a valid email";
  }
  if (!values.password){
    errors.password = "Please enter your password";
  }
  return errors;
}

export default compose(
  // First args in state, second tim actions object
  connect(null, actions),
  reduxForm({
    validate,
    form: 'signInForm'
  }),
  withRouter
)(SignInForm);
