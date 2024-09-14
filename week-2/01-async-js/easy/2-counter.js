let i = 0;

/*CODE-1
let curr = Date.now();
while (true) {
    if (Date.now() - curr == 1000) {
        console.log("Timer " + ++i);
        curr = Date.now();
    }
}*/

const timer = () => {
    console.log("Timer " + i++);
    setTimeout(timer, 1000)
}

timer ();