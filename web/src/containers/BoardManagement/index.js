// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createBoard, fetchUserBoards } from '../../actions/boards';
import NewBoardForm from '../../components/Forms/NewBoard';
import BoardList from '../../components/BoardList';
import { notify } from '../../actions/message'
import { css, StyleSheet } from 'aphrodite';

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
      <div class="app__sections">
        <section className="section">
          <div className="container">
            <h3 className="#">New Board</h3>
            <div className="card-content">
              <NewBoardForm onSubmit={this.handleNewBoard} />
            </div>
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
  }),
  { createBoard, fetchUserBoards, notify })(BoardManagement);
