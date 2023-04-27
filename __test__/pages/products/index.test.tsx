import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SessionProvider, useSession } from 'next-auth/react';
import Products from '@/pages/products';

// Mock the useSession hook
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe('The Product Index Page', () => {
  it('Renders the Product Index Page if User is Authenticated', () => {
    // Mock the useSession hook to return a mocked session object
    (useSession as jest.Mock).mockReturnValueOnce([
      { user: { name: 'John Doe' } },
      false,
    ]);

    // Render the component wrapped in the SessionProvider
    render(<Products />);

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Add new Products');
  });
});
