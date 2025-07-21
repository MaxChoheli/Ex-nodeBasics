import fs from 'fs'

export function sumFromFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return reject('Could not read file')

            const lines = data.split(/\r?\n/)
            const numbers = lines.map(line => Number(line.trim()))
            const sum = numbers.reduce((acc, num) => acc + num, 0)
            resolve(sum)
        })
    })
}
sumFromFile('./data/nums.txt')
    .then(sum => console.log('Sum:', sum))
    .catch(err => console.log('Error:', err))
