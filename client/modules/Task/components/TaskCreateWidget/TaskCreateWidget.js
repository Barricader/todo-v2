import React, { Component, PropTypes } from 'react';
import { injectIntl } from 'react-intl';

// Import Style
import styles from './TaskCreateWidget.css';

export class TaskCreateWidget extends Component {
  addTask = () => {
    const usernameRef = this.refs.username;
    const contentRef = this.refs.content;
    if (usernameRef.value && contentRef.value) {
      this.props.addTask(usernameRef.value, contentRef.value);
      usernameRef.value = contentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddTask ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>Create new task</h2>
          <input placeholder="User Name" className={styles['form-field']} ref="username" />
          <textarea placeholder="Task Content" className={styles['form-field']} ref="content" />
          <a className={styles['task-submit-button']} href="#" onClick={this.addTask}>Submit</a>
        </div>
      </div>
    );
  }
}

TaskCreateWidget.propTypes = {
  addTask: PropTypes.func.isRequired,
  showAddTask: PropTypes.bool.isRequired,
};

export default injectIntl(TaskCreateWidget);
