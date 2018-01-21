// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formActivate, newStack, editStack, setActiveStack } from '../../actions/app';
import StackForm from '../../components/StackForm';
import EditForm from '../../components/EditForm';
import StackDetails from '../../components/StackDetails';

class StackView extends Component {

  handleNewStack= data => {
    data.lastest_contributor = this.props.currentUser.id;
    console.log(data);
    this.props.newStack(data);
  }

  handleEditStack= data => {
    this.props.editStack(data);
    this.props.setActiveStack(this.props.currentStack.id)
  }

  render() {
    if (this.props.formActive && !this.props.editActive){
      return (
        <div className={`card is-two-thirds column`}>
          < StackForm onSubmit={this.handleNewStack} />
        </div>
      );
    }
    if (this.props.formActive && this.props.editActive){
      return (
        <div className={`card is-two-thirds column`}>
          < EditForm onSubmit={this.handleEditStack} currentStack={this.props.currentStack}/>
        </div>
      );
    }
    else{
      return (
        <div className={`card is-two-thirds column`}>
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
    currentUser: state.session.currentUser,
    currentStack: state.stack.currentStack,
  }),
  { formActivate, newStack, editStack, setActiveStack }
)(StackView);
