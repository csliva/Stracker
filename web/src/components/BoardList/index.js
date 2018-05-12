// @flow
import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { setActiveBoard, deleteBoard } from '../../actions/boards';


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

  boardDelete(user_id, board_id){
    //delete board from UserBoard model
    this.props.deleteBoard(user_id, board_id)
  }

  render() {
    var that = this;
    return (
      <div className="boardlist">
        {this.props.boards.map(function(object, i){
          return (
            <div className="boardlist__item" key={i}>

              <div className="boardlist__options"
                // onClick={that.boardDelete.bind(that, that.props.currentUser.id, object.id)}
                >

                <div className="dropdown">
                  <button className="dropdown__toggle">
                    <i className="fa fa-cog"></i>
                  </button>
                  <div className="dropdown__menu">
                    <ul className="dropdown__list">
                      <li className="dropdown__item">
                        <button className="dropdown__button">Edit Board</button>
                      </li>
                      <li className="dropdown__item">
                        <button className="dropdown__button">Manage Users</button>
                      </li>
                      <li className="dropdown__item">
                        <button className="dropdown__button">Delete Board</button>
                      </li>
                      <li className="dropdown__item">
                        <button className="dropdown__button">Export Data</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <button className="boardlist__inner" onClick={that.clickHandler.bind(that, object.id, i)}>
                <span className="boardlist__letter">{object.name.charAt(0)}</span>
                <div className="boardlist__info">
                  <h3 className="boardlist__title">{object.name}</h3>
                  <p className="boardlist__description">{object.description}</p>
                </div>
              </button>
            </div>
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
  { setActiveBoard, deleteBoard }
)(BoardList);
