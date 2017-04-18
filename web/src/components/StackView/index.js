// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { formActivate, newStack } from '../../actions/app';
import StackForm from '../../components/StackForm';
import StackDetails from '../../components/StackDetails';

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
    this.props.newStack(data);
  }

  render() {
    if (this.props.formActive){
      return (
        <div className={`card col-md-9 ${css(styles.card)}`}>
          < StackForm onSubmit={this.handleNewStack} />
        </div>
      );
    }
    else{
      return (
        <div className={`card col-md-9 ${css(styles.card)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Stack Details</h3>
          < StackDetails />
        </div>
      );
    }
  }
}

export default connect(
  state => ({
    formActive: state.stack.formActive,
    time: state.timer.time,
    currentUser: state.session.currentUser,
  }),
  { formActivate, newStack }
)(StackView);
