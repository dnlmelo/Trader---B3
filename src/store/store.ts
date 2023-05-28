import { configureStore } from '@reduxjs/toolkit'
import orderbookReducer  from '../Pages/Dash/components/OrderBook/OrderBook.reducer';
import tickerReducer from '../Pages/Dash/components/Ticker/Ticker.reduce';

export const store = configureStore({
    reducer: {
      orderbook: orderbookReducer,
      ticker: tickerReducer
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;