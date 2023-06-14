/* eslint-disable testing-library/no-node-access */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import OrderBook from './OrderBook';
describe('<OrderBook />', () => {
  const currency = 'btc-usd'
  test('it should render component', () => {
    render(<OrderBook currency={currency} book={{bids: [], asks: []}}/>);
    
    const orderbook = screen.queryByTestId('OrderBook');
    expect(orderbook).toBeDefined();
  });

  test('it should add currency text property in th of both table ask', async() => {
    render(<OrderBook currency={currency} book={{bids: [], asks: []}}/>);

    const orderbook = screen.queryByTestId('OrderBook');
    const thPrice =  document.querySelectorAll('.table-ask th')

    expect(thPrice[0]).toHaveTextContent('USD')
    expect(thPrice[1]).toHaveTextContent('BTC')
    expect(orderbook).toBeDefined();
  });

  test('it should add currency text property in th of both table bid', async() => {
    render(<OrderBook currency={currency} book={{bids: [], asks: []}}/>);
    
    const orderbook = screen.queryByTestId('OrderBook');
    const thPrice =  document.querySelectorAll('.table-bid th')

    expect(thPrice[0]).toHaveTextContent('USD')
    expect(thPrice[1]).toHaveTextContent('BTC')
    expect(orderbook).toBeDefined();
  });
});