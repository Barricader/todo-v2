import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

// Import Components
import TaskList from '../../components/TaskList';
import TaskCreateWidget from '../../components/TaskCreateWidget/TaskCreateWidget';

// Import Actions
import { addTaskRequest, fetchTasks, deleteTaskRequest, updateTaskRequest } from '../../TaskActions';

// Import Selectors
import { getTasksByUsername } from '../../TaskReducer';
import { getToken } from '../../../User/UserReducer';

class TaskListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTasks());
  }

  handleDeleteTask = task => {
    if (confirm('Do you want to delete this task')) { // eslint-disable-line
      this.props.dispatch(deleteTaskRequest(task));
    }
  };

  handleCheckTask = task => {
    const newTask = task;
    newTask.checked = !newTask.checked;
    this.props.dispatch(updateTaskRequest(newTask));
  };

  handleAddTask = (content) => {
    jwt.verify(this.props.token, 'T@5kM4nag3R', (err, decoded) => {
      if (err) {
        // todo: handle error
      } else {
        this.props.dispatch(addTaskRequest({ username: decoded.email, content }));
      }
    });
  };

  render() {
    return (
      <div>
        <TaskCreateWidget addTask={this.handleAddTask} />
        <TaskList handleDeleteTask={this.handleDeleteTask} handleCheckTask={this.handleCheckTask} tasks={this.props.tasks} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
TaskListPage.need = [() => { return fetchTasks(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  let tasks = [];

  const token = getToken(state);

  if (token) {
    const decoded = jwt.verify(token.token, 'T@5kM4nag3R');
    tasks = getTasksByUsername(state, decoded.email);
  } else {
    console.log('token on client = RIP'); // eslint-disable-line
  }

  return {
    tasks,
    token: token.token,
  };
}

TaskListPage.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  token: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

TaskListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(TaskListPage);
