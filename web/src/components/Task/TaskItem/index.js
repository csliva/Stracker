// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { setActiveTask, formDeactivate} from '../../../actions/app';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  task: {
    padding: '1rem .5rem',
    backgroundColor: 'white',
    margin: '10px 0px'
  },
});

type Props = {
  setActiveTask: () => void,
  currentTask: Number,
  formActive: Boolean,
}

class Task extends Component {

  props: Props

  clickHandler(id){
    this.props.formDeactivate();
    this.props.setActiveTask(id);
  }
  render() {
    return (
      <li onClick={this.clickHandler.bind(this, this.props.id)} className={`card ${css(styles.task)}`}>{this.props.name}</li>
    );
  }
}

export default connect(
  state => ({
    formActive: state.task.formActive,
    currentTask: state.task.currentTask,
  }),
  { setActiveTask, formDeactivate }
)(Task);
