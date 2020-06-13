import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

const buttonText = 'Click Me';

describe('Button', () => {
    it('should render the primary button', () => {
        const { getByText } = render(<Button buttonText={buttonText} />);
        const buttonNode = getByText(buttonText);
        expect(buttonNode).toBeTruthy();
        expect(buttonNode.className).toBe('button--button button__primary')
    });

    it('should render the secondary button', () => {
        const { getByText } = render(<Button buttonText={buttonText} kind='secondary' />);
        const buttonNode = getByText(buttonText);
        expect(buttonNode).toBeTruthy();
        expect(buttonNode.className).toBe('button--button button__secondary')
    });

    it('should click the button', () => {
        const onClickMock = jest.fn();
        const { getByText } = render(<Button buttonText={buttonText} onClick={onClickMock}/>);

        const buttonNode = getByText(buttonText);
        expect(buttonNode).toBeTruthy();

        fireEvent.click(buttonNode);
        expect(onClickMock).toHaveBeenCalled();
    });

    it('should render the disabled primary button', () => {
        const { getByText } = render(<Button buttonText={buttonText} disabled={true} />);
        const buttonNode = getByText(buttonText) as HTMLButtonElement;
        expect(buttonNode).toBeTruthy();
        expect(buttonNode.disabled).toBeTruthy();
    });
});
