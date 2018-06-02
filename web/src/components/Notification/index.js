// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { clearNotification } from '../../actions/message';


class Notification extends Component {

  render() {
    if(this.props.isNotified){
      return(
        <div id="message" className="notification">
          <button className="notification__close" onClick={this.props.clearNotification} aria-label="delete">
            <i class="fa fa-times"></i>
          </button>
          <p className="notification__message">
            Notification
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
