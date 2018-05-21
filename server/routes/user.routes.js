import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get all Users
router.route('/users').get(UserController.getUsers);

// Get one user by cuid
router.route('/users/:cuid').get(UserController.getUser);

// Add a new User
router.route('/users').post(UserController.addUser);

// Update a user
router.route('/users/:cuid').post(UserController.updateUser);

// Delete a user by cuid
router.route('/users/:cuid').delete(UserController.deleteUser);

// Sign a user in
router.route('/signin').post(UserController.signIn);

export default router;
