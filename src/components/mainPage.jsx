import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import yodaImage from '../assets/Yoda.png';

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <section className='section-mainPage size-full-vertical-pagePercent-withHeader flex-row-sb-c'>
            <div className="mainPage-image"><img src={yodaImage} alt="Yoda" /></div>
            <div className='container'>
                <div className="mainPage-content flex-col-sb-left flex-gap-64 color-white">
                    <h1 className='shadow-text-default'><b>Find</b> all your<br/>favorite<b><br/>characters</b></h1>

                    <h3 className='shadow-text-default'>You can find out all<br/>the information about your favorite<br/>characters</h3>

                    <button className="button-text button-orange" onClick={() => navigate(`/characters`)}>See more...</button>
                </div>
            </div>
        </section>
    );
};

export default MainPage;