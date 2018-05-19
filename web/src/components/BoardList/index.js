// @flow
import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { setActiveBoard, deleteBoard, toggleOptions } from '../../actions/boards';


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

  pass_confirm(func, msg){
    //Confirm that the user actually want to do what they're about to do
    let r = confirm(msg);
    if (r === true){
      console.log(func);
    }
  }

  boardDelete(user_id, board_id){
    //delete board from UserBoard model
    //this.props.deleteBoard(user_id, board_id)
    console.log(this)
    this.pass_confirm(
      console.log("farts"),
      "Are you sure you really want to delete this board? It will be deleted for all users."
    );
  }

  toggle_options(){
    this.props.toggleOptions(this.props.optionsActive)
  }

  render() {
    var that = this;
    var optionsClass = this.props.optionsActive ? "options--active" : ""
    return (
      <div className="boardlist">
        {this.props.boards.map(function(object, i){
          return (
            <div className="boardlist__item" key={i}>
            <div className={"options " + optionsClass }>
                <button className="options__toggle" onClick={that.toggle_options.bind(that)}>
                  <i className="fa fa-cog"></i>
                </button>
                <div className="options__menu">
                  <ul className="options__list">
                    <li className="options__item">
                      <button className="options__button">Edit Board</button>
                    </li>
                    <li className="options__item">
                      <button className="options__button">Manage Users</button>
                    </li>
                    <li className="options__item">
                      <button onClick={that.boardDelete.bind(that)} className="options__button">Delete Board</button>
                    </li>
                    <li className="options__item">
                      <button className="options__button">Export Data</button>
                    </li>
                  </ul>
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
    optionActive: state.boards.optionsActive,
  }),
  { setActiveBoard, deleteBoard, toggleOptions }
)(BoardList);
