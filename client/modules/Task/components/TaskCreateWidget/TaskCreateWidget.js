import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

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
    const cls = `${styles.form} ${(this.props.showAddTask ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewTask" /></h2>
          <input type="checkbox" className={styles['form-checkbox']} ref="checked" />
          <textarea placeholder={this.props.intl.messages.taskContent} className={styles['form-field']} ref="content" />
          <a className={styles['task-submit-button']} href="#" onClick={this.addTask}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

TaskCreateWidget.propTypes = {
  addTask: PropTypes.func.isRequired,
  showAddTask: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(TaskCreateWidget);
