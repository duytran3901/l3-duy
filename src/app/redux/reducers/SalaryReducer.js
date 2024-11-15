import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salarys: [],
  salary: null,
  totalElements: 0,
  reload:  false
};

const SalarySlice = createSlice({
  name: "salary",
  initialState,
  reducers: {
    getSalarysByIdEmployee: (state, action) => {
      state.salarys = action.payload;
      state.totalElements = action.payload.length;
    },
    getSalarysByLeader: (state, action) => {
      state.salarys = action.payload;
      state.totalElements = action.payload.length;
    },
    getSalaryById: (state, action) => {
      state.salary = action.payload;
    },
    createSalary: (state, action) => {
      state.salarys = [...action.payload, ...state.salarys];
      state.totalElements = state.totalElements + 1;
    },
    editSalary: (state, action) => {
      const index = state.salarys.findIndex(salary => salary.id === action.payload.id);
      state.salarys.splice(index, 1, action.payload);
    },
    deleteSalary: (state, action) => {
      state.reload = !state.reload;
      state.totalElements = state.totalElements - 1;
    }
  },
});

export const {
  getSalarysByIdEmployee,
  getSalarysByLeader,
  getSalaryById,
  createSalary,
  editSalary,
  deleteSalary
} = SalarySlice.actions;

export default SalarySlice.reducer;
