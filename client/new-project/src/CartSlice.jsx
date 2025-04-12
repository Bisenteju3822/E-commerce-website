import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Cart Slice
const cartSlice = createSlice({
  name: "mycart",
  initialState: {
    cart: [],
  },
  reducers: {
    addtoCart: (state, actions) => {
      const exists = state.cart.some((item) => item.id === actions.payload.id);
      if (exists) {
        toast.info("Product already added!");
      } else {
        state.cart.push({ ...actions.payload, qnty: 1 }); // Default quantity
        toast.success("Product added to cart!");
      }
    },

    qntyIncrease: (state, actions) => {
      const item = state.cart.find(
        (product) => product.id === actions.payload.id
      );
      if (item) {
        item.qnty++;
        toast.success("Quantity increased!");
      }
    },

    qntyDecrease: (state, actions) => {
      const item = state.cart.find(
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

    productRemove: (state, actions) => {
      state.cart = state.cart.filter((item) => item.id !== actions.payload.id);
      toast.error("Product removed from cart!");
    },

    cartEmpty: (state) => {
      state.cart = [];
      toast.info("Cart has been emptied!");
    },
  },
});

// Export Actions and Reducers
export const {
  addtoCart,
  qntyIncrease,
  qntyDecrease,
  productRemove,
  cartEmpty,
} = cartSlice.actions;
export default cartSlice.reducer;
