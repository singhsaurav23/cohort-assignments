import { selector } from 'recoil';
import { TodoState, filterState } from './atom.js';

export const filterSelector = selector({
    key: 'filterSelector',
    get: ({ get }) => {
        const Todos = get(TodoState);
        const filters = get(filterState);

        return Todos.filter(x => x.title.includes(filters) || x.description.includes(filters))
    }
})