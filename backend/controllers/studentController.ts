import { User } from '../models/User';

export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createStudent = async (req, res) => {
  try {
    const studentData = req.body;
    // Password defaulted to student ID as per instructions if not provided
    if (!studentData.password) {
      studentData.password = studentData.admission_number || studentData.registrar_id;
    }
    const student = await User.create({ ...studentData, role: 'student' });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
