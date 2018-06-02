/*---------------------------------

EDIT BOARD PAGE

Edit title
Edit description

---------------------------------*/

// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class EditBoard extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  handleEdit= data => {

  }

  render() {
    return (
      <h3>Edit Board</h3>
    );
  }
}

export default connect(
  state => ({
  }),
  { })(EditBoard);
