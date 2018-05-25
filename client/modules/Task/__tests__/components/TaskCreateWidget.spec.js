import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { TaskCreateWidget } from '../../components/TaskCreateWidget/TaskCreateWidget';

const props = {
  addTask: () => {},
  showAddTask: true,
};

test('renders properly', t => {
  const wrapper = shallow(
    <TaskCreateWidget {...props} />
  );

  t.truthy(wrapper.hasClass('form'));
  t.truthy(wrapper.hasClass('appear'));
  t.truthy(wrapper.find('h2').first().containsMatchingElement('Create new task'));
  t.is(wrapper.find('input').length, 2);
  t.is(wrapper.find('textarea').length, 1);
});

test('hide when showAddTask is false', t => {
  const wrapper = mount(
    <TaskCreateWidget {...props} />
  );

  wrapper.setProps({ showAddTask: false });
  t.falsy(wrapper.hasClass('appear'));
});

test('has correct props', t => {
  const wrapper = mount(
    <TaskCreateWidget {...props} />
  );

  t.is(wrapper.prop('addTask'), props.addTask);
  t.is(wrapper.prop('showAddTask'), props.showAddTask);
});

test('calls addTask', t => {
  const addTask = sinon.spy();
  const wrapper = mount(
    <TaskCreateWidget addTask={addTask} showAddTask />
  );

  wrapper.ref('username').get(0).value = 'test user';
  wrapper.ref('content').get(0).value = 'Bla Bla Bla';

  wrapper.find('a').first().simulate('click');
  t.truthy(addTask.calledOnce);
  t.truthy(addTask.calledWith('test user', 'Bla Bla Bla'));
});

test('empty form doesn\'t call addTask', t => {
  const addTask = sinon.spy();
  const wrapper = mount(
    <TaskCreateWidget addTask={addTask} showAddTask />
  );

  wrapper.find('a').first().simulate('click');
  t.falsy(addTask.called);
});
