// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session';
import LoginForm from '../../components/Forms/Login';

type Props = {
  login: () => void,
}

class Login extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogin = data => this.props.login(data, this.context.router);

  render() {
    return (
      <main className="app__sections">
        <section className="section">
          <div className="panel">
            <div className="content">
                <LoginForm onSubmit={this.handleLogin} />
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default connect(null, { login })(Login);
