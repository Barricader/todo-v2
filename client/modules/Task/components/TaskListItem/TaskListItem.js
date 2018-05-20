import React, { PropTypes } from 'react';
// import { Link } from 'react-router';

// Import Style
import styles from './TaskListItem.css';

function TaskListItem(props) {
  return (
    <div className={styles['single-task']}>
      {/* <h3 className={styles['task-title']}>
        <Link to={`/tasks/${props.task.cuid}`} >
          Test Task Title
        </Link>
      </h3> */}
      <input type="checkbox" className={styles['task-checkbox']} checked={props.task.checked} onChange={props.onCheck} />
      <p className={styles['task-content']}>{props.task.content}</p>
      <p className={styles['task-user']}>By {props.task.username}</p>
      <p className={styles['task-action']}><a href="#" onClick={props.onDelete}>Delete Task</a></p>
      <hr className={styles.divider} />
    </div>
  );
}

TaskListItem.propTypes = {
  task: PropTypes.shape({
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    // cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default TaskListItem;
