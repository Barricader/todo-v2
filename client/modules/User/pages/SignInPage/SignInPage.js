import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Cookies from 'universal-cookie';

// Import Components
import SignInForm from '../../components/SignInForm/SignInForm';

// Import Actions
import { signInRequest, updateUserRequest } from '../../UserActions';

// Import Selectors
import { getToken } from '../../UserReducer';

class SignInPage extends Component {
  handleSignIn = (email, password) => {
    this.props.dispatch(signInRequest({ email, password })).then(() => {
      console.log(`sign in stuff: ${this.props.token.token}`);
      if (this.props.token.token) {
        const cookies = new Cookies();

        cookies.set('jwt', this.props.token.token, { path: '/' });
        browserHistory.push('/');
      } else {
        // Error, incorrect credentials

      }
    });
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

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    token: getToken(state),
  };
}

SignInPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.object,
  history: PropTypes.object.isRequired,
};

SignInPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(SignInPage);
