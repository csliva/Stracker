// @flow
import React, { Component} from 'react';

class Search extends Component {
  render() {
    return(
        <p className="control has-icons-left">
        <input
          className="search input"
          onChange={event => console.log(event.target.value)}
          placeholder='Search..'
          />
          <span className="icon is-small is-left">
          <i className="fa fa-search"></i>
          </span>
        </p>
    );
  }
}

export default Search;
