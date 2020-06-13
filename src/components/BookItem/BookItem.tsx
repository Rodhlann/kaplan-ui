import React from 'react';
import { BookResultVolumeInfo } from '../../shared/types';

export const BookItem: React.FC<BookResultVolumeInfo> = ({
    title,
    authors,
    publisher,
    publishedDate
}) => {
    return <div className='book-item__container'>
        <h4 className='book-item__header'>{title}</h4>
        <div className='book-item__line-item'>Authors: {authors.join(', ')}</div>
        { publisher &&
            <div className='book-item__line-item'>Publisher: {publisher}</div>
        }
        <div className='book-item__line-item'>Published Date: {publishedDate}</div>
    </div>
};
