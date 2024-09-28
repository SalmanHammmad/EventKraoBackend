import express from 'express';
const router = express.Router();
import  {getUser, getUsers, createUser, updateUser, deleteUser} from '../controllers/userController.js';

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;

