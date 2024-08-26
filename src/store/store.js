import { create } from 'zustand';

export const useGeneralStore = create((set, get) => ({
    amountOfCharacters: 0,
    amountOfPages: 1,
    // Все полученные персонажи
    characters: [],
    // Персонажи для вывода в соответствии с фильтрами
    charactersToDisplay: [],
    // Выбранный персонаж для отображения детальной информации
    chosenCharacterId: 0,
    setChosenCharacterId: (value) => set(() => ({ chosenCharacterId: value })),
    // Флаг о том, что получить больше персонажей невозможно
    isCharactersEnded: false,
    // Опции для фильтрации по цвету глаз
    filterOptionsColorEye: ['All', 'blue', 'yellow', 'red', 'brown', 'blue-gray', 'black', 'orange', 'hazel', 'pink', 'red, blue', 'gold', 'green, yellow', 'white'],
    // Выбранный фильтр
    chosenOptionColorEye: 'All',
    setFilterOptionsColorEye: (value) => set(() => ({ chosenOptionColorEye: value })),
    // Ошибка
    error: null,
    // Открыта ли карточка персонажа
    isDetailsOpen: false,
    setIsDetailsOpen: (value) => set(() => ({ isDetailsOpen: value })),
    // Функция для фильтрации персонажей по цвету глаз
    filterCharactersByEyeColor: () => {
        set((state) => ({
            charactersToDisplay: state.chosenOptionColorEye === 'All'
                ? state.characters
                : state.characters.filter(character => character.eye_color === state.chosenOptionColorEye)
        }));
    },
    // Получение данных о количестве персонажей и количестве страниц
    fetchAmountOfCharacters: async () => {
        try {
            const response = await fetch(`https://www.swapi.tech/api/people`);
            const data = await response.json();
            set({ 
                amountOfCharacters: data.total_records,
                amountOfPages: data.total_pages,
            });
        } catch (err) {
            set({ error: err });
        }
    },
    // Получение данных о персонажах
    fetchCharacters: async (page) => {
        try {
            if (page > get().amountOfPages) return;
            const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
            const data = await response.json();
            if (data.next === null) {
                set({ isCharactersEnded: true });
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

            get().filterCharactersByEyeColor();
            return data;
            
        } catch (err) {
            set({ error: err });
        }
    },
    // Очистка ошибки
    clearError: () => set({ error: null }),
}));