import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { BookResultVolumeInfo, BookResult, BookListResult } from '../shared/types';

export const useBookService = () => {
    const [hasError, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddingBook, setIsAddingBook] = useState(false);
    const [bookListResult, setBookListResult] = useState<BookListResult>();

    useEffect(() => {
        setIsLoading(true);
        fetch('https://www.googleapis.com/books/v1/volumes?q=kaplan%20test%20prep')
            .then((res) => res.json())
            .then((data) => setBookListResult(data as BookListResult))
            .then(() => setIsLoading(false))
            .catch((error) => setError(!!error));
    }, [hasError]);

    const addNewBook = (book: BookResultVolumeInfo): void => {
        const bookResult: BookResult = {
            id: uuid() as string,
            volumeInfo: book,
        };

        const bookList: BookResult[] = bookListResult?.items.concat(bookResult) || [bookResult];

        const updatedBookListResult: BookListResult =  {
            items: bookList
        };

        setBookListResult(updatedBookListResult);
    };

    return {
        loading: isLoading,
        error: hasError,
        bookListResult,
        isAddingBook,
        setIsAddingBook,
        addNewBook,
    }
};
