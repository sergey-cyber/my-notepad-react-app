import React from 'react';
import style from './formControl.module.css';

const FormContol = ( {input, meta, child, ...props} ) => {    //Lesson 77
    const hasError = meta.touched && meta.error;

    return (
        <div className={style.formControl + ' ' + (hasError ? style.error : '') }>
            {props.children}
            { /*hasError && <span> {meta.error} </span> */}
        </div>
    )
}

export const Textarea = (props) => {    //Lesson 77
    const {input, meta, child, ...restProps} = props;
    
    return (
        <FormContol {...props} > <textarea {...input} {...restProps} /> </FormContol>
    )
}

export const Input = ( props ) => {    //Lesson 77
    const {input, meta, child, ...restProps} = props;
    return (
        <FormContol {...props} > <input {...input} {...restProps} /> </FormContol>
    )
}