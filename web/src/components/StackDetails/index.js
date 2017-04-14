// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RIEInput, RIETags } from 'riek';
import { css, StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  tags: {
    minWidth: '100%',
    minHeight: '20px',
    display: 'block',
  },
});

type Props = {
  currentStack: Object
}

class StackDetails extends Component {
  props: Props

  render() {
    let { currentStack } = this.props;
    let tags = new Set();
    return (
      <ul>
        <li>Name:
          <RIEInput
            value={currentStack.post_title}
            change={(text) => console.log(text)}
            propName="post_title"
            />
        </li>
        <li>Details:
          <RIEInput
            value={currentStack.notes}
            change={(text) => console.log(text)}
            propName="notes"
          />
        </li>
        <li><span>Tags:</span>
          <RIETags
            className={`tags ${css(styles.tags)}`}
            value={tags}
            change={(text) => console.log(text)}
            propName="tags"
            placeholder="New"
            />
        </li>
      </ul>
    );
  }
}

export default connect(
  state => ({
    currentStack: state.stack.currentStack,
  }),
)(StackDetails);
