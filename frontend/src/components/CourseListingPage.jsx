import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../features/courses/coursesSlice";
import { Link } from "react-router-dom";
import Search from "./Search";
const CourseListingPage = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const status = useSelector((state) => state.courses.status);
  const error = useSelector((state) => state.courses.error);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  const filteredCourses = Array.isArray(courses)
    ? courses.filter(
        (course) =>
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  let content;

  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (status === "succeeded") {
    content =
      filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
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
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <h1 className="text-2xl font-bold mb-4">Course Listing</h1>
      {content}
    </div>
  );
};

export default CourseListingPage;
