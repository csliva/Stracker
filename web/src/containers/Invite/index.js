/*---------------------------------

INVITE CONTAINER
users of boards will send invites to other users.
from the api, an email will be sent with a security key
mailgun is used as the mail service

---------------------------------*/

// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { invite } from '../../actions/session';
import InviteForm from '../../components/Forms/Invite';
import { fetchCurrentBoard } from '../../actions/boards';

class Invite extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  
  handleInvite = data => {
    //store form data as well as current user information
    data = {
      ...data,
      sender_id: this.props.currentUserId,
      board_id: this.props.activeBoard.id
    }
    this.props.invite(data, this.context.router);
  }

  renderPreload = () => {
    if ( localStorage.board === undefined || localStorage.board === null ) {
      window.location.href = '/boards';
    }
    else if (this.props.activeBoard === undefined || this.props.activeBoard.length === 0){
      this.props.fetchCurrentBoard(localStorage.board)
      return ( <p>Loading</p> );
    }
    else{
      return (
        <div className="container">
          <h3 className="#">Invite Another User to {this.props.activeBoard.name}</h3>
          <InviteForm onSubmit={this.handleInvite} />
        </div>
      );
    }
  }

  render() {
    return this.renderPreload();
  }
}

export default connect(
  state => ({
    activeBoard: state.boards.activeBoard,
    currentUserId: state.session.currentUser.id
  }),
  { invite, fetchCurrentBoard })(Invite);
