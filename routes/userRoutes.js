import express from 'express';
const router = express.Router();
import  {getUser, getUsers, updateUser, deleteUser, login, register, logout } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);

// Protected Routes
router.get('/', protect, getUsers);
router.get('/:id', protect, getUser);
router.patch('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);


export default router;

