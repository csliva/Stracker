/*---------------------------------

EDIT BOARD PAGE

Add new Users
Delete users
Permissions?

---------------------------------*/

// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class EditUsers extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }


  render() {
    return (
      <h3>Edit Users</h3>
    );
  }
}

export default connect(
  state => ({
  }),
  { })(EditUsers);
