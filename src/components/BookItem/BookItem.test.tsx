import React from 'react';
import { render } from '@testing-library/react';
import { BookItem } from './BookItem';
import { testBook1 } from '../../shared/testData';
import { BookResultVolumeInfo } from '../../shared/types';

describe('BookItem', () => {
    it('should render the book info', () => {
        const { getByText } = render(<BookItem {...testBook1} />);

        const titleNode = getByText(testBook1.title);
        const authorsNode = getByText(`Authors: ${testBook1.authors.join(', ')}`);
        const publisherNode = getByText(`Publisher: ${testBook1.publisher}`);
        const publishedDateNode = getByText(`Published Date: ${testBook1.publishedDate}`);

        expect(titleNode).toBeTruthy();
        expect(authorsNode).toBeTruthy();
        expect(publisherNode).toBeTruthy();
        expect(publishedDateNode).toBeTruthy();
    });

    it('should not render the publisher if none was provided', () => {
        const book = {
            ...testBook1,
            publisher: undefined,
        } as BookResultVolumeInfo;

        const { getByText, queryByText } = render(<BookItem {...book} />);

        const titleNode = getByText(book.title);
        const authorsNode = getByText(`Authors: ${book.authors.join(', ')}`);
        const publisherNode = queryByText(`Publisher: ${book.publisher}`);
        const publishedDateNode = getByText(`Published Date: ${book.publishedDate}`);

        expect(titleNode).toBeTruthy();
        expect(authorsNode).toBeTruthy();
        expect(publisherNode).not.toBeTruthy();
        expect(publishedDateNode).toBeTruthy();
    });
});
