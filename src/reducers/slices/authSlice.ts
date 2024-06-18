import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState= {
    token: string | null;
}

let tokenItem = localStorage.getItem("token");
const initialState: AuthState = {
    token: tokenItem ? JSON.parse(tokenItem) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken : (state, value: PayloadAction<string | null>) => {
            state.token = value.payload
        }
    }
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;

//export type Roottype=ReturnType<typeof store.getState>
//export type AppDispatch = typeof store.dispatch