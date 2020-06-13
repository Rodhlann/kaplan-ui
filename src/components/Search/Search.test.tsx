import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Search } from './Search';
import { testBookResult, testBook2 } from '../../shared/testData';

describe('Search', () => {
    it('should render the loading view', () => {
        const { getByText, getByTestId } = render(<Search loading={true} />);

        const searchNode = getByTestId('text-input--input') as HTMLInputElement;
        expect(searchNode).toBeTruthy();

        const loadingNode = getByText('Loading...');
        expect(loadingNode).toBeTruthy();
    });

    it('should render the search view', async () => {
        const { getAllByTestId, queryByText, getByTestId } = render(<Search loading={false} data={testBookResult} />);

        const searchNode = getByTestId('text-input--input') as HTMLInputElement;
        expect(searchNode).toBeTruthy();

        const loadingNode = queryByText('Loading...');
        expect(loadingNode).toBeFalsy();

        const bookNodes = getAllByTestId('book-item');
        expect(bookNodes.length).toBe(2);
    });

    it('should filter results by title', async () => {
        const { getAllByTestId, queryByText, getByTestId } = render(<Search loading={false} data={testBookResult} />);

        const searchNode = getByTestId('text-input--input') as HTMLInputElement;
        expect(searchNode).toBeTruthy();

        const loadingNode = queryByText('Loading...');
        expect(loadingNode).toBeFalsy();

        const value = testBook2.title;
        fireEvent.change(searchNode, { target: { value } });
        expect(searchNode.value).toBe(value);

        const bookNodes = getAllByTestId('book-item');
        expect(bookNodes.length).toBe(1);
    });

    it('should filter results by authors', async () => {
        const { getAllByTestId, queryByText, getByTestId } = render(<Search loading={false} data={testBookResult} />);

        const searchNode = getByTestId('text-input--input') as HTMLInputElement;
        expect(searchNode).toBeTruthy();

        const loadingNode = queryByText('Loading...');
        expect(loadingNode).toBeFalsy();

        const value = testBook2.authors[0];
        fireEvent.change(searchNode, { target: { value } });
        expect(searchNode.value).toBe(value);

        const bookNodes = getAllByTestId('book-item');
        expect(bookNodes.length).toBe(1);
    });

    it('should filter results by publisher', () => {
        const { getAllByTestId, queryByText, getByTestId } = render(<Search loading={false} data={testBookResult} />);

        const searchNode = getByTestId('text-input--input') as HTMLInputElement;
        expect(searchNode).toBeTruthy();

        const loadingNode = queryByText('Loading...');
        expect(loadingNode).toBeFalsy();

        const value = testBook2.publisher;
        fireEvent.change(searchNode, { target: { value } });
        expect(searchNode.value).toBe(value);

        const bookNodes = getAllByTestId('book-item');
        expect(bookNodes.length).toBe(1);
    });
});
