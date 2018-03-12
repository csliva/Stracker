// @flow
import React, { Component} from 'react';

class Search extends Component {
  render() {
    return(
        <div className="searchbar">
        <input
          className="searchbar__input"
          onChange={event => console.log(event.target.value)}
          placeholder='Search..'
          />
          <span className="searchbar__icon">
          <i className="fa fa-search"></i>
          </span>
        </div>
    );
  }
}

export default Search;
