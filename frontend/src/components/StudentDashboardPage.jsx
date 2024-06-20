// StudentDashboardPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentCourses } from "../features/students/studentsSlice";
import { Link } from "react-router-dom";

const StudentDashboardPage = () => {
  const dispatch = useDispatch();
  const studentId = useSelector((state) => state.students.studentId);
  const courses = useSelector((state) => state.students.courses);
  const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudentCourses(studentId));
    }
  }, [status, dispatch, studentId]);

  let content;

  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (status === "succeeded") {
    content = courses.map((course) => (
      <div key={course._id} className="mb-4">
        <Link to={`/courses/${course._id}`}>
          <h2 className="text-xl font-bold">{course.name}</h2>
          <p>Instructor: {course.instructor}</p>
          <img
            src={course.thumbnail}
            alt={course.name}
            className="w-32 h-auto"
          />
          {/* Add due date if available */}
          {/* <p>Due Date: {course.dueDate}</p> */}
        </Link>
      </div>
    ));
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>
      {content}
    </div>
  );
};

export default StudentDashboardPage;
