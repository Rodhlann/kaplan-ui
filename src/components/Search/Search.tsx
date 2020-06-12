import React, {useEffect, useState} from 'react';
import { BookResult } from '../BookItem/BookItem';
import { BookList } from "../BookList/BookList";

export const Search: React.FC<{loading: boolean, data?: BookResult[]}> = ({loading, data}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState();

    useEffect(() => {
        if (!loading) {
            const result = data?.filter((entry) => {
                const applicableData = {
                    title: entry.volumeInfo?.title,
                    authors: entry.volumeInfo?.authors,
                    publisher: entry.volumeInfo?.publisher,
                };
                return JSON.stringify(applicableData).includes(searchTerm);
            });
            setFilteredData(result || data || []);
        }
    }, [loading, searchTerm]);

    const handleInputEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return <>
        <div className='search--input__container'>
            <img className='search__icon' alt='magnifying glass' src='https://image.flaticon.com/icons/svg/565/565590.svg' />
            <input className='search--input' aria-label="search input" onChange={handleInputEvent} value={searchTerm} type='text' placeholder='Search' />
        </div>
        <BookList loading={loading} books={filteredData} />
    </>;
};
