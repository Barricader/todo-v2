import React, { PropTypes } from 'react';

// Import Style
import styles from './TaskListItem.css';

function TaskListItem(props) {
  return (
    <div className={styles['single-task']}>
      {/* <input type="checkbox" className={styles['task-checkbox']} checked={props.task.checked} onChange={props.onCheck} /> */}
      <div className={styles.checkbox}>
        <input type="checkbox" checked={props.task.checked} onChange={props.onCheck} />
      </div>
      {/* <p className={styles['task-content']}>{props.task.content}</p> */}
      <p className={props.task.checked ? styles['task-content-checked'] : styles['task-content']} onClick={props.onCheck}>{props.task.content}</p>
      {/* <p className={styles['task-user']}>By {props.task.username}</p> */}
      <span className={styles['delete-task']} onClick={props.onDelete}>X</span>
    </div>
  );
}

TaskListItem.propTypes = {
  task: PropTypes.shape({
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default TaskListItem;
