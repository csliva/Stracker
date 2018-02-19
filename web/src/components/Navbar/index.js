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
        <li className="nav__item nav__item--right">
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
  renderSettingsLink(){
    const { isAuthenticated } = this.props;
    if (isAuthenticated){
      return (
        <li className="nav__item nav__item--right">
          <Link className="nav__link"  to="/settings">
            Manage Settings
          </Link>
        </li>
      );
    }
  }
  renderAnalyticsLink(){
    const { isAuthenticated } = this.props;
    if (isAuthenticated){
      return (
        <li className="nav__item nav__item--right">
          <Link className="nav__link"  to="/analytics">
            Analytics
          </Link>
        </li>
      );
    }
  }
  render() {
    return (
      <header className="app__header">
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link className="nav__link nav__link--branding" to="/">&int;tracker</Link>
            </li>
            { this.renderBoardsLink() }
            { this.renderAnalyticsLink() }
            { this.renderSettingsLink() }
            { this.renderLogoutLink() }
          </ul>
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
