import useWeatherStore from '@/store/weatherStore';
import { fireEvent, render, screen } from '@testing-library/react';

import SearchInput from '../SearchInput';

jest.mock('@/store/weatherStore', () => {
  const zustand = jest.requireActual('zustand');

  const mockStore = {
    searchText: '',
    setSearchText: jest.fn(),
  };

  return { __esModule: true, default: zustand.create(() => mockStore) };
});

describe('SearchInput Component', () => {
  const setSearchTextMock = jest.fn();

  it('renders the input and icon', () => {
    render(<SearchInput />);

    const input = screen.getByPlaceholderText('Search by City...');
    expect(input).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<SearchInput />);

    const input = screen.getByPlaceholderText('Search by City...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Cape Town' } });

    expect(input.value).toBe('Cape Town');
  });

  it('calls setSearchText on Enter if input is valid', () => {
    render(<SearchInput />);

    const input = screen.getByPlaceholderText('Search by City...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Durban' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(useWeatherStore.getState().setSearchText).toHaveBeenCalledWith('Durban');
  });

  it('does NOT call setSearchText on Enter if input is too short', () => {
    render(<SearchInput />);

    const input = screen.getByPlaceholderText('Search by City...');
    fireEvent.change(input, { target: { value: 'NY' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(setSearchTextMock).not.toHaveBeenCalled();
  });
});
