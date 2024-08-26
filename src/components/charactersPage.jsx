import React, { useEffect, useState, useCallback } from 'react';
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

    // Номер последнего загруженного набора персонажей
    const [lastCharacterPage, setLastCharacterPage] = useState(1);

    // Функция для загрузки данных, пока страница визуально не заполнится, либо пока не кончатся персонажи
    const checkAndLoadUntilFull = useCallback(() => {
        if (document.documentElement.scrollHeight - 250 <= window.innerHeight && !isCharactersEnded) {
            setLastCharacterPage(prevPage => prevPage + 1);
        }
    }, [isCharactersEnded]);

    const handleFilterChange = useCallback((e) => {
        setFilterOptionsColorEye(e.target.value);
        filterCharactersByEyeColor();
        setTimeout(checkAndLoadUntilFull, 0);
    }, [setFilterOptionsColorEye, filterCharactersByEyeColor, checkAndLoadUntilFull]);

    useEffect(() => {
        // Обработчик скролла страницы для подгрузки данных при достижении конца страницы
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 250 && !isCharactersEnded) {
                setLastCharacterPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearError();
        };
    }, [isCharactersEnded, clearError]);

    useEffect(() => {
        // Запуск заполнения экрана персонажами после запроса нового набора
        if (!isCharactersEnded) {
            fetchCharacters(lastCharacterPage).then(() => {
                checkAndLoadUntilFull();
            });
        }
    }, [lastCharacterPage, fetchCharacters, checkAndLoadUntilFull, isCharactersEnded]);

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
                        {filterOptionsColorEye.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                </div>

                <CharactersList />

                {!isCharactersEnded && <h2>Loading...</h2>}
            </div>
        </section>
    );
};

export default CharactersPage;