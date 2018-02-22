// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { clearNotification } from '../../actions/message';


class Notification extends Component {

  render() {
    if(this.props.isNotified){
      return(
        <div id="message" className="notification">
          <p className="notification__message">Notification
            <button className="notification__close" onClick={this.props.clearNotification} aria-label="delete">
              X
            </button>
          </p>
          <div className="notification__body">
            <p>{this.props.message}</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(
  state => ({
    isNotified: state.notification.isNotified,
    message: state.notification.message,
    messageStyle: state.notification.style
  }),
  { clearNotification }
)(Notification);
