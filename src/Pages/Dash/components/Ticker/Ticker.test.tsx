import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Ticker from './Ticker';

describe('<Counter />', () => {
  test('it should mount', () => {
    render(<Ticker />);
    
    const counter = screen.getByTestId('Counter');

    expect(counter).toBeDefined();
  });
});