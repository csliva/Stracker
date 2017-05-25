
// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { WithContext as ReactTags } from 'react-tag-input';
import Input from '../Input';
import Timer from '../Timer';


class EditForm extends Component {

  handleSubmit = data => {
    this.props.onSubmit(data);
  }

  componentWillMount(){
    this.props.change('post_title', this.props.currentStack.post_title);
    this.props.change('notes', this.props.currentStack.notes);
    this.props.setTimer();
  }

  render() {

    return (
      <form
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
      >
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Edit Stack</h3>
        <Field name="post_title" type="text" component={Input} placeholder="Stack Title" />
        <Field name="notes" type="text" component={Input} placeholder="Stack Description" />
        <ReactTags />
        <button
          type="submit"
          className="btn btn-block btn-primary"
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
