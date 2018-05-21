import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// Import Components
import SignUpForm from '../../components/SignUpForm/SignUpForm';

// Import Actions
import { addUserRequest, signInRequest, updateUserRequest } from '../../UserActions';

class SignUpPage extends Component {
  handleSignIn = (email, password) => {
    this.props.dispatch(signInRequest({ email, password }));
  };

  handleAddUser = (email, password) => {
    this.props.dispatch(addUserRequest({ email, password })).then(() => {
      browserHistory.push('/signin');
    });
  };

  handleUpdateUser = user => {
    const newUser = user;
    this.props.dispatch(updateUserRequest(newUser));
  };

  render() {
    return (
      <div>
        <SignUpForm signUp={this.handleAddUser} />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

SignUpPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect()(SignUpPage);
