// @flow
import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { setActiveBoard } from '../../actions/boards';


type Props = {
  currentUser: Object,
  boards: Object,
  loadingBoards: Boolean
}

class BoardList extends Component {
  props: Props

  static contextTypes = {
    router: PropTypes.object,
  }

  clickHandler(id, index){
    //Board selected
    //Set active board
    //Reset and get tasks
    //route to app
    this.props.setActiveBoard(id, this.props.boards[index], this.context.router);
  }

  render() {
    var that = this;
    return (
      <div className="boardlist">
        {this.props.boards.map(function(object, i){
          return (
            <button className="boardlist__item" key={i} onClick={that.clickHandler.bind(that, object.id, i)}>
              <button><i className="fa fa-times"></i></button>
              <div className="boardlist__inner">
                <span className="boardlist__letter">{object.name.charAt(0)}</span>
                <div className="boardlist__info">
                  <h3 className="boardlist__title">{object.name}</h3>
                  <p className="boardlist__description">{object.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    );
  }
}
export default connect(
  state => ({
    currentUser: state.session.currentUser,
    boards: state.boards.currentUserBoards,
    loadingBoards: state.boards.loadingBoards
  }),
  { setActiveBoard }
)(BoardList);
