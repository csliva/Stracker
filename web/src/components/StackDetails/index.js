// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStack , activateEdit } from '../../actions/app';
import TimeConverted from '../TimeConverted';

type Props = {
  currentStack: Object
}

class StackDetails extends Component {
  props: Props

  deleteHandler(id){
    this.props.deleteStack(id);
  }

  editHandler(id){
    this.props.activateEdit(id);
  }

  render() {
    let { currentStack } = this.props;
    return (
      <div>
      <div style={{ width: '100%', height: '60px' }}>
        <div style={{ float: 'right', marginLeft: '.5rem' }} onClick={this.deleteHandler.bind(this, currentStack.id)} className="btn btn-danger">
          Delete
        </div>
        <div style={{ float: 'right', marginLeft: '.5rem' }} onClick={this.editHandler.bind(this, currentStack.id)} className="btn btn-warning">
          Edit
        </div>
      </div>
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>{currentStack.post_title}</h3>
        <div style={{ marginBottom: '.5rem', textAlign: 'center' }}><TimeConverted time={currentStack.time} /></div>
        <div style={{ textAlign: 'center' }}>{currentStack.notes}</div>
      </div>
    );
  }
}

export default connect(
  state => ({
    currentStack: state.stack.currentStack,
  }),
  {deleteStack, activateEdit}
)(StackDetails);
