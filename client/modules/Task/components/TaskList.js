import React, { PropTypes } from 'react';

// Import Components
import TaskListItem from './TaskListItem/TaskListItem';

function TaskList(props) {
  return (
    <div className="listView">
      {
        props.tasks.map(task => (
          <TaskListItem
            task={task}
            key={task.cuid}
            onDelete={() => props.handleDeleteTask(task.cuid)}
            onCheck={() => props.handleCheckTask(task)}
          />
        ))
      }
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
  handleCheckTask: PropTypes.func.isRequired,
};

export default TaskList;
