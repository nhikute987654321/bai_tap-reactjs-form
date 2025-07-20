import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sinhvien: {
        id: null,
        maSv: '',
        hoten: '',
        sdt: '',
        email: '',
    },
    dsSinhvien: [],
    dsSinhvienFilter: []
}

const sinhvienSlice = createSlice({
    name: "sinhvienSlice",
    initialState,
    reducers: {
        themSinhvien: (state, action) => {
            const sv = action.payload;
            state.dsSinhvien.push({...sv, id: state.dsSinhvien.length + 1});
        },
        suaSinhvien: (state, action) => {
            const data = action.payload;
            const index = state.dsSinhvien.findIndex((sv) => sv.id == data.id)
            state.dsSinhvien[index] = data;
        },
        deleteSinhvien: (state, action) => {
            const data = action.payload;
            const index = state.dsSinhvien.findIndex((sv) => sv.id == data.id)
            console.log('deleteSinhvien',index)
            if(index !== -1)
                state.dsSinhvien.splice(index,1);
        },
        timKiemSv: (state, action) => {
            const textSearch = action.payload;
            state.dsSinhvienFilter = state.dsSinhvien.filter(sv =>
                sv.hoten.toLowerCase().includes(textSearch.toLowerCase()) ||
                sv.email.toLowerCase().includes(textSearch.toLowerCase()) ||
                sv.sdt.includes(textSearch)
            );
        },
    },
    extraReducers: (builder) => { }
})

export const { themSinhvien, timKiemSv, suaSinhvien, deleteSinhvien } = sinhvienSlice.actions;

export const studentReducer = sinhvienSlice.reducer;
