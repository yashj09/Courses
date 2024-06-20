import { Schema, model } from 'mongoose';

const syllabusSchema = new Schema({
  week: Number,
  topic: String,
  content: String
});

const courseSchema = new Schema({
  name: String,
  instructor: String,
  description: String,
  enrollmentStatus: { type: String, enum: ['Open', 'Closed', 'In Progress'] },
  thumbnail: String,
  duration: String,
  schedule: String,
  location: String,
  prerequisites: [String],
  syllabus: [syllabusSchema],
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

const Course = model('Course', courseSchema);
export default Course;
