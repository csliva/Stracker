// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { clearNotification } from '../../actions/message';

const styles = StyleSheet.create({
  message: {
    maxWidth:'500px',
    margin:'0 auto',
  },
});

class Notification extends Component {


  render() {
    if(this.props.isNotified){
    return(
      <article id="message" className={`message ${this.props.messageStyle} ${css(styles.message)}`}>
        <p className="message-header">Notification<button onClick={this.props.clearNotification} className="delete" aria-label="delete"></button></p>
        <div className="message-body">
          <p>{this.props.message}</p>
        </div>
      </article>
    );
  }else{ return null;}
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
