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
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload
        }
    }
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;

//export type Roottype=ReturnType<typeof store.getState>
//export type AppDispatch = typeof store.dispatch