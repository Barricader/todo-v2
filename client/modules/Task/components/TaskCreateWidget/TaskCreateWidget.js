import React, { Component, PropTypes } from 'react';
import { injectIntl } from 'react-intl';

// Import Style
import styles from './TaskCreateWidget.css';

export class TaskCreateWidget extends Component {
  addTask = () => {
    const contentRef = this.refs.content;
    if (contentRef.value) {
      this.props.addTask(contentRef.value);
      contentRef.value = '';
    }
  };

  render() {
    return (
      <div>
        <div className={styles['form-content']}>
          <textarea placeholder="Task Content" className={styles['form-field']} ref="content" />
          <a className={styles['task-submit-button']} href="#" onClick={this.addTask}>+</a>
        </div>
      </div>
    );
  }
}

TaskCreateWidget.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default injectIntl(TaskCreateWidget);
