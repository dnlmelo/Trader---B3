import { createSlice } from '@reduxjs/toolkit'
export interface ITrades {
    id:number
    amount:number
    amount_str:string
    price:number
    price_str:string
    type:number
    timestamp:string
    microtimestamp:number
    buy_order_id:string
    sell_order_id:string
}

export const tickerReducer = createSlice({
  name: 'tickerSlice',
  initialState: {
    value: [] as ITrades[]
  },
  reducers: {
    incrementByAmount: (state, action:{type:string, payload:ITrades}) => {
      state.value.push(action.payload)
      console.log(state.value)
    },
  },
})

// Action creators are generated for each case reducer function
export const { incrementByAmount } = tickerReducer.actions

export default tickerReducer.reducer