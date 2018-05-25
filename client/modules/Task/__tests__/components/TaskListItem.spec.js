import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import TaskListItem from '../../components/TaskListItem/TaskListItem';
import { mount, shallow } from 'enzyme';

const task = { username: 'test user', checked: false, cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'" };
const props = {
  task,
  onDelete: () => {},
};

test('renders properly', t => {
  const wrapper = shallow(
    <TaskListItem {...props} />
  );

  t.truthy(wrapper.hasClass('single-task'));
  t.is(wrapper.find('.author-name').first().text(), task.username);
  t.is(wrapper.find('.task-desc').first().text(), task.content);
});

test('has correct props', t => {
  const wrapper = mount(
    <TaskListItem {...props} />
  );

  t.deepEqual(wrapper.prop('task'), props.task);
  t.is(wrapper.prop('onClick'), props.onClick);
  t.is(wrapper.prop('onDelete'), props.onDelete);
});

test('calls onDelete', t => {
  const onDelete = sinon.spy();
  const wrapper = shallow(
    <TaskListItem task={task} onDelete={onDelete} />
  );

  wrapper.find('.task-action > a').first().simulate('click');
  t.truthy(onDelete.calledOnce);
});
