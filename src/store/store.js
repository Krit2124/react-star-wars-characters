import { create } from 'zustand';

export const useGeneralStore = create((set) => ({
    amountOfCharacters: 0,
    // Все полученные персонажи
    characters: [],
    // Персонажи для вывода в соответствии с фильтрами
    charactersToDisplay: [],
    // Флаг о том, что получить больше персонажей невозможно
    isCharactersEnded: false,
    // Опции для фильтрации по цвету глаз
    filterOptionsColorEye: ['All'],
    // Выбранный фильтр
    chosenOptionColorEye: 'All',
    // Ошибка
    error: null,
    // Функция для фильтрации персонажей по цвету глаз
    filterCharactersByEyeColor: () => {
        set((state) => ({
            charactersToDisplay: state.chosenOptionColorEye === 'All'
                ? state.characters
                : state.characters.filter(character => character.eye_color === state.chosenOptionColorEye)
        }));
    },
    // Получение данных о персонажах
    fetchCharacters: async (page) => {
        try {
            const response = await fetch(`https://swapi.dev/api/people/?page=${page}`)
            const data = await response.json();
            if (data.next === null) {
                set({ isCharactersEnded: true });
                return;
            } 
            set((state) => {
                const charactersSet = new Set(state.characters?.map(char => JSON.stringify(char)));
                const eyeColorsSet = new Set(state.filterOptionsColorEye);

                data.results.forEach(character => {
                    charactersSet.add(JSON.stringify(character));
                    if (character.eye_color !== 'unknown') {
                        eyeColorsSet.add(character.eye_color);
                    }
                });

                return {
                    characters: Array.from(charactersSet).map(char => JSON.parse(char)),
                    filterOptionsColorEye: ['All', ...Array.from(eyeColorsSet).filter(color => color !== 'All')]
                };
            });

            set((state) => ({
                charactersToDisplay: state.chosenOptionColorEye === 'All'
                    ? state.characters
                    : state.characters.filter(character => character.eye_color === state.chosenOptionColorEye)
            }));
            
            set({ amountOfCharacters: data.count });
            return data;
            
        } catch (err) {
            set({ error: err });
        }
    },
    // Очистка ошибки
    clearError: () => set({ error: null }),
}));