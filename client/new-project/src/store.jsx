import { configureStore } from "@reduxjs/toolkit";
import myReducer from "./CartSlice"; // Import the reducer from CartSlice
import myReducer2 from "./FavSlice";
const store = configureStore({
  reducer: {
    mycart: myReducer,
    myfav: myReducer2, // Add the favorite reducer here
  },
});

export default store;
