import fs from 'fs'
import exiftool from 'node-exiftool'

const ep = new exiftool.ExiftoolProcess()

const extractFieldsFromKeywords = meta => {
  let keywords = []
  if (typeof meta === 'string') {
    keywords.push(meta)
  } else {
    keywords = keywords.concat(meta)
  }
  return fieldsToKeywords(keywords)
}

const fieldsToKeywords = keywords => {
  const fields = {}
  fields.keywords = []
  keywords.forEach(keyword => {
    const k = keyword || ''
    if (!k.match(/\w*:/)) {
      fields.keywords.push(k)
    } else {
      let field = k.split(':')
      fields[field[0]] = field[1].trim()
    }
  })
  return fields
}

ep.open()
  .then(() => ep.readMetadata('img/thumbs', ['-File:all']))
  .then((metas, err) => {
    const setTargetImageSize = thumbSize => {
      const x = +thumbSize.match(/([0-9]*)x([0-9]*)/)[1]
      const y = +thumbSize.match(/([0-9]*)x([0-9]*)/)[2]
      if (x > y) {
        return '2400x1600'
      } else {
        return '1060x1600'
      }
    }
    const metasClean = []
    metas.data.forEach(meta => {
      const fields = extractFieldsFromKeywords(meta.Keywords)
      fields.fileName = {
        thumbnail: meta.SourceFile.replace('img/thumbs/thumb', '/light-thumbs/thumb'),
        img: meta.SourceFile.replace('img/thumbs/thumb', '/img/img')
      }
      fields.dateCreated = meta.dateCreated || new Date('01/01/2010')
      fields.imageSize = meta.ImageSize
      fields.targetImageSize = setTargetImageSize(meta.ImageSize)
      fields.location = meta['Caption-Abstract'] || ''
      fields.title = meta.Model || []
      metasClean.push(fields)
    })
    fs.writeFile('data.json', JSON.stringify(metasClean), 'utf8', err => {
      if (err) throw err
      console.log('The file has been saved!')
    })
  })
  .then(() => ep.close())
  .catch(console.error)
