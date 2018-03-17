// web/src/components/Timer/runningClocks -- VIEW -- SINGLE USE
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { getRunningEvent } from '../../../actions/events';
import TimeDiff from '../TimeDiff';

class RunningClocks extends Component {

  render() {
    if (this.props.currentBoard === undefined){ return null; }
    else if (this.props.runningEvent === undefined){
      this.props.getRunningEvent(this.props.userId, this.props.currentBoard.id)
      return (null);
    }
    else {
      if(this.props.runningEvent){
        return (
          <div className="runningtimer">
            <ul className="runningtimer__list">
            {this.props.runningEvent.map((object, i) => {
              return (
                <li className="runningtimer__item" key={i} id={object.id}>
                  <i className="runningtimer__icon fa fa-clock-o"></i>
                  <TimeDiff timeObject={object} />
                </li>
              );
            })}
            </ul>
          </div>
        );
      }
      else { return null }
      }
  }
}

export default connect(
  state => ({
    runningEvent: state.event.runningEvent,
    userId: state.session.currentUser.id,
    currentBoard: state.boards.activeBoard,
  }),
  { getRunningEvent }
)(RunningClocks);
