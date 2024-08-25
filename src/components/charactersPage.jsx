import React, { useEffect, useState } from 'react';
import CharactersList from './charactersList';
import { useGeneralStore } from 'store/store';

const CharactersPage = () => {
    const { 
        fetchCharacters,
        amountOfCharacters,
        characters,
        filterOptionsColorEye,
        isCharactersEnded,
        error,
        clearError,
        filterCharactersByEyeColor,
        setFilterOptionsColorEye,
     } = useGeneralStore();

    const [lastCharacterPage, setLastCharacterPage] = useState(1);

    const checkAndLoadUntilFull = () => {
        // Проверяем, если контент меньше, чем высота окна, и подгрузка еще не завершена
        if (document.documentElement.scrollHeight - 200 <= window.innerHeight && !isCharactersEnded) {
            setLastCharacterPage(prevPage => prevPage + 1);
        }
    };

    const handleFilterChange = (e) => {
        setFilterOptionsColorEye(e.target.value);
        filterCharactersByEyeColor();
        setTimeout(checkAndLoadUntilFull, 0);
    };

    useEffect(() => {
        // Обработчик скролла страницы для подгрузки данных при достижении конца страницы
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 160 && !isCharactersEnded) {
                setLastCharacterPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearError();
        }
    }, []);

    useEffect(() => {
        // Запуск проверки и загрузки до заполнения экрана после каждой загрузки страницы
        fetchCharacters(lastCharacterPage).then(() => {
            checkAndLoadUntilFull();
        });
        console.log(lastCharacterPage);
        console.log(characters);
    }, [lastCharacterPage]);

    // уведомление об ошибке
    if (error && !isCharactersEnded) {
        return (
            <div className="container flex-col-c-c size-full-vertical-pagePercent-withHeader">
                <h2>Error: {error.message}</h2>
            </div>
        );
    }

    // уведомление о загрузке данных
    if (characters.length === 0) {
        return (
            <div className="container flex-col-c-c size-full-vertical-pagePercent-withHeader">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <section className='section-charactersPage size-full-vertical-pagePercent-withHeader'>
            <div className='container flex-col-sb-c flex-gap-28'>
                <div className='size-full-horizontal-percent'>
                    <p className='text-right'>language: en</p>
                </div>

                <div>
                    <h2>{`${amountOfCharacters} `} <span className='extrabold'>Peoples</span> for you to choose your favorite</h2>
                </div>

                <div className='flex-row-left-c flex-gap-15 size-full-horizontal-percent'>
                    <label htmlFor="color-eye-select">color eye</label>
                    <select name="color-eye" id="color-eye-select" className='select-filter text-center shadow-default' onChange={handleFilterChange}>
                        {filterOptionsColorEye.map((option) => { return <option key={option} value={option}>{option}</option>})}
                    </select>
                </div>

                <CharactersList />
            </div>
        </section>
    );
};

export default CharactersPage;