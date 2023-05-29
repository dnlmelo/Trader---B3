import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Dash from './Dash';
import { renderWithProviders } from '../../utils/test.utils';

describe('<Dash />', () => {
  test('it should mount', () => {
    renderWithProviders(<Dash />)
    
    const dash = screen.queryByTestId('Dash');

    expect(dash).toBeDefined();
  });
});