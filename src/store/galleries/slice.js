import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    getAllGalleries: () => {},
  };


  export const galleriesSlice = createSlice({
    name: "galleries",
    initialState: {
      data: [],
    },
    reducers: {
      setGalleries: (state, action) => {
          state.data = action.payload;
      },
      ...middlewareActions,
    },
  });

export const {setGalleries, getAllGalleries} = galleriesSlice.actions;

export default galleriesSlice.reducer;