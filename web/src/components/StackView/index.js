// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { formActivate, newStack, editStack, setActiveStack } from '../../actions/app';
import StackForm from '../../components/StackForm';
import EditForm from '../../components/EditForm';
import StackDetails from '../../components/StackDetails';
import { setTimer } from '../../actions/timer';

const styles = StyleSheet.create({
  card: {
    padding: '3rem 4rem',
    height: '95%',
    marginTop: '1%'
  },
});

class StackView extends Component {

  handleNewStack= data => {
    data.user_id = this.props.currentUser.id;
    data.time = this.props.time;
    //separate out the id, just send text as tags data
    data.tags = this.props.tags.map( ({ text }) => text );
    this.props.newStack(data);
  }

  handleEditStack= data => {
    data.tags = this.props.tags.map( ({ text }) => text );
    this.props.editStack(data);
    this.props.setActiveStack(this.props.currentStack.id)
  }

  render() {
    if (this.props.formActive && !this.props.editActive){
      return (
        <div className={`card col-md-9 ${css(styles.card)}`}>
          < StackForm onSubmit={this.handleNewStack} />
        </div>
      );
    }
    if (this.props.formActive && this.props.editActive){
      return (
        <div className={`card col-md-9 ${css(styles.card)}`}>
          < EditForm onSubmit={this.handleEditStack} currentStack={this.props.currentStack} setTimer={this.props.setTimer} />
        </div>
      );
    }
    else{
      return (
        <div className={`card col-md-9 ${css(styles.card)}`}>
          < StackDetails />
        </div>
      );
    }
  }
}

export default connect(
  state => ({
    formActive: state.stack.formActive,
    editActive: state.stack.editActive,
    time: state.timer.time,
    tags: state.tags.list,
    currentUser: state.session.currentUser,
    currentStack: state.stack.currentStack,
  }),
  { formActivate, newStack, setTimer, editStack, setActiveStack }
)(StackView);
