import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { TaskCreateWidget } from '../../components/TaskCreateWidget/TaskCreateWidget';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const props = {
  addTask: () => {},
  showAddTask: true,
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <TaskCreateWidget {...props} />
  );

  t.truthy(wrapper.hasClass('form'));
  t.truthy(wrapper.hasClass('appear'));
  t.truthy(wrapper.find('h2').first().containsMatchingElement(<FormattedMessage id="createNewTask" />));
  t.is(wrapper.find('input').length, 2);
  t.is(wrapper.find('textarea').length, 1);
});

test('hide when showAddTask is false', t => {
  const wrapper = mountWithIntl(
    <TaskCreateWidget {...props} />
  );

  wrapper.setProps({ showAddTask: false });
  t.falsy(wrapper.hasClass('appear'));
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <TaskCreateWidget {...props} />
  );

  t.is(wrapper.prop('addTask'), props.addTask);
  t.is(wrapper.prop('showAddTask'), props.showAddTask);
});

test('calls addTask', t => {
  const addTask = sinon.spy();
  const wrapper = mountWithIntl(
    <TaskCreateWidget addTask={addTask} showAddTask />
  );

  wrapper.ref('checked').get(0).value = false;
  wrapper.ref('content').get(0).value = 'Bla Bla Bla';

  wrapper.find('a').first().simulate('click');
  t.truthy(addTask.calledOnce);
  t.truthy(addTask.calledWith(false, 'Bla Bla Bla'));
});

test('empty form doesn\'t call addTask', t => {
  const addTask = sinon.spy();
  const wrapper = mountWithIntl(
    <TaskCreateWidget addTask={addTask} showAddTask />
  );

  wrapper.find('a').first().simulate('click');
  t.falsy(addTask.called);
});
