import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Dash from './Dash';

describe('<Dash />', () => {
  test('it should mount', () => {
    render(<Dash />)
    
    const dash = screen.queryByTestId('Dash');

    expect(dash).toBeDefined();
  });
});