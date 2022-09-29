import {configureStore} from '@reduxjs/toolkit';
import couterSlice from './slice/couterSlice';
export const store = configureStore({
    reducer: {
        counter: couterSlice, 
    }
})