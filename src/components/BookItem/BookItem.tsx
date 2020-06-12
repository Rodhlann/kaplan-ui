import * as React from 'react';

export type BookResult = {
    id: string,
    volumeInfo?: BookResultVolumeInfo;
};

export type BookResultVolumeInfo = {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
};

export const BookItem: React.FC<BookResultVolumeInfo> = ({ title, authors, publisher, publishedDate }) => {
    return <div className='book-item__container'>
        <h4 className='book-item__header'>{title}</h4>
        <div className='book-item__line-item'>Authors: {authors}</div>
        { publisher &&
            <div className='book-item__line-item'>Publisher: {publisher}</div>
        }
        <div className='book-item__line-item'>Published Date: {publishedDate}</div>
    </div>
};
