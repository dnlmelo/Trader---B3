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
    incrementByAmount: (state, action:{type:string, payload:IOrderBook}) => {
      state.value = action.payload
      console.log(state.value)
    },
  },
})

// Action creators are generated for each case reducer function
export const { incrementByAmount } = orderbookReducer.actions

export default orderbookReducer.reducer