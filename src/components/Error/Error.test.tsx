import React from 'react';
import { render } from '@testing-library/react';
import { Error } from './Error';

describe('Error', () => {
    it('should render the error view', () => {
        const { getByTestId, getByText } = render(<Error />);

        const iconNode = getByTestId('error-icon');
        const headerNode = getByText('An Error Occurred!');
        const bodyNode = getByText('Please check your internet connection and try again.');

        expect(iconNode).toBeTruthy();
        expect(headerNode).toBeTruthy();
        expect(bodyNode).toBeTruthy();
    });
});
