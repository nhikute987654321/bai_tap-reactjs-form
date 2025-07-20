import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/danhSachGhe.json";

const initialState = {
    ticketData: data,
    selectedSeats: [],
    customerName: "",
    numberOfSeats: []
}

const ticketSlice = createSlice({
    name: "ticketSales",
    initialState,
    reducers: {
        toggleSeat: (state, action) => {
            const seat = action.payload;
            console.log(seat, 'seat choosed');
            state.selectedSeats = state.selectedSeats.includes(seat) ? state.selectedSeats.filter((s) => s !== seat) : [...state.selectedSeats, seat]
            state.ticketData = state.ticketData.map((item) => ({
                ...item, 
                danhSachGhe: item.danhSachGhe.map((seat) => ({
                    ...seat,
                    daDat: state.selectedSeats.includes(seat.soGhe)
                }))
            }));

            let check = state.ticketData.filter((s) => s.daDat === true);
            console.log("check", check);
        },
        setCustomerName: (state, action) => {
            state.customerName = action.payload;
        },
        setNumberOfSeats: (state, action) => {
            state.numberOfSeats = action.payload;
        },
        clearSelectedSeats: (state) => {
            state.selectedSeats = [];
        },
    }
});

export const { toggleSeat, setCustomerName, setNumberOfSeats } = ticketSlice.actions;

export const ticketReducers = ticketSlice.reducer;