import React from 'react';
import style from './preloader.module.css';
import preloaderImg from './preloader.gif'

export const Preloader = (props) => {
    return (
        <div className={style.preloader}>
            <img src={preloaderImg} alt='' />
        </div>
    )
}

export const SmallPreloader = (props) => {
    return (
        <div className={style.smallPreloader}>
            <img src={preloaderImg} alt='' />
        </div>
    )
}
