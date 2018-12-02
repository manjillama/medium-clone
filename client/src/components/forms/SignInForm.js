import React from 'react';
import { Field, reduxForm } from 'redux-form'

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Please enter a valid email' : undefined

class SignInForm extends React.Component{

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

  onSubmit(values){
    console.log(values);
  }

  render(){
    const { handleSubmit } = this.props;
    return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
          <button type="submit" className="mjl-btn btn--dark">Log In</button>
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

export default reduxForm({
  validate,
  // a unique name for the form
  form: 'signInForm'
})(SignInForm);
