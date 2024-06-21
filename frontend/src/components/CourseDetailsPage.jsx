import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "../api/axios";
import { enrollStudent } from "../features/courses/coursesSlice";
import { fetchStudentCourses } from "../features/students/studentsSlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiArrowSortedDown } from "react-icons/ti";

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const studentId = useSelector((state) => state.students.studentId); // Assuming you have the logged-in student's ID in state
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`api/courses/${courseId}`);
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
      dispatch(fetchStudentCourses(studentId));
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
    <>
      <Link to="/" className="text-blue-800 m-4">
        &larr;Go back to Courses
      </Link>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <img
              src={course.thumbnail}
              width={600}
              height={400}
              alt={course.name}
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">{course.name}</h1>
              <p className="text-muted-foreground text-lg">
                Taught by {course.instructor}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Badge variant={"danger"}>
                  Enrollment {course.enrollmentStatus}
                </Badge>
              </div>
            </div>
            <div className="prose max-w-none">
              <p>{course.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Course Duration</h3>
                <p>{course.duration}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Schedule</h3>
                <p>{course.schedule}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Location</h3>
                <p>{course.location}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Prerequisites</h3>
                <ul>
                  {course.prerequisites && course.prerequisites.length > 0 ? (
                    course.prerequisites.map((prerequisite, index) => (
                      <li key={index}>{prerequisite}</li>
                    ))
                  ) : (
                    <li>No prerequisites</li>
                  )}
                </ul>
              </div>
            </div>
            <Button onClick={handleEnroll} size="lg" className="w-full">
              Enroll Now
            </Button>
          </div>
        </div>
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Course Syllabus
          </h2>
          <div className="space-y-8">
            <div>
              <ul>
                {course.syllabus && course.syllabus.length > 0 ? (
                  course.syllabus.map((item, index) => (
                    <li key={index} className="mb-4">
                      <div
                        className="cursor-pointer"
                        onClick={() => toggleExpand(index)}
                      >
                        <h3 className="text-lg font-semibold">
                          <div className="flex items-center">
                            <TiArrowSortedDown />
                            Week {item.week}: {item.topic}
                          </div>
                        </h3>
                      </div>
                      {expanded === index && (
                        <p className="text-muted-foreground mt-2">
                          {item.content}
                        </p>
                      )}
                    </li>
                  ))
                ) : (
                  <li>No syllabus available</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailsPage;
