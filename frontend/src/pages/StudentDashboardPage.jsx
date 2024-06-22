import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentCourses } from "../features/students/studentsSlice";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const StudentDashboardPage = () => {
  const dispatch = useDispatch();
  const studentId = useSelector((state) => state.students.studentId);
  const courses = useSelector((state) => state.students.courses);
  const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);
  const [localCourses, setLocalCourses] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudentCourses(studentId));
    }
  }, [status, dispatch, studentId]);

  useEffect(() => {
    setLocalCourses(courses);
  }, [courses]);

  const handleCourseComplete = (courseId) => {
    setLocalCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === courseId
          ? { ...course, completed: true, progress: 100 }
          : course
      )
    );
  };

  let content;

  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (status === "succeeded") {
    content = localCourses.map((course) => (
      <Card key={course._id}>
        <Link to={`/courses/${course._id}`}>
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={course.thumbnail}
              alt={course.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs">
              {course.completed ? "Completed" : `Due: ${course.duration}`}
            </div>
          </div>
        </Link>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
          <p className="text-muted-foreground mb-4">
            Instructor: {course.instructor}
          </p>
          <div className="flex items-center mb-4">
            <Progress value={course.progress} className="flex-1" />
            <Button
              variant={course.completed ? "secondary" : "primary"}
              size="sm"
              onClick={() => handleCourseComplete(course._id)}
            >
              {course.completed ? "Completed" : "Mark as Complete"}
            </Button>
          </div>
        </div>
      </Card>
    ));
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-4 flex justify-center">
        Student Dashboard
      </h1>
      <h3 className="text-3xl font-bold mb-8">My Courses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content}
      </div>
    </div>
  );
};

export default StudentDashboardPage;
