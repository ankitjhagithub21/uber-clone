import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        captain:null,
        loading:true
    },
    reducers: {

        setUser: (state, action) => {
            state.user = action.payload
        },
        setCaptain:(state,action)=>{
            state.captain = action.payload
        },
        setLoading:(state,action)=>{
            state.loading = action.payload
        }
    },
})


export const { setUser,setCaptain,setLoading } = userSlice.actions

export default userSlice.reducer