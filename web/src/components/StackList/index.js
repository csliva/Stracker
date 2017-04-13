// @flow
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import api from '../../api';
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
  currentUser: Object
}

class StackList extends Component {
  props: Props

  constructor(props) {
      super(props)
      this.state = {
          data: []
      };
  }

  componentDidMount(){
    var that = this;
    const { currentUser } = this.props;
    api.fetch(`/posts/user/${currentUser.id}`)
      .then(function(result) {
        that.setState({
          data: result.data
        });
    });
  }
  render() {
    return (
      <div className={`col-md-3 ${css(styles.left_block)}`}>
        <ul className={`stacklist ${css(styles.stacklist)}`}>
          {this.state.data.map(function(object, i){
            return <Stack name={object.post_title} key={i} id={object.id} />;
          })}
        </ul>
       </div>
    );
  }
}
export default connect(
  state => ({
    currentUser: state.session.currentUser,
  }),
)(StackList);
