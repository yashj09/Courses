import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import CourseListingPage from './components/CourseListingPage';
import CourseDetailsPage from './components/CourseDetailsPage';
import StudentDashboardPage from './components/StudentDashboardPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<CourseListingPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
            <Route path="/dashboard" element={<StudentDashboardPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
