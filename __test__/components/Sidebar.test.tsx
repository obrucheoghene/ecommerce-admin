import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import Sidebar from '@/components/Sidebar';

jest.mock('next/router', () => {
  const actualModule = jest.requireActual('next/router');

  const mockRouter = {
    pathname: '/',
  };

  return {
    __esModule: true,
    ...actualModule,
    useRouter: jest.fn(() => {
      return { ...mockRouter };
    }),
  };
});

describe('The Sidebar component', () => {
  it('renders the sidebar component', () => {
    render(<Sidebar />);

    const text = screen.getByText(/Dashboard/i);

    expect(text).toBeInTheDocument();
  });

  it('renders the sidebar correctly', () => {
    const tree = renderer.create(<Sidebar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
