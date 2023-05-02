import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSession } from 'next-auth/react';
import Products from '@/pages/products';

// Mock the useSession hook
jest.mock('next-auth/react', () => {
  const actualModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: '2023-05-31T02:13:48.232Z',
    user: {
      name: 'Wilfred Obruche',
      image:
        'https://lh3.googleusercontent.com/a/AGNmyxYSztcVPTQeXQXWu65DHIJ1q6nz6EHbNmqAHWhJ=s96-c',
      email: 'wilfredcloudspace@gmail.com',
    },
  };
  return {
    __esModule: true,
    ...actualModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' };
    }),
  };
});

jest.mock('next/router', () => {
  const actualModule = jest.requireActual('next/router');

  const mockRouter = {
    pathname: '/products',
    query: { productId: '644f2c9709ad71b7adf59dac' },
  };

  return {
    __esModule: true,
    ...actualModule,
    useRouter: jest.fn(() => {
      return { ...mockRouter };
    }),
  };
});

describe('The Product Index Page', () => {
  it('Renders the Product Index Page if User is Authenticated', async () => {
    render(<Products />);

    const text = screen.getByText(/Add new products/i);

    expect(text).toBeInTheDocument();
  });
});
