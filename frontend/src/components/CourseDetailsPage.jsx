import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { enrollStudent } from "../features/courses/coursesSlice"; // Ensure this is the correct import path

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const studentId = useSelector((state) => state.students.studentId); // Assuming you have the logged-in student's ID in state

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`api/courses/${courseId}`); // Ensure the base URL is correct
        setCourse(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      await dispatch(enrollStudent({ courseId, studentId }));
      alert("Enrolled successfully!");
    } catch (err) {
      alert("Failed to enroll");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{course.name}</h1>
      <p>{course.description}</p>
      <p>Instructor: {course.instructor}</p>
      <p>Status: {course.enrollmentStatus}</p>
      <p>Duration: {course.duration}</p>
      <p>Schedule: {course.schedule}</p>
      <p>Location: {course.location}</p>
      <h2 className="text-xl font-bold mt-4">Prerequisites</h2>
      <ul>
        {course.prerequisites && course.prerequisites.length > 0 ? (
          course.prerequisites.map((prerequisite, index) => (
            <li key={index}>{prerequisite}</li>
          ))
        ) : (
          <li>No prerequisites</li>
        )}
      </ul>
      <h2 className="text-xl font-bold mt-4">Syllabus</h2>
      <ul>
        {course.syllabus && course.syllabus.length > 0 ? (
          course.syllabus.map((item, index) => (
            <li key={index}>
              <strong>Week {item.week}:</strong> {item.topic}
              <p>{item.content}</p>
            </li>
          ))
        ) : (
          <li>No syllabus available</li>
        )}
      </ul>
      <button
        onClick={handleEnroll}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Enroll
      </button>
    </div>
  );
};

export default CourseDetailsPage;
