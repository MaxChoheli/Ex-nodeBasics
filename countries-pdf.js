import fs from 'fs'
import PDFDocument from 'pdfkit-table'

const countriesRaw = fs.readFileSync('./countries.json', 'utf8')
const countries = JSON.parse(countriesRaw)

countries.sort((a, b) => a.name.common.localeCompare(b.name.common))

const table = {
    title: 'Countries',
    subtitle: 'Sorted by name',
    headers: ['Name', 'Capital', 'Population'],
    rows: countries.map(country => [
        country.name.common,
        country.capital?.[0] || '—',
        country.population.toLocaleString()
    ])
}

const doc = new PDFDocument({ margin: 30, size: 'A4' })
doc.pipe(fs.createWriteStream('./countries.pdf'))

doc.table(table, { columnsSize: [200, 150, 150] })
    .then(() => doc.end())
