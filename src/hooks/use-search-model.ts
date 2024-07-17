import { create } from "zustand";


export type SearchQueryType = {
    country: string | undefined;
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    guests: Number;
    bathrooms: Number;
    bedrooms: Number;
    category: string;
};

interface SearchModalStore {
    isOpen: boolean;
    step: string;
    open: (step: string) => void;
    close: () => void;
    query: SearchQueryType;
    setQuery: (query: SearchQueryType) => void;
};

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    step: "",
    open: (step) => set({ isOpen: true, step: step }),
    close: () => set({ isOpen: false }),
    query: {
        country: "",
        checkIn: undefined,
        checkOut: undefined,
        guests: 1,
        bathrooms: 0,
        bedrooms: 0,
        category: "",
    },
    setQuery: (query: SearchQueryType) => set({ query: query })
}));

export default useSearchModal;