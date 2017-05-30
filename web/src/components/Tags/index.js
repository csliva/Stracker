// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTag , deleteTag } from '../../actions/tags';
import { WithContext as ReactTags } from 'react-tag-input';

class Tags extends Component {

  handleDelete(id){
    this.props.deleteTag(id);
  }

  handleAddition(data){
    this.props.addTag(data);
  }

  render() {
    return (
      <div>
      <ReactTags
        tags={this.props.tags}
        handleDelete={this.handleDelete.bind(this)}
        handleAddition={this.handleAddition.bind(this)}
      />
      </div>
    );
  }
}

export default connect(
  state => ({
    tags: state.tags.list,
  }),
  {addTag, deleteTag}
)(Tags);
