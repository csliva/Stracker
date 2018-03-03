// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createBoard, fetchUserBoards, toggleBoardForm } from '../../actions/boards';
import NewBoardForm from '../../components/Forms/NewBoard';
import BoardList from '../../components/BoardList';
import { notify } from '../../actions/message'

type Props = {
  createBoard: () => void,
  notify: () => void,
}

class BoardManagement extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleNewBoard = (data) => {
    this.props.notify("New Board Created", "is-success");
    this.props.createBoard(data, this.context.router);
  }

  toggleFormAction = (currentBool) => {
    this.props.toggleBoardForm(!currentBool);
  }

  //handleNewBoard = data => this.props.createBoard(data, this.context.router);

  renderNewBoardForm(){
    var dropdownClass = this.props.boardFormActive ? 'dropdown dropdown--active' : 'dropdown';
    return (
      <div className={dropdownClass}>
        <NewBoardForm onSubmit={this.handleNewBoard} />
      </div>
    );
  }
  render() {
    return (
      <div className="app__sections">
        <section className="section">
          <div className="container">
            <h3 className="#">New Board</h3>
            <p>Boards are where you can create tasks, invite team members, and track time together</p>
            <button className="button" onClick={this.toggleFormAction.bind(this, this.props.boardFormActive)}>Create new Board</button>
            {this.renderNewBoardForm()}
          </div>
        </section>
        {this.props.boards.length > 0 &&
        <section className="section section--alt">
          <div className="container">
            <BoardList/>
          </div>
        </section>
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    boards: state.boards.currentUserBoards,
    boardFormActive: state.boards.boardFormActive
  }),
  { createBoard, fetchUserBoards, notify, toggleBoardForm })(BoardManagement);
