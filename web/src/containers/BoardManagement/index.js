// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createBoard, fetchUserBoards } from '../../actions/boards';
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

  //handleNewBoard = data => this.props.createBoard(data, this.context.router);


  render() {
    return (
      <div>
        <div className="container">
          <div className="#">
            <h3 className="#">New Board</h3>
            <p>Boards are where you can create tasks, invite team members, and track time together</p>
            <div className="#">
              <NewBoardForm onSubmit={this.handleNewBoard} />
            </div>
          </div>
        {this.props.boards.length > 0 &&
        <div>
          <BoardList/>
        </div>
        }
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    boards: state.boards.currentUserBoards,
  }),
  { createBoard, fetchUserBoards, notify })(BoardManagement);
