import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ProfileState = {
    user: null | {}
}
const initialState : ProfileState= {
    user: null,
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser:(state, value:PayloadAction<null | {}>) => {
            state.user = value.payload
        }
    }
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;