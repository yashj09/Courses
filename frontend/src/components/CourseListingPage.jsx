import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../features/courses/coursesSlice";
import { Link } from "react-router-dom";

const CourseListingPage = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const status = useSelector((state) => state.courses.status);
  const error = useSelector((state) => state.courses.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  let content;

  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (status === "succeeded") {
    content = Array.isArray(courses) ? (
      courses.map((course) => (
        <div key={course._id} className="mb-4">
          <Link to={`/courses/${course._id}`}>
            <h2 className="text-xl font-bold">{course.name}</h2>
            <p>{course.description}</p>
            <p>Instructor: {course.instructor}</p>
          </Link>
        </div>
      ))
    ) : (
      <p>No courses available</p>
    );
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Course Listing</h1>
      {content}
    </div>
  );
};

export default CourseListingPage;
