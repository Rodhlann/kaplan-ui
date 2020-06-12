import React from 'react';
import { BookItem, BookResult } from '../BookItem/BookItem';

export const BookList: React.FC<{ loading: boolean; books: BookResult[] }> = ({ loading, books }) => {
    return <div className='book-list__container'>
        <h2 className='book-list__header'>All Books</h2>
        {loading ? <div>Loading...</div> :
            <div className='book-list__items'>
                {books?.length ?
                    books.map((book) => (book && book.volumeInfo && <BookItem key={book.id} {...book.volumeInfo} />)) :
                    <div>No books found</div>
                }
            </div>
        }
    </div>;
};
