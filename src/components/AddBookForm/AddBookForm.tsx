import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextInput, TextInputProps } from "../TextInput/TextInput";
import { Button } from "../Button/Button";
import { BookResultVolumeInfo } from '../../shared/types';

const AddBookSchema = Yup.object().shape({
    title: Yup.string()
        .required('Required'),
    authors: Yup.string()
        .required('Add at least one author'),
    publisher: Yup.string(),
    publishedDate: Yup.string()
        .required('Required'),
});

export const AddBookForm: React.FC<{
    addNewBook: (book: BookResultVolumeInfo) => void,
    setIsAddingBook: (bool: boolean) => void,
}> = ({ addNewBook, setIsAddingBook }) => {
    const handleOnSubmit = (book: BookResultVolumeInfo) => {
        addNewBook(book);
        setIsAddingBook(false);
    };

    const CustomInputComponent = (props: TextInputProps) => {
        return <TextInput kind='text' {...props} />;
    };

    return (
        <div className='book-form__container'>
            <Formik
                initialValues={{
                    title: '',
                    authors: '',
                    publisher: '',
                    publishedDate: '',
                }}
                validationSchema={AddBookSchema}
                onSubmit={values => handleOnSubmit({
                    ...values,
                    authors: values.authors.split(','),
                })}
            >
                {({ errors, touched, isValid }) => {
                   return (
                       <Form className='book-form--form'>
                           <h1 className='book-form__header'>Add a New Book</h1>
                           <label id='bookFormTitleLabel' className='book-form--label'>Title*</label>
                           <Field
                               name="title"
                               as={CustomInputComponent}
                               aria-labelledby='bookFormTitleLabel'
                               className='book-form__field'
                           />
                           {errors.title && touched.title ? (
                               <div className='book-form__error'>{errors.title}</div>
                           ) : null}
                           <label id='bookFormAuthorsLabel' className='book-form--label'>Authors*</label>
                           <Field
                               name="authors" as={CustomInputComponent}
                               placeholder='e.g. John Doe, Jane Doe'
                               aria-labelledby='bookFormAuthorsLabel'
                               className='book-form__field'
                           />
                           {errors.authors && touched.authors ? (
                               <div className='book-form__error'>{errors.authors}</div>
                           ) : null}
                           <label id='bookFormPublisherLabel' className='book-form--label'>Publisher</label>
                           <Field
                               name="publisher"
                               as={CustomInputComponent}
                               aria-labelledby='bookFormPublisherLabel'
                               className='book-form__field'
                           />
                           {errors.publisher && touched.publisher ? (
                               <div className='book-form__error'>{errors.publisher}</div>
                           ) : null}
                           <label id='bookFormPublishedDateLabel' className='book-form--label'>Published Date*</label>
                           <Field
                               name="publishedDate"
                               as={CustomInputComponent}
                               placeholder='e.g. 2020-01-01'
                               aria-labelledby='bookFormPublishedDateLabel'
                               className='book-form__field'
                           />
                           {errors.publishedDate && touched.publishedDate ? (
                               <div className='book-form__error'>{errors.publishedDate}</div>
                           ) : null}
                           <Button className='book-form--button__submit' type="submit" buttonText='Submit' disabled={!Object.keys(touched).length || !isValid} />
                           <Button className='book-form--button__cancel'  buttonText='Cancel' kind='secondary' onClick={() => setIsAddingBook(false)} />
                       </Form>
                   )
                }}
            </Formik>
        </div>
    );
};
