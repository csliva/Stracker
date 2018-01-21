// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createBoard, fetchUserBoards } from '../../actions/boards';
import NewBoardForm from '../../components/NewBoardForm';
import BoardList from '../../components/BoardList';
import { notify } from '../../actions/message'
import { css, StyleSheet } from 'aphrodite';


const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto',
  },
});

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
      <div style={{ flex: '1' }}>
        <div className="container">
          <div className={`card ${css(styles.card)}`}>
            <h3 className="title" style={{ marginBottom: '2rem', textAlign: 'center' }}>New Board</h3>
            <div className="card-content">
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
