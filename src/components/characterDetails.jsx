import React, { useMemo } from 'react';
import { useGeneralStore } from 'store/store';

import closeImage from '../assets/closeIcon.png';
import femaleIconImage from '../assets/IconFemale.png';
import hermaphroditeIconImage from '../assets/IconHermaphrodite.png';
import maleIconImage from '../assets/IconMale.png';

const CharacterDetails = () => {
    const { 
        characters,
        setIsDetailsOpen,
        chosenCharacterId,
    } = useGeneralStore();

    const character = useMemo(() => characters[chosenCharacterId], [characters, chosenCharacterId]);

    const {
        name,
        height,
        mass,
        birth_year: birthYear,
        gender,
        hair_color: hairColor,
        skin_color: skinColor,
        eye_color: eyeColor
    } = character;

    return (
        <div className='size-full-horizontal-pagePercent size-full-vertical-pagePercent box-details flex-col-c-c flex-gap-15'>
            <div className='flex-col-sb-right'>
                <button className='button-invisible' onClick={() => setIsDetailsOpen(false)}>
                    <img src={closeImage} alt="close" />
                </button>

                <div className='flex-row-sb-c card-details'>
                    <div className='flex-col-sb-c flex-gap-6 card-details-imageBox'>
                        <div className='size-full-vertical-percent'>
                            {gender === "male" ? (
                                <img src={maleIconImage} alt="maleIcon" />
                            ) : gender === "female" ? (
                                <img src={femaleIconImage} alt="femaleIcon" />
                            ) : (
                                <img src={hermaphroditeIconImage} alt="hermaphroditeIcon" />
                            )}
                        </div>

                        <div className='flex-col-sb-right size-full-horizontal-percent'>
                            <div className='flex-row-sb-c flex-gap-15'>
                                {(gender !== 'n/a' && gender !== 'none') && (
                                    <div className={`character-tag ${gender === 'male' ? 'character-tag-green' : gender === 'female' ? 'character-tag-pink' : 'character-tag-yellow'}`}>
                                        {gender}
                                    </div>
                                )}
                                {birthYear !== 'unknown' && <div className='character-tag character-tag-blue'>{birthYear}</div>}
                            </div>
                        </div>
                    </div>

                    <div className='flex-col-sb-left card-details-contentBox'>
                        <h2 className='color-white'>{name}</h2>
                        <div className='flex-col-sb-left box-white'>
                            {(hairColor !== 'n/a' && hairColor !== 'none' && hairColor !== 'unknown') && <p>hair color: {hairColor}</p>}
                            {(skinColor !== 'n/a' && skinColor !== 'none' && skinColor !== 'unknown') && <p>skin color: {skinColor}</p>}
                            {(eyeColor !== 'n/a' && eyeColor !== 'none' && eyeColor !== 'unknown') && <p>eye color: {eyeColor}</p>}
                        </div>

                        <div className='flex-row-sb-c flex-gap-28'>
                            {height !== 'unknown' && (
                                <div className='flex-col-sb-c flex-gap-6 box-white'>
                                    <div className='character-parameter-rounder flex-col-c-c'>
                                        {height}
                                    </div>
                                    <p>height</p>
                                </div>
                            )}
                            {mass !== 'unknown' && (
                                <div className='flex-col-sb-c flex-gap-6 box-white'>
                                    <div className='character-parameter-rounder flex-col-c-c'>
                                        {mass}
                                    </div>
                                    <p>mass</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetails;