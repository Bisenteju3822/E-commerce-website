import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Cart Slice
const favSlice = createSlice({
  name: "myfav",
  initialState: {
    Fav: [],
  },
  reducers: {
    addtoFav: (state, actions) => {
      const exists = state.Fav.some((item) => item.id === actions.payload.id);
      if (exists) {
        toast.info("Product already Favourite!");
      } else {
        state.Fav.push({ ...actions.payload, qnty: 1 }); // Default quantity
        toast.success("Product added to Favourite!");
      }
    },

    ntyIncrease: (state, actions) => {
      const item = state.Fav.find(
        (product) => product.id === actions.payload.id
      );
      if (item) {
        item.qnty++;
        toast.success("Quantity increased!");
      }
    },

    ntyDecrease: (state, actions) => {
      const item = state.Fav.find(
        (product) => product.id === actions.payload.id
      );
      if (item) {
        if (item.qnty > 1) {
          item.qnty--;
          toast.info("Quantity decreased.");
        } else {
          toast.warning("Quantity cannot be less than 1.");
        }
      }
    },

    roductRemove: (state, actions) => {
      state.Fav = state.Fav.filter((item) => item.id !== actions.payload.id);
      toast.error("Product removed from cart!");
    },

    FavEmpty: (state) => {
      state.Fav = [];
      toast.info("Cart has been emptied!");
    },
  },
});

// Export Actions and Reducers
export const { addtoFav, ntyIncrease, ntyDecrease, roductRemove, FavEmpty } =
  favSlice.actions;
export default favSlice.reducer;
