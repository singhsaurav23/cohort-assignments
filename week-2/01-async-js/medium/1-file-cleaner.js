const fs = require('fs');

const ReadFile = () => {
    return new Promise((resolve) => {
        fs.readFile("file.txt", "utf-8", (err, data) => {
            resolve(data);
        });
    })
}

const WriteFile = (value) => {
    return new Promise((resolve) => {
        fs.writeFile("file.txt", value, (err) => {
            resolve(value);
        });
    })
}

const main = async () => {
    let value = await ReadFile();
    value = value.replace(/\s+/g, " "); // Replace with a single space
    value = await WriteFile(value);
    console.log(value);
}

main();
