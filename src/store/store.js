import { create } from 'zustand';

export const useGeneralStore = create((set) => ({
    characters: [],
    error: null,
    fetchCharacters: async (page) => {
        try {
            const response = await fetch(`https://swapi.dev/api/people/?page=${page}`)
            const data = await response.json();
            set({ characters: data.results });
        } catch (err) {
            set({ error: err });
        }
    }
}));