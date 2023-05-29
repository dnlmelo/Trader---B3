import React from 'react';
import App from './App';
import { renderWithProviders} from './utils/test.utils'

describe('<Dash />', () => {
  test('render', () => {
    renderWithProviders(<App />)
  });
  
})