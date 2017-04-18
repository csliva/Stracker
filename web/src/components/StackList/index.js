// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import Stack from '../../components/Stack';

const styles = StyleSheet.create({
  stacklist: {
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
  stacks: Object,
  loadingStacks: Boolean,
}

class StackList extends Component {
  props: Props

  render() {
    if (this.props.loadingStacks) {
      return (
        <div className={`col-md-3 ${css(styles.left_block)}`}>
          <p>Loading…</p>
        </div>
      );
    }
    else{
    return (
      <div className={`col-md-3 ${css(styles.left_block)}`}>
        <ul className={`stacklist ${css(styles.stacklist)}`}>
        {this.props.stacks.data.map(function(object, i){
          return <Stack name={object.post_title} key={i} id={object.id} />;
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
    stacks: state.stack.allStacks,
    loadingStacks: state.stack.loadingStacks,
  }),
)(StackList);
