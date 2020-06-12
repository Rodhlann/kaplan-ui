import * as React from 'react';

export const Header: React.FC<{ setIsAddingBook: (bool: boolean) => void }> = ({ setIsAddingBook }) => (
    <div className='header__container'>
        <h1 className='header__header'>Books</h1>
        <button className='header__button' onClick={() => setIsAddingBook(true)}>Create New Book</button>
    </div>
);
