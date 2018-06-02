import Task from './models/task';

export default function () {
  Task.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const content1 = 'Check this task';
    const content2 = 'Delete this task';

    const task1 = new Task({ cuid: 'cikqgkv4q01ck7453ualdn4hd', checked: false, username: 'joseph', content: content1 });
    const task2 = new Task({ cuid: 'cikqgkv4q01ck7453ualdn4hf', checked: true, username: 'joseph', content: content2 });

    Task.create([task1, task2], (error) => {
      if (!error) {
        Console.log('Dummy tasks created...'); // eslint-disable-line
      }
    });
  });
}
