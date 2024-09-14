const fs = require('fs');

const WriteFile = () => {
    const data = 'Do in two ways'
    return new Promise((resolve) => {
        fs.writeFile("2-counter.md", data, (err) => {
            resolve(data);
        });
    })
}


const main = async () => {
    const value = await WriteFile();
    console.log(value);
}

main();