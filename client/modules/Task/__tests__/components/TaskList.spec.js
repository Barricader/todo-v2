import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import TaskList from '../../components/TaskList';

const tasks = [
  { username: 'test user', checked: false, cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'" },
  { username: 'test user', checked: true, cuid: 'f34gb2bh24b24b3', content: "All dogs bark 'mern!'" },
];

test('renders the list', t => {
  const wrapper = shallow(
    <TaskList tasks={tasks} handleShowTask={() => {}} handleDeleteTask={() => {}} />
  );

  t.is(wrapper.find('TaskListItem').length, 2);
});
