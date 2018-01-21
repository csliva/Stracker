
// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';

class EditForm extends Component {

  handleSubmit = data => {
    this.props.onSubmit(data);
  }

  componentWillMount(){
    this.props.change('post_title', this.props.currentStack.post_title);
    this.props.change('notes', this.props.currentStack.notes);
  }

  render() {

    return (
      <form
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
      >
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Edit Stack</h3>
        <Field name="post_title" className="input" type="text" component={Input} placeholder="Stack Title" />
        <Field name="notes" className="input" type="text" component={Input} placeholder="Stack Description" />
        <button
          type="submit"
          className="button is-primary"
        >
          Edit
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'editStack',
})(EditForm);
