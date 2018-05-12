// @flow
import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { setActiveBoard, deleteBoard, toggleDropdown } from '../../actions/boards';


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

  toggle_dropdown(){
    this.props.toggleDropdown(this.props.dropdownActive)
  }

  render() {
    var that = this;
    var dropdownClass = this.props.dropdownActive ? "dropdown--active" : "dropdown--inactive"
    return (
      <div className="boardlist">
        {this.props.boards.map(function(object, i){
          return (
            <div className="boardlist__item" key={i}>
            <div className="dropdown">
                <button className="dropdown__toggle" onClick={that.toggle_dropdown.bind(that)}>
                  <i className="fa fa-cog"></i>
                </button>
                <div className={dropdownClass}>
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
    loadingBoards: state.boards.loadingBoards,
    dropdownActive: state.boards.dropdownActive,
  }),
  { setActiveBoard, deleteBoard, toggleDropdown }
)(BoardList);
