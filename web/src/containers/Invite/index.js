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

type Props = {
  invite: () => void,
}

class Invite extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleInvite = data => this.props.invite(data, this.context.router);

  render() {
    return (
      <div className="container">
        <InviteForm onSubmit={this.handleInvite} />
      </div>
    );
  }
}

export default connect(null, { invite })(Invite);
