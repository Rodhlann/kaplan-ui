import React from 'react';
import { BookList } from './BookList';
import { render } from '@testing-library/react';
import { testBookResult } from '../../shared/testData';

describe('BookList', () => {
    it('should render the book list', () => {
        const { queryByText, getAllByTestId } = render(<BookList loading={false} books={testBookResult} />)

        const loadingNode = queryByText('Loading...');
        expect(loadingNode).toBeFalsy();

        const bookNodes = getAllByTestId('book-item');
        expect(bookNodes.length).toBe(2);
    });

    it('should render the loading view', () => {
        const { queryByText, queryByTestId } = render(<BookList loading={true} />);

        const loadingNode = queryByText('Loading...');
        expect(loadingNode).toBeTruthy();

        const bookNodes = queryByTestId('book-item');
        expect(bookNodes).toBeFalsy();
    });

    it('should render empty list message', () => {
        const { queryByText, queryByTestId } = render(<BookList loading={false} books={[]} />);

        const loadingNode = queryByText('Loading...');
        expect(loadingNode).toBeFalsy();

        const bookNodes = queryByTestId('book-item');
        expect(bookNodes).toBeFalsy();

        const messageNode = queryByText('No books found');
        expect(messageNode).toBeTruthy();
    });
});
