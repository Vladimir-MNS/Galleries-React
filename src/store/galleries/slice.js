import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    getAllGalleries: () => {},
    searchAllGalleries: () => {}
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

export const {setGalleries, getAllGalleries, searchAllGalleries} = galleriesSlice.actions;

export default galleriesSlice.reducer;