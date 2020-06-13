import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
    const isAddingBookMock = jest.fn();

    it('should render the header', () => {
        const { getByText } = render(<Header setIsAddingBook={isAddingBookMock} />);

        const headerNode = getByText('Books');
        expect(headerNode).toBeTruthy();

        const buttonNode = getByText('Create New Book');
        expect(buttonNode).toBeTruthy();
    });

    it('should set isAddingBook on click', () => {
        const { getByText } = render(<Header setIsAddingBook={isAddingBookMock} />);

        const headerNode = getByText('Books');
        expect(headerNode).toBeTruthy();

        const buttonNode = getByText('Create New Book');
        expect(buttonNode).toBeTruthy();

        fireEvent.click(buttonNode);
        expect(isAddingBookMock).toHaveBeenCalledWith(true);
    });
});
