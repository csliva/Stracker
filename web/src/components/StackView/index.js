// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  card: {
    padding: '3rem 4rem',
    height: '95%',
    marginTop: '1%'
  },
});

class StackView extends Component {
  render() {
    return (
      <div className={`card col-md-9 ${css(styles.card)}`}>
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>New Stacks</h3>
       </div>
    );
  }
}

export default StackView;