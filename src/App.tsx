import React from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Search } from './components/Search/Search';
import { useBookService } from './hooks/useBookService';
import { AddBookForm } from './components/AddBookForm/AddBookForm';
import { Error } from './components/Error/Error';

const App = () => {
    const { loading, error, bookListResult, setIsAddingBook, isAddingBook, addNewBook } = useBookService();

    return (
        <>
            {!error ? (
                <div className='app__container'>
                    {!isAddingBook ? (
                        <>
                            <Header setIsAddingBook={setIsAddingBook}/>
                            <Search loading={loading} data={bookListResult?.items}/>
                        </>
                    ) : (
                        <AddBookForm setIsAddingBook={setIsAddingBook} addNewBook={addNewBook} />
                    )}
                </div>
            ) : (
                <Error />
            )}
        </>
    );
};

export default App;
