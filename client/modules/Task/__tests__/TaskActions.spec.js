import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  ADD_POST,
  DELETE_POST,
  ADD_POSTS,
  addTask,
  deleteTask,
  addTasks,
} from '../TaskActions';

const task = { checked: false, content: "All cats meow 'mern!'", slug: 'hello-mern', _id: 1 };

test('should return the correct type for addTask', actionTest(
  addTask,
  task,
  { type: ADD_POST, task },
));

test('should return the correct type for deleteTask', actionTest(
  deleteTask,
  task.cuid,
  { type: DELETE_POST, cuid: task.cuid },
));

test('should return the correct type for addTasks', actionTest(
  addTasks,
  [task],
  { type: ADD_POSTS, tasks: [task] },
));
