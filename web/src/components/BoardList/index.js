// @flow
import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { setActiveBoard } from '../../actions/boards';


const styles = StyleSheet.create({
  letter: {
    color:'#dadada'
  },
});


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

  clickHandler(id){
    this.props.setActiveBoard(id, this.context.router);
  }

  render() {
    var that = this;
    return (
      <div>
        <ul>
        {this.props.boards.map(function(object, i){
          return (
              <div className="#" key={i} onClick={that.clickHandler.bind(that, object.id)}>
              <div className="#">
                <div className="#">
                <article className="#">
                  <div className="#">
                    <span className="#">{object.name.charAt(0)}</span>
                  </div>
                  <div className="#">
                    <div className="#">
                      <strong><p className="#">{object.name}</p></strong>
                      <small><p>{object.description}</p></small>
                    </div>
                  </div>
                  </article>
                </div>
              </div>
              </div>
          );
        })}
        </ul>
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
