import React from 'react';

import errorImage from './assets/error.png';
import { Link } from 'react-router-dom';

const errorPage = () => {
    return (
        <section className='section-errorPage'>
            <div className='container size-full-vertical-pagePercent  errorPage-content flex-col-c-c flex-gap-73'>
                <img src={errorImage} alt='error' />

                <button className="button-text button-green" onClick={() => window.history.back()}>
                    Return
                </button>
            </div>
        </section>
    );
};

export default errorPage;