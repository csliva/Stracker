// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import Task from '../Task/TaskItem';
import Search from './Search';
import { formActivate } from '../../actions/app';

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
    let loading = this.props.loadingStack;
    return (
      <div className="stack">
        <div>
          <button className="button"
            disabled={(this.props.formActive ? 'button--disabled' : '')}
            onClick={this.clickHandler.bind(this, this.props.id)}>
            <i className="fa fa-plus fa-2x" aria-hidden="true"></i>
          </button>
          <span>New Task</span>
        </div>
        <Search />
        <ul>
        {this.props.tasks.data.map(function(object, i){
          if (loading) { return null }
          else { return <Task name={object.task_title} key={i} id={object.id} />; }
        })}
        </ul>
       </div>
    );
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
