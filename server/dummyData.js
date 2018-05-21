import Task from './models/task';
import User from './models/user';

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
        // Console.log('Dummy tasks created...');
      }
    });
  });

  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const user1 = new User({ cuid: 'cikqgkv4q01ck7453ualdn4ho', activated: false, username: 'joseph' });
    const user2 = new User({ cuid: 'cikqgkv4q01ck7453ualdn4hp', activated: true, username: 'logan' });

    User.create([user1, user2], (error) => {
      if (!error) {
        // Console.log('Dummy tasks created...');
      }
    });
  });
}
