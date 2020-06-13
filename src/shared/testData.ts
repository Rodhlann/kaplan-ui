import { BookListResult, BookResult } from './types';

export const testBook1 = {
    title: 'Title',
    authors: ['John Doe', 'Jane Doe'],
    publisher: 'Publisher',
    publishedDate: '2020',
};

export const testBook2 = {
    title: 'Title2',
    authors: ['Jim Doe', 'Joanna Doe'],
    publisher: 'Publisher2',
    publishedDate: '2021',
};

export const testBookToAdd = {
    title: 'Title3',
    authors: ['Jake Doe', 'Jill Doe'],
    publisher: 'Publisher3',
    publishedDate: '2022',
};

export const testBookResult: BookResult[] = [
    {
        id: 'asdf',
        volumeInfo: testBook1,
    },
    {
        id: 'wasd',
        volumeInfo: testBook2,
    }
];

export const fetchBooksResult: BookListResult = {
    items: testBookResult
};
