// @flow
import React, { Component } from 'react';

class Settings extends Component {

  render() {
    return (
      <main className="app__sections">
      <section className="section">
        <div className="panel">
          <div className="content">
            <h2 className="content__headline">Settings</h2>
            <p>Board Settings</p>
              <ul>
                <li>Name/Description</li>
                <li>Users</li>
                <li>Payment</li>
              </ul>
            <p>User Settings</p>
              <ul>
                <li>Email/Password</li>
              </ul>
            <p><button className="button">Get Started</button></p>
          </div>
        </div>
      </section>
    </main>

    );
  }
}

export default Settings;
