import fs from 'fs'
import https from 'https'

function readJsonFile(path) {
    const raw = fs.readFileSync(path, 'utf8')
    return JSON.parse(raw)
}

function download(url, destPath) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            if (res.statusCode !== 200) return reject('Failed: ' + res.statusCode)
            const fileStream = fs.createWriteStream(destPath)
            res.pipe(fileStream)
            fileStream.on('finish', () => fileStream.close(resolve))
        }).on('error', reject)
    })
}

function getCountries() {
    const allCountries = readJsonFile('./countries.json')
    allCountries.sort((a, b) => b.population - a.population)
    return allCountries.slice(0, 5)
}

function downloadFlags(countries) {
    const prms = countries.map(country => {
        return download(
            country.flags.svg,
            `./data/flags/${country.name.common}.svg`
        )
    })
    return Promise.all(prms)
}

function downloadCountryFlags() {
    const countries = getCountries()
    console.log('Countries:', countries.map(c => c.name.common))
    downloadFlags(countries)
        .then(() => {
            console.log('Your flags are ready')
        })
        .catch(err => console.error('Error downloading flags:', err))
}

downloadCountryFlags()
