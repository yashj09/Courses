import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const initialState = {
  studentId: '6672bbfd76ee975bc7192a2f', // Assuming this is the logged-in student's ID
  courses: [],
  status: 'idle',
  error: null,
};

export const fetchStudentCourses = createAsyncThunk(
  'students/fetchStudentCourses',
  async (studentId) => {
    try {
      const response = await axios.get(`/api/students/${studentId}/courses`);
      return response.data; // Assuming response.data is an array of courses
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
