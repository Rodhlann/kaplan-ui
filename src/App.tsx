import React, {useEffect, useState} from 'react';
import './App.scss';
import { Header } from "./components/Header/Header";
import { BookResult } from "./components/BookItem/BookItem";
import { Search } from "./components/Search/Search";

export type BookListResult = {
    items: BookResult[];
};

const App = () => {
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

    return (
        <div className="App">
            { !isAddingBook ? (
                <>
                    <Header setIsAddingBook={setIsAddingBook} />
                    <Search loading={isLoading} data={bookListResult?.items}/>
                </>
            ) : (
                <>
                    {/*<AddBookForm />*/}
                </>
            )}
        </div>
    );
};

export default App;
