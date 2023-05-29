import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore, Store } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import type { store, RootState } from '../store/store'
// As a basic setup, import your same slice reducers
import orderbookReducer  from '../Pages/Dash/components/OrderBook/OrderBook.reducer';
import tickerReducer from '../Pages/Dash/components/Ticker/Ticker.reduce';
import { IOrderBook } from 'Pages/Dash/components/OrderBook/OrderBook.reducer'
import { ITrades } from 'Pages/Dash/components/Ticker/Ticker.reduce'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: Store
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
        orderbook: {
            value: {} as IOrderBook,
        },
        ticker: { value: [] as ITrades[]}
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({ 
        reducer: {
        orderbook: orderbookReducer,
        ticker: tickerReducer
      }}),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}