import React, { Component, PropTypes } from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router';

// Import Style
import styles from './SignInForm.css';

export class SignInForm extends Component {
  signIn = (e) => {
    e.preventDefault();
    const emailRef = this.refs.email;
    const passwordRef = this.refs.password;
    if (emailRef.value && passwordRef.value) {
      this.props.signIn(emailRef.value, passwordRef.value);
      emailRef.value = passwordRef.value = '';
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.signIn}>
          <h2>Sign In</h2>
          <div className={styles['form-content']}>
            <input placeholder="Email" type="email" className={styles['form-field']} ref="email" required />
            <input type="password" placeholder="Password" className={styles['form-field']} ref="password" minLength="7" required />
            <input type="submit" value="Sign In" className={styles['task-submit-button']} />
          </div>
        </form>
      </div>
    );
  }
}

SignInForm.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default injectIntl(SignInForm);
