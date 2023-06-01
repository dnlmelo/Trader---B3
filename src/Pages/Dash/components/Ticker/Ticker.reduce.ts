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
    clearTrades: (state, action)=>{
      state.value = []
    },
    updateTrades: (state, action:{type:string, payload:ITrades}) => {
      if(state.value.length === 20){
        state.value.pop();
      }
      state.value.unshift(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateTrades, clearTrades } = tickerReducer.actions

export default tickerReducer.reducer