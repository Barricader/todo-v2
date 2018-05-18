import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import TaskList from '../../components/TaskList';
import TaskCreateWidget from '../../components/TaskCreateWidget/TaskCreateWidget';

// Import Actions
import { addTaskRequest, fetchTasks, deleteTaskRequest, updateTaskRequest } from '../../TaskActions';
import { toggleAddTask } from '../../../App/AppActions';

// Import Selectors
import { getShowAddTask } from '../../../App/AppReducer';
import { getTasks } from '../../TaskReducer';

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

  handleAddTask = (username, content) => {
    this.props.dispatch(toggleAddTask());
    this.props.dispatch(addTaskRequest({ username, content }));
  };

  render() {
    return (
      <div>
        <TaskCreateWidget addTask={this.handleAddTask} showAddTask={this.props.showAddTask} />
        <TaskList handleDeleteTask={this.handleDeleteTask} handleCheckTask={this.handleCheckTask} tasks={this.props.tasks} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
TaskListPage.need = [() => { return fetchTasks(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddTask: getShowAddTask(state),
    tasks: getTasks(state),
  };
}

TaskListPage.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  showAddTask: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

TaskListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(TaskListPage);
