/* eslint-disable testing-library/no-node-access */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Trades from './Ticker';
import { renderWithProviders } from '../../../../utils/test.utils';

describe('<Trades />', () => {
  const currency = 'btc-usd'
  test('it should mount', () => {
    renderWithProviders(<Trades currency='btc-usd' />);
    const counter = screen.queryByTestId('Trades');

    expect(counter).toBeDefined();
  });

  test('it should add currency text property in th of table', async() => {
    renderWithProviders(<Trades currency={currency}/>);
    
    const orderbook = screen.queryByTestId('OrderBook');
    const thPrice =  document.querySelectorAll('table th')

    expect(thPrice[1]).toHaveTextContent('USD')
    expect(thPrice[2]).toHaveTextContent('BTC')
    expect(orderbook).toBeDefined();
  });
});