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
}

class StackList extends Component {
  props: Props

  //const StackDisplay =
  //this.props.stacks.map(function(object, i){
  //  return <Stack name={object.post_title} key={i} id={object.id} />;
  //})

  componentWillMount(){
    const { currentUser, stacks } = this.props;
  }
  componentDidMount(){
    console.log("THIS IS ALL STACKS", this.props.stacks);
  }
  render() {
    return (
      <div className={`col-md-3 ${css(styles.left_block)}`}>
        <ul className={`stacklist ${css(styles.stacklist)}`}>
          <li>Stacks of information will go here</li>
        </ul>
       </div>
    );
  }
}
export default connect(
  state => ({
    currentUser: state.session.currentUser,
    stacks: state.stack.allStacks
  }),
)(StackList);
