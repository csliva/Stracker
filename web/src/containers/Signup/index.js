// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/session';
import SignupForm from '../../components/Forms/Signup';

type Props = {
  signup: () => void,
}

class Signup extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleSignup = data => this.props.signup(data, this.context.router);

  render() {
    return (
      <main className="app__sections">
        <section className="section">
          <div className="panel">
            <div className="content">
              <SignupForm onSubmit={this.handleSignup} />
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default connect(null, { signup })(Signup);
