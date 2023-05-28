import { createSlice } from '@reduxjs/toolkit'
export interface IOrderBook {
    bids: []
    asks: []
    timestamp: number
    microtimestamp: number
}

export const orderbookReducer = createSlice({
  name: 'orderbookSlice',
  initialState: {
    value: {} as IOrderBook
  },
  reducers: {
    clearBook: (state)=>{ state.value = {} as IOrderBook},
    updateOrderBook: (state, action:{type:string, payload:IOrderBook}) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateOrderBook, clearBook } = orderbookReducer.actions

export default orderbookReducer.reducer