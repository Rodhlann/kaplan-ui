import React, {AriaAttributes, InputHTMLAttributes} from 'react';

export type TextInputProps = {
    className?: string;
    placeholder?: string;
    kind: 'text' | 'search'
};

export const TextInput: React.FC<TextInputProps & InputHTMLAttributes<any> & AriaAttributes> = ({
    className,
    kind = 'text',
    name,
    onChange,
    placeholder,
    value,
    ...rest
}) =>
    <div className={`text-input__container ${className || ''}`.trim()}>
        { kind === 'search' &&
            <img
                className='text-input__icon--search'
                alt='magnifying glass'
                src='https://image.flaticon.com/icons/svg/565/565590.svg'
            />
        }
        <input
            className={`${kind === 'search' ? 'text-input--input--search' : 'text-input--input' }`}
            onChange={onChange}
            value={value}
            name={name}
            type='text'
            placeholder={placeholder}
            {...rest}
        />
    </div>;
