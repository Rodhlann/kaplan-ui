import React, { useEffect, useState } from 'react';
import { BookList } from '../BookList/BookList';
import { TextInput } from '../TextInput/TextInput';
import { BookResult } from '../../shared/types';

export const Search: React.FC<{loading: boolean, data?: BookResult[]}> = ({
    loading,
    data
}) => {
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
    }, [loading, data, searchTerm]);

    const handleInputEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <TextInput aria-label='search input' onChange={handleInputEvent} value={searchTerm} kind='search' placeholder='Search' />
            <BookList loading={loading} books={filteredData} />
        </>
    );
};
