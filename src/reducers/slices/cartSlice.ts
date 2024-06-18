import { createSlice,PayloadAction } from "@reduxjs/toolkit"

type CartState = {
    totalItems: number
}
let allitems = localStorage.getItem("totalItems")
const initialState: CartState = {
    totalItems: allitems ? JSON.parse(allitems) : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setTotalItems: (state, value: PayloadAction<number>) => {
            state.totalItems = value.payload
        }
    }
})

export const { setTotalItems } = cartSlice.actions
export default cartSlice.reducer;