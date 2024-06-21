import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../features/courses/coursesSlice";
import Search from "../components/CourseList/Search";
import CourseList from "../components/CourseList/CourseList";

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

  let content;

  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (status === "succeeded") {
    content = <CourseList courses={courses} searchQuery={searchQuery} />;
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
