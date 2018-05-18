import { Router } from 'express';
import * as TaskController from '../controllers/task.controller';
const router = new Router();

// Get all Tasks
router.route('/tasks').get(TaskController.getTasks);

// Get one task by cuid
router.route('/tasks/:cuid').get(TaskController.getTask);

// Add a new Task
router.route('/tasks').post(TaskController.addTask);

// Update a task
router.route('/tasks/:cuid').post(TaskController.updateTask);

// Delete a task by cuid
router.route('/tasks/:cuid').delete(TaskController.deleteTask);

export default router;
