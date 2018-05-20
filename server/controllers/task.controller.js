import Task from '../models/task';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all tasks
 * @param req
 * @param res
 * @returns void
 */
export function getTasks(req, res) {
  Task.find().sort('-dateAdded').exec((err, tasks) => {
    if (err) {
      console.log(err); // eslint-disable-line
      res.status(500).send(err);
    }
    res.json({ tasks });
  });
}

/**
 * Save a task
 * @param req
 * @param res
 * @returns void
 */
export function addTask(req, res) {
  if (!req.body.task.username || !req.body.task.content) {
    res.status(403).end();
  } else {
    const newTask = new Task(req.body.task);

    // Let's sanitize inputs
    newTask.username = sanitizeHtml(newTask.username);
    newTask.content = sanitizeHtml(newTask.content);
    newTask.checked = false;

    newTask.cuid = cuid();
    newTask.save((err, saved) => {
      if (err) {
        console.log(err); // eslint-disable-line
        res.status(500).send(err);
      } else {
        res.json({ task: saved });
      }
    });
  }
}

/**
 * Update a task
 * @param req
 * @param res
 * @returns void
 */
export function updateTask(req, res) {
  if (!req.body.task.cuid || !req.body.task.username || !req.body.task.content) {
    res.status(403).end();
  } else {
    const newTask = {
      username: req.body.task.username,
      checked: req.body.task.checked,
      content: req.body.task.content,
      cuid: req.body.task.cuid,
      dateAdded: req.body.task.dateAdded,
    };

    // Setup query
    const query = { cuid: newTask.cuid };

    // Let's sanitize inputs
    newTask.username = sanitizeHtml(newTask.username);
    newTask.content = sanitizeHtml(newTask.content);

    // Remove _id field so Mongo doesn't cry
    delete newTask._id;

    Task.findOneAndUpdate(query, newTask, { upsert: true }, (err, updated) => {
      if (err) {
        console.log(err); // eslint-disable-line
        res.status(500).send(err);
      } else {
        res.json({ task: updated });
      }
    });
  }
}

/**
 * Get a single task
 * @param req
 * @param res
 * @returns void
 */
export function getTask(req, res) {
  Task.findOne({ cuid: req.params.cuid }).exec((err, task) => {
    if (err) {
      console.log(err); // eslint-disable-line
      res.status(500).send(err);
    }
    res.json({ task });
  });
}

/**
 * Delete a task
 * @param req
 * @param res
 * @returns void
 */
export function deleteTask(req, res) {
  Task.findOne({ cuid: req.params.cuid }).exec((err, task) => {
    if (err) {
      console.log(err); // eslint-disable-line
      res.status(500).send(err);
    }

    task.remove(() => {
      res.status(200).end();
    });
  });
}
