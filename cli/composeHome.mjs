/*
  Extract data from config.js and with index-tpl.html compose a static index.html
  The script return the pageName to Bash
*/

import fs from 'fs'
import slugify from './slugify.mjs'
import readConfig from './readConfig.mjs'

const composeHome = config =>
  fs.readFile('tpl-header.html', 'utf8', (err, header) => {
    if (err) throw err
    fs.readFile('tpl-style.html', 'utf8', (err, style) => {
      if (err) throw err
      fs.readFile('tpl-home.html', 'utf8', (err, html) => {
        if (err) throw err
        const galleriesHtml = composeGalleries(config)
        const home = header + style + html.replace('${galleries}', galleriesHtml)
        writeHome(home)
      })
    })
  })

readConfig(composeHome)

const writeHome = content =>
  fs.writeFile('index.html', content, 'utf8', err => {
    if (err) throw err
  })

const composeGalleries = config =>
  config.map(galleryData => composeGallery(galleryData)).join('')

const composeGallery = data => {
  const {title, description, img} = data
  return `
      <figure class="img">
        <a href="/galleries/${slugify(title)}.html" class="gallery">
          <img src="./light-thumbs/thumb-${img}.jpg" alt="${title}">
        </a>
        <figcaption itemprop="caption description">${description}</figcaption>
        <h3>${title}</h3>
      </figure>
  `
}
