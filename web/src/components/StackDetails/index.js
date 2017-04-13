// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

type Props = {
  currentStack: Object
}

class StackDetails extends Component {
  props: Props

  constructor(props) {
      super(props)
      this.state = {
          stack: []
      };
  }

  render() {
    let { currentStack } = this.props;
    return (
      <ul>
        <li>Name: {currentStack.post_title}</li>
        <li>Time: {currentStack.time}</li>
        <li>Details: {currentStack.notes}</li>
      </ul>
    );
  }
}

export default connect(
  state => ({
    currentStack: state.stack.currentStack,
  }),
)(StackDetails);
