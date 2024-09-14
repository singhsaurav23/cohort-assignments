"use strict";
const func = (fn) => {
    setTimeout(fn, 1000);
};
func(() => {
    console.log('Hi');
    return 5;
});
