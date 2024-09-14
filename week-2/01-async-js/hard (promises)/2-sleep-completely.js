/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

const Sleepy = (milliseconds) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
}

const main = async (milliseconds) => {
    const val = await Sleepy(milliseconds);
    return val;
}

function sleep(milliseconds) {
    return main(milliseconds);
}

module.exports = sleep;
