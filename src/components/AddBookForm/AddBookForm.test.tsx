import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AddBookForm } from './AddBookForm';
import { testBook1 } from '../../shared/testData';

describe('AddBookForm', () => {
    const addNewBookMock = jest.fn();
    const setIsAddingBook = jest.fn();

    it('should render the form', () => {
        const { getByText, getByLabelText } = render(<AddBookForm addNewBook={addNewBookMock} setIsAddingBook={setIsAddingBook} />);

        const headerNode = getByText('Create a New Book');
        const titleNode = getByLabelText('Title*');
        const authorsNode = getByLabelText('Authors*');
        const publisherNode = getByLabelText('Publisher');
        const publishedDateNode = getByLabelText('Published Date*');
        const submitButtonNode = getByText('Submit');
        const cancelButtonNode = getByText('Cancel');

        expect(headerNode).toBeTruthy();
        expect(titleNode).toBeTruthy();
        expect(authorsNode).toBeTruthy();
        expect(publisherNode).toBeTruthy();
        expect(publishedDateNode).toBeTruthy();
        expect(submitButtonNode).toBeTruthy();
        expect(cancelButtonNode).toBeTruthy();
    });

    it('should cancel the add book flow', () => {
        const { getByText } = render(<AddBookForm addNewBook={addNewBookMock} setIsAddingBook={setIsAddingBook} />);
        const cancelButtonNode = getByText('Cancel');
        fireEvent.click(cancelButtonNode);
        expect(setIsAddingBook).toHaveBeenCalledWith(false);
    });

    it('should submit the form', async () => {
        const { getByText, getByLabelText } = render(<AddBookForm addNewBook={addNewBookMock} setIsAddingBook={setIsAddingBook} />);

        const titleNode = getByLabelText('Title*') as HTMLInputElement;
        const authorsNode = getByLabelText('Authors*') as HTMLInputElement;
        const publisherNode = getByLabelText('Publisher') as HTMLInputElement;
        const publishedDateNode = getByLabelText('Published Date*') as HTMLInputElement;
        let submitButtonNode = getByText('Submit') as HTMLButtonElement;

        expect(submitButtonNode.disabled).toBeTruthy();

        fireEvent.focus(titleNode);
        fireEvent.change(titleNode, { target: {  value: testBook1.title }});
        expect (titleNode.value).toBe(testBook1.title);

        fireEvent.focus(authorsNode);
        fireEvent.change(authorsNode, { target: { value: testBook1.authors.join(', ') }});
        expect (authorsNode.value).toBe(testBook1.authors.join(', '));

        fireEvent.focus(publisherNode);
        fireEvent.change(publisherNode, { target: { value: testBook1.publisher }});
        expect (publisherNode.value).toBe(testBook1.publisher);

        fireEvent.focus(publishedDateNode);
        fireEvent.change(publishedDateNode, { target: { value: testBook1.publishedDate }});
        expect (publishedDateNode.value).toBe(testBook1.publishedDate);
        fireEvent.blur(publishedDateNode);

        expect(submitButtonNode.disabled).toBeFalsy();

        fireEvent.click(submitButtonNode);

        await waitFor(() => {
            expect(addNewBookMock).toHaveBeenCalledWith(testBook1);
            expect(setIsAddingBook).toHaveBeenCalledWith(false);
        });
    });

    it('should be unable to submit the form', async () => {
        const { getByText, getByLabelText } = render(<AddBookForm addNewBook={addNewBookMock} setIsAddingBook={setIsAddingBook} />);

        const titleNode = getByLabelText('Title*') as HTMLInputElement;
        const authorsNode = getByLabelText('Authors*') as HTMLInputElement;
        const publisherNode = getByLabelText('Publisher') as HTMLInputElement;
        const publishedDateNode = getByLabelText('Published Date*') as HTMLInputElement;
        let submitButtonNode = getByText('Submit') as HTMLButtonElement;

        expect(submitButtonNode.disabled).toBeTruthy();

        fireEvent.focus(titleNode);
        fireEvent.change(titleNode, { target: {  value: testBook1.title }});
        expect (titleNode.value).toBe(testBook1.title);

        fireEvent.focus(authorsNode);
        fireEvent.change(authorsNode, { target: { value: testBook1.authors.join(', ') }});
        expect (authorsNode.value).toBe(testBook1.authors.join(', '));

        fireEvent.focus(publisherNode);
        fireEvent.change(publisherNode, { target: { value: testBook1.publisher }});
        expect (publisherNode.value).toBe(testBook1.publisher);

        fireEvent.focus(publishedDateNode);
        fireEvent.change(publishedDateNode, { target: { value: testBook1.publishedDate }});
        expect (publishedDateNode.value).toBe(testBook1.publishedDate);
        fireEvent.blur(publishedDateNode);

        expect(submitButtonNode.disabled).toBeFalsy();

        fireEvent.focus(publishedDateNode);
        fireEvent.change(publishedDateNode, { target: { value: '' }});
        expect (publishedDateNode.value).toBe('');
        fireEvent.blur(publishedDateNode);

        await waitFor(() => {
            expect(submitButtonNode.disabled).toBeTruthy();
        });
    });

    it('should show validation errors', async () => {
        const { getByText, getByLabelText } = render(<AddBookForm addNewBook={addNewBookMock} setIsAddingBook={setIsAddingBook} />);

        const titleNode = getByLabelText('Title*') as HTMLInputElement;
        const authorsNode = getByLabelText('Authors*') as HTMLInputElement;
        const publishedDateNode = getByLabelText('Published Date*') as HTMLInputElement;

        fireEvent.blur(titleNode);
        await waitFor(() => {
            const titleValidationNode = getByText('Title is required');
            expect(titleValidationNode).toBeTruthy();
        });

        fireEvent.blur(authorsNode);
        await waitFor(() => {
            const authorValidationNode = getByText('Author is required');
            expect(authorValidationNode).toBeTruthy();
        });

        fireEvent.blur(publishedDateNode);
        await waitFor(() => {
            const publishedDateValidationNode = getByText('Published Date is required');
            expect(publishedDateValidationNode).toBeTruthy();
        });
    });
});
