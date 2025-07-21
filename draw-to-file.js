import fs from 'fs'

function getSquare(size) {
    let str = '*'.repeat(size) + '\n'
    for (let i = 0; i < size - 2; i++) {
        str += '*' + ' '.repeat(size - 2) + '*\n'
    }
    str += '*'.repeat(size) + '\n'
    return str
}

function writeToFile(str) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./data/pic.txt', str, 'utf8', (err) => {
            if (err) return reject('Failed to write file')
            resolve()
        })
    })
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function drawSquareToFile() {
    const str = getSquare(getRandomIntInclusive(3, 20))
    writeToFile(str)
        .then(() => setTimeout(drawSquareToFile, 200))
        .catch(err => console.error(err))
}

drawSquareToFile()
