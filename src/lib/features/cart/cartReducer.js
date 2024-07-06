"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  totalSaving: 0,
  includeDeliveryFee: false,
  tax: 1, // 10% tax as an example
  totalFinal: 0,
};

const calculateTotalFinal = (totalAmount, totalSaving, tax) => {
  const amountAfterDiscount = totalAmount - totalSaving;
  return amountAfterDiscount + tax;
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          id: newItem._id,
          price: newItem.price,
          image: newItem.image,
          discount: newItem.discount || 0, // Add discount to the item
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
      }
      state.totalQuantity += 1;
      state.totalAmount = state.totalAmount + newItem.price;

      state.totalSaving = state.items.reduce(
        (total, item) => total + item.discount * item.quantity,
        0
      );

      state.totalFinal = calculateTotalFinal(
        state.totalAmount,
        state.totalSaving,
        state.tax
      );
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount = state.totalAmount - existingItem.totalPrice;
        state.totalSaving =
          state.totalSaving - existingItem.discount * existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
        state.totalFinal = calculateTotalFinal(
          state.totalAmount,
          state.totalSaving,
          state.tax
        );
      }
    },
    increaseItemQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        state.totalQuantity += 1;
        state.totalAmount = state.totalAmount + existingItem.price;
        state.totalSaving = state.totalSaving + existingItem.discount;
        state.totalFinal = calculateTotalFinal(
          state.totalAmount,
          state.totalSaving,
          state.tax
        );
      }
    },
    decreaseItemQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        state.totalQuantity -= 1;
        state.totalAmount = state.totalAmount - existingItem.price;
        state.totalSaving = state.totalSaving - existingItem.discount;
        state.totalFinal = calculateTotalFinal(
          state.totalAmount,
          state.totalSaving,
          state.tax
        );
      } else if (existingItem && existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity -= 1;
        state.totalAmount = state.totalAmount - existingItem.price;
        state.totalSaving = state.totalSaving - existingItem.discount;
        state.totalFinal = calculateTotalFinal(
          state.totalAmount,
          state.totalSaving,
          state.tax
        );
      }
    },
    toggleDeliveryFee(state) {
      state.includeDeliveryFee = !state.includeDeliveryFee;
      state.includeDeliveryFee
        ? (state.totalFinal += 7)
        : (state.totalFinal -= 7);
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.totalSaving = 0;
      state.totalFinal = 0;
    },
    setCart(state, action) {
      return action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  updateItemQuantity,
  updatetotalFinal,
  toggleDeliveryFee,
  clearCart,
  setCart,
} = cart.actions;

export default cart.reducer;
