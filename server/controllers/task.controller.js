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
  if (!req.body.task.content) {
    res.status(403).end();
  }

  const newTask = new Task(req.body.task);

  // Let's sanitize inputs
  newTask.content = sanitizeHtml(newTask.content);

  newTask.cuid = cuid();
  newTask.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ task: saved });
  });
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
      res.status(500).send(err);
    }

    task.remove(() => {
      res.status(200).end();
    });
  });
}
