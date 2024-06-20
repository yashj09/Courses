import { Router } from 'express';
import Course from '../models/Course.js';
import Student from '../models/Student.js';
const router = Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('students');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('students');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Create a new course
router.post('/', async (req, res) => {
    const course = new Course({
      name: req.body.name,
      instructor: req.body.instructor,
      description: req.body.description,
      enrollmentStatus: req.body.enrollmentStatus,
      thumbnail: req.body.thumbnail,
      likes: req.body.likes,
      duration: req.body.duration,
      schedule: req.body.schedule,
      location: req.body.location,
      prerequisites: req.body.prerequisites,
      syllabus: req.body.syllabus,
      students: req.body.students
    });
  
    try {
      const newCourse = await course.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Enroll a student in a course
router.post('/:courseId/enroll/:studentId', async (req, res) => {
    const courseId = req.params.courseId;
    const studentId = req.params.studentId;
  
    try {
      const course = await Course.findById(courseId);
      const student = await Student.findById(studentId);
  
      if (!course || !student) {
        return res.status(404).json({ message: 'Course or Student not found' });
      }
  
      // Add course to student's enrolledCourses
      student.enrolledCourses.push(courseId);
      await student.save();
  
      // Add student to course's students
      course.students.push(studentId);
      await course.save();
  
      res.json({ message: 'Student enrolled successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
export default router;
