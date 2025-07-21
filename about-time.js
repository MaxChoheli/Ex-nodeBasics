import fs from 'fs'
import ms from 'ms'

fs.readFile('./data/times.txt', 'utf8', (err, data) => {
    if (err) return console.error('Error reading file:', err)

    const lines = data.split(/\r?\n/) // split file into lines
    lines.forEach(line => {
        if (line.trim()) {
            const milliseconds = ms(line)
            console.log(`${line} = ${milliseconds} ms`)
        }
    })
})
