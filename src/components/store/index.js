import { configureStore } from "@reduxjs/toolkit";
import { ticketReducers } from "./ticketReducer";

export const store = configureStore({
    reducer:{
        ticketShopping: ticketReducers
    }
});
