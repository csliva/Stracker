// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import Task from '../Task/TaskItem';
import Search from './Search';
import { formActivate } from '../../actions/app';

const styles = StyleSheet.create({
  tasklist: {
    padding: '0px',
    listStyle: 'none',
  },
  left_block:{
    height: '95%',
    marginTop: '1%',
    overflowY: 'scroll',
    //boxShadow: '0 1px 0 rgba(0,0,0,.25)',
    //border: '1px solid #e8e8e8',
  }
});

type Props = {
  currentUser: Object,
  tasks: Object,
  loadingStacks: Boolean,
}

class Stack extends Component {
  props: Props

  clickHandler(){
    this.props.formActivate();
  }

  render() {
    if (this.props.loadingStack) {
      return (
        <div className={`column is-one-third ${css(styles.left_block)}`}>
          <p>No tasks stacked yet</p>
          <div>
            <div className={"button is-success " + (this.props.formActive ? 'show' : 'is-disabled')} onClick={this.clickHandler.bind(this, this.props.id)}>Create your first Task</div>
          </div>
        </div>
      );
    }
    else{
    return (
      <div className={`column is-one-third`}>
        <div>
          <div className="button is-success" disabled={(this.props.formActive ? 'disabled' : '')} onClick={this.clickHandler.bind(this, this.props.id)}><i className="fa fa-plus fa-2x" aria-hidden="true"></i></div>New Task
        </div>
        <Search />
        <ul className={`${css(styles.tasklist)}`}>
        {this.props.tasks.data.map(function(object, i){
          return <Task name={object.task_title} key={i} id={object.id} />;
        })}
        </ul>
       </div>
    );
  }
  }
}
export default connect(
  state => ({
    currentUser: state.session.currentUser,
    tasks: state.task.stack,
    loadingStack: state.task.loadingStack,
    formActive: state.task.formActive,
  }),
  { formActivate }
)(Stack);
