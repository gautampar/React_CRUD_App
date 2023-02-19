import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "books",
  initialState: [],
  reducers: {
    bookAdded: (state = initialState, action) => {
      state.push({
        bookTitle: action.payload.bookTitle,
        bookAuthor: action.payload.bookAuthor,
        bookPrice: action.payload.bookPrice,
        bookPage: action.payload.bookPage,
      });
    },
    bookEdit: (state = initialState, action) => {
      state[action.payload.editIndex].bookTitle = action.payload.editBookTitle;
      state[action.payload.editIndex].bookAuthor = action.payload.editBookAuthor;
      state[action.payload.editIndex].bookPrice = action.payload.editBookPrice;
      state[action.payload.editIndex].bookPage = action.payload.editBookPage;
    },
    bookDelete: (state, action) => {
      const id = action.payload;
      const newList = state.filter(element => element.bookId !== id);
      return newList;
    }
  },
});

export const { bookAdded, bookEdit, bookDelete } = slice.actions;
export default slice.reducer;
