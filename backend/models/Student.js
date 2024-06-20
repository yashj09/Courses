import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
  name: String,
  email: String,
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

const Student = model('Student', studentSchema);
export default Student;
