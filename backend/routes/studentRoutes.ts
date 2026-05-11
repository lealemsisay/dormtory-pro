import express from 'express';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../controllers/studentController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', protect, authorize('admin', 'staff'), getStudents);
router.post('/', protect, authorize('admin', 'staff'), createStudent);
router.put('/:id', protect, authorize('admin', 'staff'), updateStudent);
router.delete('/:id', protect, authorize('admin', 'staff'), deleteStudent);

export default router;
