// web/src/components/Timer/runningClocks -- VIEW -- SINGLE USE
import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { getRunningEvent } from '../../../actions/events';
import { setActiveTask, formDeactivate } from '../../../actions/app';
import { setActiveBoard } from '../../../actions/boards';
import TimeDiff from '../TimeDiff';

class RunningClocks extends Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  viewTask(timer){
    console.log(this.context.router)
    this.props.setActiveTask(timer.task_id)
    this.props.setActiveBoard(timer.board_id, null, this.context.router)
    this.props.formDeactivate()
  }

  render() {
    if (this.props.runningEvent === undefined){
      if (this.props.userId){
        this.props.getRunningEvent(this.props.userId)
      }
      return (null);
    }
    else {
      if(this.props.runningEvent){
        return (
          <div className="runningtimer">
            <ul className="runningtimer__list">
            {this.props.runningEvent.map((object, i) => {
              return (
                <li onClick={this.viewTask.bind(this, object)}
                  className="runningtimer__item"
                  key={i}
                  id={object.id}
                >
                  <i className="runningtimer__icon fa fa-clock-o"></i>
                  <TimeDiff timeObject={object} />
                  <span className="runningtimer__info">
                  <b>{object.board_name}</b><br/>
                  {object.task_title} </span>
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
  { getRunningEvent, setActiveTask, setActiveBoard, formDeactivate }
)(RunningClocks);
