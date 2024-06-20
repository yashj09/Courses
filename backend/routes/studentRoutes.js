import { Router } from 'express';
import Student from '../models/Student.js';
const router = Router();

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('enrolledCourses');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('enrolledCourses');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 // create a new student
router.post('/', async (req, res) => {
    const student = new Student({
      name: req.body.name,
      email: req.body.email,
      enrolledCourses: req.body.enrolledCourses
    });
  
    try {
      const newStudent = await student.save();
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


// Get enrolled courses for a student
router.get('/:studentId/courses', async (req, res) => {
  const studentId = req.params.studentId;

  try {
    // Find the student
    const student = await Student.findById(studentId).populate('enrolledCourses');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Return the enrolled courses from the populated field
    res.json(student.enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
