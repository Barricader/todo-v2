import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './TaskListItem.css';

function TaskListItem(props) {
  return (
    <div className={styles['single-task']}>
      <h3 className={styles['task-title']}>
        <Link to={`/tasks/${props.task.cuid}`} >
          Test Task Title
        </Link>
      </h3>
      <input type="checkbox" className={styles['task-checkbox']} checked={props.task.checked} />
      <p className={styles['task-desc']}>{props.task.content}</p>
      <p className={styles['task-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteTask" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

TaskListItem.propTypes = {
  task: PropTypes.shape({
    content: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskListItem;
