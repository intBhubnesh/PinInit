import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface authState {
    status : boolean;
    userData : object | null;
}

const initialState : authState = {
    status : false,
    userData : null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state, action : PayloadAction<{ userData: object }> ) => {
            state.status = true
            state.userData = action.payload
        },
        logout : (state) => {
            state.status = false
            state.userData = null
        }
    }
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer
