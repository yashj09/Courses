import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../features/courses/coursesSlice';
import studentsReducer from '../features/students/studentsSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    students: studentsReducer,
  },
});

export default store;
