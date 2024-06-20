import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const initialState = {
  studentId: '667491d6258e2a3301b6b461', 
  courses: [],
  status: 'idle',
  error: null,
};

export const fetchStudentCourses = createAsyncThunk( 
  'students/fetchStudentCourses',
  async (studentId) => {
    try {
      const response = await axios.get(`/api/students/${studentId}/courses`);
      return response.data; 
    } catch (error) {
      throw Error('Failed to fetch courses.');
    }
  }
);

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStudentCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudentCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload; // Assuming action.payload is the array of courses
      })
      .addCase(fetchStudentCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default studentsSlice.reducer;
