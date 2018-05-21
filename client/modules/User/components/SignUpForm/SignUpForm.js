import React, { Component, PropTypes } from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router';

// Import Style
import styles from './SignUpForm.css';

export class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { error: '' };
  }

  signUp = (e) => {
    e.preventDefault();
    const emailRef = this.refs.email;
    const passwordRef = this.refs.password;
    const confPasswordRef = this.refs.confPassword;
    if (emailRef.value && passwordRef.value && confPasswordRef.value) {
      if (passwordRef.value === confPasswordRef.value) {
        this.props.signUp(emailRef.value, passwordRef.value, confPasswordRef.value);
        emailRef.value = passwordRef.value = confPasswordRef.value = '';
        this.setState({ error: '' });
      } else {
        // Error, passwords don't match
        this.setState({ error: 'Passwords do not match.' });
      }
    } else {
      // Error, required fields are not filled
      this.setState({ error: 'All fields are required.' });
    }
  };

  render() {
    return (
      <div>
        <Link className={styles['nav-button']} to="/signin" >Sign In</Link>
        <form onSubmit={this.signUp}>
          <h2>Sign Up</h2>
          <div className={styles['form-content']}>
            <input placeholder="Email" type="email" className={styles['form-field']} ref="email" required />
            <input type="password" placeholder="Password" className={styles['form-field']} ref="password" minLength="7" required />
            <input type="password" placeholder="Confirm Password" className={styles['form-field']} ref="confPassword" minLength="7" required />
            {this.state.error && <p className={styles.error}>{this.state.error}</p>}
            <input type="submit" value="Sign Up" className={styles['task-submit-button']} />
          </div>
        </form>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  signUp: PropTypes.func.isRequired,
};

export default injectIntl(SignUpForm);
