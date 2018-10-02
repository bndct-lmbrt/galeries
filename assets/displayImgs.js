display = {}

display.test = () => console.log('TEST')

display.imgsByQuery = (query)=>  {
  const imgsSelect = ImgsDb.find(query)
  display.imgs(imgsSelect)
}

display.imgs = (imgsSelect) => {
  const area = document.querySelector('div')
  const tpl = document.querySelector('#img')

  function fishnametoAnchor(fishname) {
    try {
      return fishname.split(' ')
        .map(word => `<a href="/galleries/#${ImgsDb.slugify(word)}">${word}</a>`)
        .join(' ')
    } catch (err) {
      return '-'
    }
  }

  area.className = 'fish'
  area.innerHTML = ''
  imgsSelect.map(item => {
    let a = tpl.content.querySelector('a')
    a.href = item.fileName.img
    a.setAttribute('data-caption', `${item.Fr} - <i>${item.Lat}</i>`)
    a.setAttribute('data-size', item.targetImageSize)
    let img = tpl.content.querySelector('img')
    img.src = `${item.fileName.thumbnail}`
    img.setAttribute('data-id', area.childElementCount)
    const [width, height] = item.imageSize.split('x')
    img.style.width = +width > +height ? '300px' : '133px'
    img.style.height = '200px'
    img.title = item.title
    img.alt = `${item.Lat} - ${item.Fr}`
    let pFr = tpl.content.querySelector('figcaption')
    let pLatin = tpl.content.querySelector('h3')
    pLatin.innerHTML = fishnametoAnchor(item.Lat)
    pFr.innerHTML = fishnametoAnchor(item.Fr)
    let clone = document.importNode(tpl.content, true)
    area.appendChild(clone)
  })
}
