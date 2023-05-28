import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import OrderBook from './OrderBook';

describe('<Counter />', () => {
  test('it should mount', () => {
    render(<OrderBook />);
    
    const counter = screen.getByTestId('Counter');

    expect(counter).toBeDefined();
  });
});