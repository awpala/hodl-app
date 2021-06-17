import { render, screen, act } from '@testing-library/react';
import App from './App';

test('test', () => {
  act(() => {
    render(<App />);
  });
  const app = screen.getByTestId('App');
  expect(app).toBeInTheDocument();
});
