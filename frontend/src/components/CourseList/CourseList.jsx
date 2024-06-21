import React from "react";
import CourseCard from "./CourseCard";

const CourseList = ({ courses, searchQuery }) => {
  const filteredCourses = Array.isArray(courses)
    ? courses.filter(
        (course) =>
          (course.name &&
            course.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (course.instructor &&
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  if (filteredCourses.length === 0) {
    return <p>No courses available</p>;
  }

  return filteredCourses.map((course) => (
    <CourseCard key={course._id} course={course} />
  ));
};

export default CourseList;
