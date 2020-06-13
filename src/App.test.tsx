import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import { fetchBooksResult, testBookToAdd } from './shared/testData';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

describe('Kaplan UI user workflow', () => {
  enableFetchMocks();

  it ('should render the app', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(fetchBooksResult));

    const { getByText, getAllByTestId } = render(<App />);
    const loadingNode = getByText('Loading...');
    expect(loadingNode).toBeTruthy();

    const bookNodes = await waitFor(() => getAllByTestId('book-item'));
    expect(bookNodes.length).toBe(2);
  });

  it('should add a new book', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(fetchBooksResult));

    const { getByText, getAllByTestId, getByLabelText } = render(<App />);
    const loadingNode = getByText('Loading...');
    expect(loadingNode).toBeTruthy();

    let bookNodes = await waitFor(() => getAllByTestId('book-item'));
    expect(bookNodes.length).toBe(2);

    const addBookButton = getByText('Create New Book');
    fireEvent.click(addBookButton);

    const titleNode = getByLabelText('Title*') as HTMLInputElement;
    const authorsNode = getByLabelText('Authors*') as HTMLInputElement;
    const publisherNode = getByLabelText('Publisher') as HTMLInputElement;
    const publishedDateNode = getByLabelText('Published Date*') as HTMLInputElement;
    let submitButtonNode = getByText('Submit') as HTMLButtonElement;

    fireEvent.focus(titleNode);
    fireEvent.change(titleNode, { target: {  value: testBookToAdd.title }});
    expect (titleNode.value).toBe(testBookToAdd.title);

    fireEvent.focus(authorsNode);
    fireEvent.change(authorsNode, { target: { value: testBookToAdd.authors.join(', ') }});
    expect (authorsNode.value).toBe(testBookToAdd.authors.join(', '));

    fireEvent.focus(publisherNode);
    fireEvent.change(publisherNode, { target: { value: testBookToAdd.publisher }});
    expect (publisherNode.value).toBe(testBookToAdd.publisher);

    fireEvent.focus(publishedDateNode);
    fireEvent.change(publishedDateNode, { target: { value: testBookToAdd.publishedDate }});
    expect (publishedDateNode.value).toBe(testBookToAdd.publishedDate);
    fireEvent.blur(publishedDateNode);

    fireEvent.click(submitButtonNode);

    bookNodes = await waitFor(() => getAllByTestId('book-item'));
    expect(bookNodes.length).toBe(3);
  });

  it('should show an error screen if fetch failed', async() => {
    fetchMock.mockReject(new Error('It broke'));

    const { getByText } = render(<App />);
    const errorNode = await waitFor(() => getByText('An Error Occurred!'));
    expect(errorNode).toBeTruthy();
  });
});
