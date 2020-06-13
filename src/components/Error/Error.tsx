import React from 'react';

export const Error: React.FC = () =>
    <div className='error__container'>
        <img
            className='error__icon'
            alt='Alert'
            src='https://image.flaticon.com/icons/svg/607/607870.svg'
            data-testid='error-icon'
        />
        <h1 className='error__header'>An Error Occurred!</h1>
        <p className='error__paragraph'>Please check your internet connection and try again.</p>
    </div>;
