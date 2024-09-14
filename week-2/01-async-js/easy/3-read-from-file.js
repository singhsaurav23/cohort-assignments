const fs = require('fs');

const ReadFile = () => {
    return new Promise((resolve) => {
        fs.readFile("1-counter.md", "utf-8", (err, data) => {
            resolve(data);
        });
    })
}


const main = async () => {
    const value = await ReadFile();
    console.log(value);
}

main();