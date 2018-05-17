import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Import Style
import styles from '../../components/TaskListItem/TaskListItem.css';

// Import Actions
import { fetchTask } from '../../TaskActions';

// Import Selectors
import { getTask } from '../../TaskReducer';

export function TaskDetailPage(props) {
  return (
    <div>
      <Helmet title="Test Task Title" />
      <div className={`${styles['single-task']} ${styles['task-detail']}`}>
        <input type="checkbox" className={styles['task-checkbox']} checked={props.task.checked} />
        <p className={styles['task-desc']}>{props.task.content}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in server side.
TaskDetailPage.need = [params => {
  return fetchTask(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    task: getTask(state, props.params.cuid),
  };
}

TaskDetailPage.propTypes = {
  task: PropTypes.shape({
    content: PropTypes.string.isRequired,
    checked: PropTypes.boolean.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(TaskDetailPage);
