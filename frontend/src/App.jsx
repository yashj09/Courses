import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import CourseListingPage from "./pages/CourseListingPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CourseListingPage />} />
          <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
          <Route path="/dashboard" element={<StudentDashboardPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
