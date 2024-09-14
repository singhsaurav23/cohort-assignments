import { atom } from 'recoil';

export const TodoState = atom({
    key: 'todoState',
    default: [], // Initialize as an empty array
});

export const filterState = atom({
    key: 'filterState',
    default:''
});
export const filtersState = atom({
    key: 'filtersState',
    default: []
});