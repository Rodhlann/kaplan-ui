import React from 'react';
import { render } from '@testing-library/react';
import { TextInput } from './TextInput';

describe('TestInput', () => {
    it('should render the search text input', () => {
        const { getByTestId } = render(<TextInput kind='search' />);

        const searchIconNode = getByTestId('text-input--search--icon');
        expect(searchIconNode).toBeTruthy();

        const inputNode = getByTestId('text-input--input');
        expect(inputNode).toBeTruthy();
        expect(inputNode.className).toEqual('text-input--input--search');
    });

    it('should render the standard text input', () => {
        const { getByTestId, queryByTestId } = render(<TextInput />);

        const searchIconNode = queryByTestId('text-input--search--icon');
        expect(searchIconNode).toBeFalsy();

        const inputNode = getByTestId('text-input--input');
        expect(inputNode).toBeTruthy();
        expect(inputNode.className).toEqual('text-input--input');
    });
});
