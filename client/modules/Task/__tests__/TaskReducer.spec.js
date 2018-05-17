import test from 'ava';
import { reducerTest } from 'redux-ava';
import taskReducer, { getTask, getTasks } from '../TaskReducer';
import { addTask, deleteTask, addTasks } from '../TaskActions';

test('action for ADD_POST is working', reducerTest(
  taskReducer,
  { data: ['foo'] },
  addTask({
    checked: false,
    content: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-task',
  }),
  { data: [{
    checked: false,
    content: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-task',
  }, 'foo'] },
));

test('action for DELETE_POST is working', reducerTest(
  taskReducer,
  { data: [{
    checked: false,
    content: 'Hello world!',
    cuid: 'abc',
    _id: 1,
    slug: 'first-task',
  }] },
  deleteTask('abc'),
  { data: [] },
));

test('action for ADD_POSTS is working', reducerTest(
  taskReducer,
  { data: [] },
  addTasks([
    {
      checked: false,
      content: 'Hello world!',
      _id: null,
      cuid: null,
      slug: 'first-task',
    },
  ]),
  { data: [{
    checked: false,
    content: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-task',
  }] },
));

test('getTasks selector', t => {
  t.deepEqual(
    getTasks({
      tasks: { data: ['foo'] },
    }),
    ['foo']
  );
});

test('getTask selector', t => {
  t.deepEqual(
    getTask({
      tasks: { data: [{ cuid: '123' }] },
    }, '123'),
    { cuid: '123' }
  );
});

