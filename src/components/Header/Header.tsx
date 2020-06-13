import React from 'react';
import { Button } from '../Button/Button';

export const Header: React.FC<{ setIsAddingBook: (bool: boolean) => void }> = ({ setIsAddingBook }) => (
    <div className='header__container'>
        <h1 className='header__header'>Books</h1>
        <Button onClick={() => setIsAddingBook(true)} buttonText='Create New Book' />
    </div>
);
