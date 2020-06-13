import React from 'react';

type ButtonProps = {
    buttonText: string;
    kind?: 'primary' | 'secondary';
};

export const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<any>> = ({
    buttonText,
    className,
    disabled,
    kind = 'primary',
    onClick,
    type = 'button',
}) => (<button
    className={`button--button ${kind === 'primary' ? 'button__primary' : 'button__secondary'} ${className || ''}`.trim()}
    disabled={disabled}
    onClick={onClick}
    type={type}
>{buttonText}</button>);
