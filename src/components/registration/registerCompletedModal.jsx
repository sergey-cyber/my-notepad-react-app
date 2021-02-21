import React from 'react';
import style from './registration.module.css';

const RegisterCompletedModal = (props) => {
    const closeModalWindow = () => {
        props.setRegistrationModalWindow(false);
    }

    return (
        <div className={style.modalWrapper}>
            <div className={style.modal}>
                <h2>Registration completed successfully, please login </h2>
                <button onClick={closeModalWindow}>OK!</button>
            </div>
        </div>
    );
}

export default RegisterCompletedModal;
