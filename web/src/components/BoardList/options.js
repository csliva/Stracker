// @flow
import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCsv } from '../../actions/analytics';
import { deleteBoard } from '../../actions/boards.js';

//Props: boardId, userId

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  toggle(){
    this.setState({
      active: !this.state.active
    })
  }

  boardDelete(){
    //delete board from UserBoard model
    //this.props.deleteBoard(user_id, board_id)
    let msg = "Are you sure you really want to delete this board? It will be deleted for all users."
    let r = confirm(msg);
    if (r === true){
      this.props.deleteBoard(this.props.userId, this.props.boardId)
    }
  }

  exportData(activeBoard){
    this.props.getCsv(this.props.boardId)
  }

  render() {
    let c = this.state.active ? 'options options--active' : 'options';
    return(
      <div className={c}>
          <button className="options__toggle" onClick={() => { this.toggle() }}>
            <i className="fa fa-cog"></i>
          </button>
          <div className="options__menu">
            <ul className="options__list">
              <li className="options__item">
                <Link className="options__button" to="/edit/board">Edit Board</Link>
              </li>
              <li className="options__item">
                <Link className="options__button" to="/edit/users">Manage Users</Link>
              </li>
              <li className="options__item">
                <button className="options__button" onClick={() => { this.boardDelete() }}>Delete Board</button>
              </li>
              <li className="options__item">
                <button className="options__button" onClick={() => { this.exportData() }}>Export Data</button>
              </li>
            </ul>
          </div>
        </div>
    );
  }

}
export default connect(
  state => ({
  }),
  { deleteBoard, getCsv }
)(Options);
