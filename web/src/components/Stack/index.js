// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { setActiveStack, formDeactivate} from '../../actions/app';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  stack: {
    padding: '1rem .5rem',
    backgroundColor: 'white',
    margin: '10px 0px'
  },
});

type Props = {
  setActiveStack: () => void,
  currentStack: Number,
  formActive: boolean,
}

class Stack extends Component {

  props: Props

  clickHandler(id){
    this.props.formDeactivate();
    this.props.setActiveStack(id);
  }
  render() {
    return (
      <li onClick={this.clickHandler.bind(this, this.props.id)} className={`card ${css(styles.stack)}`}>{this.props.name}</li>
    );
  }
}

export default connect(
  state => ({
    formActive: state.stack.formActive,
    currentStack: state.stack.currentStack,
  }),
  { setActiveStack, formDeactivate }
)(Stack);
