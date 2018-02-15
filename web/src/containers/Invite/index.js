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

type Props = {
  invite: () => void,
}

class Invite extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  componentWillMount(){
    // if board is not set in localStorage
    if ( localStorage.board === undefined ||
        localStorage.board === null ) {
      window.location.href = '/boards';
    }
    else if ( this.props.activeBoard.length === 0 ){
      // if board is set in localStorage but board data is not stored in the client
      this.props.fetchCurrentBoard(localStorage.board)
    }
  }

  handleInvite = data => this.props.invite(data, this.context.router);

  render() {
    return (
      <div className="container">
        <h3 className="#">Invite Another User to {this.props.activeBoard.name}</h3>
        <InviteForm onSubmit={this.handleInvite} />
      </div>
    );
  }
}

export default connect(
  state => ({
    activeBoard: state.boards.activeBoard,
  }),
  { invite, fetchCurrentBoard })(Invite);
