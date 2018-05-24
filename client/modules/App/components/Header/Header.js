import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

export function Header(props, context) {
  let url = '/signin';
  let text = 'Sign In';

  if (props.location.pathname === '/') {
    url = '/api/signout';
    text = 'Sign Out';
  } else if (props.location.pathname === '/signin') {
    url = '/signup';
    text = 'Sign Up';
  }

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles['site-title']}>Task Manager</h1>
        <a className={styles['nav-button']} href={url} >{text}</a>
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Header;
