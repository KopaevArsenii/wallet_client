import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface IUserState {
    token: string,
    isAuth: boolean
}

const initialState: IUserState = {
    token: '',
    isAuth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<any>) => { //Кривая типизация
            state.token = action.payload
            state.isAuth = true
        },
        logout: (state) => {
            state.isAuth = false
            state.token = ''
        }
    }
})

export const { login, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer