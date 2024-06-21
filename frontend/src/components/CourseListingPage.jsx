import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../features/courses/coursesSlice";
import { Link } from "react-router-dom";
import Search from "./Search";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
          (course.name &&
            course.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (course.instructor &&
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];
  let content;

  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (status === "succeeded") {
    content =
      filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <div
            key={course._id}
            className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
          >
            <Link to={`/courses/${course._id}`}>
              <img
                src={course.thumbnail}
                alt={course.name}
                width={400}
                height={225}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="p-4 bg-background">
                <h3 className="text-lg font-semibold tracking-tight line-clamp-2">
                  {course.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Avatar className="w-8 h-8 border">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>
                      {course.instructor.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {course.instructor}
                  </span>
                  <h2 className="ml-20">
                    Likes:
                    {course.likes || 0}
                  </h2>
                </div>
              </div>
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
      <main className="container px-4 md:px-6 py-8 flex-1">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {content}
        </div>
      </main>
    </div>
  );
};

export default CourseListingPage;
