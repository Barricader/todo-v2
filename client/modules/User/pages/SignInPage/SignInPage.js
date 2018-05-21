import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import SignInForm from '../../components/SignInForm/SignInForm';

// Import Actions
import { signInRequest, updateUserRequest } from '../../UserActions';

class SignInPage extends Component {
  handleSignIn = (email, password) => {
    // const test = this.props.dispatch(signInRequest({ email, password }));
    this.props.dispatch(signInRequest({ email, password })).then((value) => {
      console.log(value);
    });
    // console.log(test);
    // console.log(test.then());
    // TODO: check if signed in successfully
    // TODO: use task reducer in users to get token for whole app instead of using app reducer??????????
    // this.props.dispatch(navigateTo({ routeName: 'TaskListPage' }));
    // this.props.setToken(token);
  };

  handleUpdateUser = user => {
    const newUser = user;
    this.props.dispatch(updateUserRequest(newUser));
  };

  render() {
    return (
      <div>
        <SignInForm signIn={this.handleSignIn} />
      </div>
    );
  }
}

SignInPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

SignInPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect()(SignInPage);
