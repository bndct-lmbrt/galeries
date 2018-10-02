/*
  Extract data from config.js and with index-tpl.html compose a static index.html
  The script return the pageName to Bash
*/

import fs from 'fs'
import slugify from './slugify.mjs'
import readConfig from './readConfig.mjs'

readConfig(composeGallery)

function composeGallery(config) {
  fs.readFile('tpl-header.html', 'utf8', (err, header) => {
    if (err) throw err
    fs.readFile('tpl-style.html', 'utf8', (err, style) => {
      if (err) throw err
      fs.readFile('tpl-gallery.html', 'utf8', (err, html) => {
        if (err) throw err
        fs.readFile('data.json', 'utf8', (err, data) => {
          config.map(galleryData => {
            let htmlGallery = '<div class="fish">'
            htmlGallery += JSON.parse(data)
              .filter(metas =>
                slugify(JSON.stringify(metas)).indexOf(slugify(galleryData.title)) !== -1
              )
              .sort((a, b) => (a.Fr > b.Fr) ? 1 : ((b.Fr > a.Fr) ? -1 : 0) )
              .map((metas, index) => {
                const img = {}
                const fishname = {}
                const [width, height] = metas.imageSize.split('x')

                function fishnametoAnchor(fishname) {
                  try {
                    return fishname.split(' ')
                      .map(word => `<a href="/galleries/#${slugify(word)}">${word}</a>`)
                      .join(' ')
                  } catch (err) {
                    return '-'
                  }
                }

                img.width = +width > +height ? '300px' : '133px'
                img.height = '200px'
                fishname.fr = fishnametoAnchor(metas.Fr)
                fishname.lat = fishnametoAnchor(metas.Lat)
                return `
      <figure class="img" itemprop="associatedMedia" itemscope="" itemtype="http://schema.org/ImageObject">
        <a data-caption="${metas.Fr} - <i>${metas.Lat}</i>" itemprop="contentUrl" data-size="${metas.targetImageSize}" href="${metas.fileName.img}">
          <img itemprop="thumbnail" alt="${metas.Fr} - ${metas.Lat}" data-id="${index}" src="${metas.fileName.thumbnail}" style="width: ${img.width}; height: ${img.height};" title="${metas.title}">
        </a>
        <figcaption itemprop="caption description">${fishname.fr}</figcaption>   
        <h3>${fishname.lat}</h3>
      </figure>
            `} 
            )
            .join()
            htmlGallery += '</div>'
            const galleryPage = header + style + html.replace('${photos}', htmlGallery)
            writeGallery(`galleries/${slugify(galleryData.title)}.html`, galleryPage)
          })
        })
      })
    })
  })
}

function writeGallery(name, content) {
  fs.writeFile(name, content, 'utf8', err => {
    if (err) throw err
  })
}

function composeGalleries(config) {
  return config.map(galleryData => composePhoto(galleryData)).join('')
}

function composePhoto(data) {
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
