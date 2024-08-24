import React from 'react';
import CharactersCard from './charactersCard';

import { useGeneralStore } from 'store/store';

const CharactersList = () => {
    const { 
        charactersToDisplay,
     } = useGeneralStore();

    return (
        <div className='flex-row-sb-c flex-wrap'>
            {charactersToDisplay?.map((character) => (
                <CharactersCard key={Math.random()} name={character.name} height={character.height} mass={character.mass} birthYear={character.birth_year} gender={character.gender}/>
            ))}
        </div>
    );
};

export default CharactersList;