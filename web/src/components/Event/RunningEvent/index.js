// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { getRunningEvent } from '../../../actions/events'
import EventItem  from '../EventItem'

class RunningEvent extends Component {

  preRender(){
    if (this.props.currentBoard === undefined){ return null; }
    else if (this.props.runningEvent === undefined){
      this.props.getRunningEvent(this.props.userId, this.props.currentBoard.id)
      return (null);
    }
    else {
      return (<EventItem eventlist={this.props.runningEvent} />);
    }
  }

  render() {
    return this.preRender();
  }
}

export default connect(
  state => ({
    runningEvent: state.event.runningEvent,
    userId: state.session.currentUser.id,
    currentBoard: state.boards.activeBoard
  }),
  { getRunningEvent }
)(RunningEvent);
