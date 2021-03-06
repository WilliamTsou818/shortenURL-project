const express = require('express')
const router = express.Router()
const URL = require('../../models/url')
const { urlInputValidation, randomUrlCode } = require('../../public/javascripts/utility')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', async (req, res) => {
  const inputURL = req.body.originURL.trim()
  const urlValidation = !urlInputValidation(inputURL)
  if (urlValidation) return res.render('index', { urlValidation, inputURL })
  // check if input url is existed
  let shortenURL
  const url = await URL.findOne({ originURL: inputURL }).lean()
  if (url) {
    shortenURL = url.shortenURL
    return res.render('index', { shortenURL, inputURL })
  }
  // generate new url code
  let urlCode = randomUrlCode()
  const urlCodeArr = await URL.find().distinct('urlCode').lean()
  while (urlCodeArr.includes(urlCode)) {
    urlCode = randomUrlCode()
  }

  if (req.headers.host === 'localhost:3000') {
    shortenURL = `http://${req.headers.host}/${urlCode}`
  } else {
    shortenURL = `https://${req.headers.host}/${urlCode}`
  }

  return URL.create({
    originURL: inputURL,
    shortenURL,
    urlCode
  })
    .then(() => res.render('index', { shortenURL, inputURL }))
})

router.get('/:id', (req, res) => {
  const urlCode = req.params.id
  if (urlCode === 'favicon.ico') return res.redirect('/')
  return URL.findOne({ urlCode })
    .lean()
    .then(url => {
      if (!url) {
        req.flash('error_messages', '該短網址不存在')
        return res.redirect('/')
      }
      res.redirect(url.originURL)
    })
    .catch(err => console.error(err))
})

module.exports = router
