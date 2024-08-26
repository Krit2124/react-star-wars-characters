import React from 'react';

import { useGeneralStore } from 'store/store';

const CharactersCard = ({ id, name, height, mass, birthYear, gender}) => {
    const { 
        setIsDetailsOpen,
        setChosenCharacterId,
    } = useGeneralStore();

    return (
        <button className="button-invisible" onClick={() => {
            // Изменение флага отображения карточки с детальным описанием персонажа
            setChosenCharacterId(id);
            setIsDetailsOpen(true);
        }}>
            <div className='character-card flex-col-sb-left flex-gap-12 shadow-default'>
                <h4>{name}</h4>
                <div className='flex-row-sb-c flex-gap-12'>
                    {height !== 'unknown' && <div className='flex-col-sb-c flex-gap-6'>
                        <div className='character-parameter-rounder flex-col-c-c'>
                            {height}
                        </div>

                        <p>height</p>
                    </div>}

                    {mass !== 'unknown' && <div className='flex-col-sb-c flex-gap-6'>
                        <div className='character-parameter-rounder flex-col-c-c'>
                            {mass}
                        </div>

                        <p>mass</p>
                    </div>}               
                </div>

                <div className='flex-row-sb-c flex-gap-15'>
                    {((gender !== 'n/a') && (gender !== 'none')) && 
                    <div className={`character-tag ${gender === 'male' ? 'character-tag-green' : gender === 'female' ? 'character-tag-pink' : gender === 'hermaphrodite' ? 'character-tag-yellow' : ''}`}>
                        {gender}
                    </div>}
                    {birthYear !== 'unknown' && <div className='character-tag character-tag-blue'>{birthYear}</div>}
                </div>
            </div>
        </button>
    );
};

export default CharactersCard;