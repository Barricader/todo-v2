import test from 'ava';
import { reducerTest } from 'redux-ava';
import appReducer, { getShowAddTask } from '../AppReducer';
import { toggleAddTask } from '../AppActions';

test('action for TOGGLE_ADD_POST is working', reducerTest(
  appReducer,
  { showAddTask: false },
  toggleAddTask(),
  { showAddTask: true },
));

test('getShowAddTask selector', t => {
  t.is(getShowAddTask({
    app: { showAddTask: false },
  }), false);
});
