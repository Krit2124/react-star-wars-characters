import React from 'react';
import { useNavigate } from 'react-router-dom';

import yodaImage from '../assets/Yoda.png';

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <section className='section-mainPage flex-row-sb-c'>
            <div className='container flex-row-sb-c'>
                <div className="mainPage-content flex-col-sb-left flex-gap-64 color-white">
                    <h1><b>Find</b> all your favorite <b>characters</b></h1>

                    <h2>You can find out all the information about your favorite characters</h2>

                    <button className="button-text button-orange" onClick={() => navigate(`/characters`)}>See more...</button>
                </div>
                <div className="mainPage-image">
                    <img src={yodaImage} alt="Yoda" />
                </div>
            </div>
        </section>
    );
};

export default MainPage;