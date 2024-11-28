import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        captain:null
    },
    reducers: {

        setUser: (state, action) => {
            state.user = action.payload
        },
        setCaptain:(state,action)=>{
            state.captain = action.payload
        }
    },
})


export const { setUser,setCaptain } = userSlice.actions

export default userSlice.reducer