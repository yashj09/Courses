import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const initialState = {
  courses: [],
  status: 'idle',
  error: null,
};

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await axios.get('/api/courses');
  return response.data;
});

export const enrollStudent = createAsyncThunk('courses/enrollStudent', async ({ courseId, studentId }) => {
  const response = await axios.post(`/api/courses/${courseId}/enroll/${studentId}`);
  return response.data;
});

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(enrollStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses.push(action.payload); 
      });
  },
});

export default coursesSlice.reducer;
