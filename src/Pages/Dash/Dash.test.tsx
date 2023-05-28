import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Dash from './Dash';

describe('<Counter />', () => {
  test('it should mount', () => {
    render(<Dash />);
    
    const counter = screen.getByTestId('Counter');

    expect(counter).toBeDefined();
  });
});