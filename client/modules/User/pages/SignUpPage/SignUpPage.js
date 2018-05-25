import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';

// Import Components
import SignUpForm from '../../components/SignUpForm/SignUpForm';

// Import Actions
import { addUserRequest, updateUserRequest } from '../../UserActions';

class SignUpPage extends Component {
  handleAddUser = (email, password) => {
    this.props.dispatch(addUserRequest({ email, password })).then(() => {
      browserHistory.push('/signin');
      // this.props.history.push('/signin');
    });
  };

  handleUpdateUser = user => {
    const newUser = user;
    this.props.dispatch(updateUserRequest(newUser));
  };

  render() {
    return (
      <div>
        <Helmet title="Sign Up" />
        <SignUpForm signUp={this.handleAddUser} />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

SignUpPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect()(SignUpPage);
