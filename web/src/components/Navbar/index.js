// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../../actions/session';

type Props = {
  logout: () => void,
  currentUser: Object,
  isAuthenticated: boolean,
}

class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogout = () => this.props.logout(this.context.router);
  renderBoardsLink(){
    const { isAuthenticated } = this.props;
    if (isAuthenticated){
      return (
        <li className="nav__item">
          <Link className="nav__link"  to="/boards">
            Go to Boards
          </Link>
        </li>
      );
    }
  }
  renderLogoutLink(){
    const { currentUser, isAuthenticated } = this.props;
    if (isAuthenticated){
      return (
        <li className="nav__item">
          <button className="nav__button" type="button" onClick={this.handleLogout}>
            Logout (<span>{currentUser.username}</span>)
          </button>
        </li>
      );
    }
  }
  render() {
    return (
      <header className="app__header">
        <nav className="nav">
          <div className="nav__inner">
            <ul className="nav__list nav__list--left">
              <li className="nav__item">
                <Link className="nav__link nav__link--branding" to="/">
                  &int;tracker
                </Link>
              </li>
              { this.renderBoardsLink() }
            </ul>
            <ul className="nav__list nav__list--right">
              { this.renderLogoutLink() }
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
  }),
  { logout }
)(Navbar);
