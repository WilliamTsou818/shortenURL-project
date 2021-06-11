const express = require('express')
const router = express.Router()
const URL = require('../../models/url')
const { urlInputValidation, randomUrlCode } = require('../../public/javascripts/utility')

router.get('/', (req, res) => {
  res.render('index')
})


router.post('/', (req, res) => {
  const inputURL = req.body.originURL.trim()
  const urlValidation = !urlInputValidation(inputURL)
  if(urlValidation) return res.render('index', { urlValidation, inputURL })

  URL.find()
    .lean()
    .then(urlData => {
      let shortenURL = urlData.find(url => url.originURL === inputURL)
      if (shortenURL) {
        shortenURL = shortenURL.shortenURL
        return res.render('index', { shortenURL, inputURL })
      } else {
        let newCode = randomUrlCode()
        while (urlData.some(url => url.urlCode === newCode)) {
          newCode = randomUrlCode()
        }
        shortenURL = `http://localhost:3000/${newCode}`
        
        return URL.create({
          originURL: inputURL,
          shortenURL: shortenURL,
          urlCode: newCode
        })
          .then(() => res.render('index', { shortenURL, inputURL }))

      }
      
    })
})

router.get('/:id', (req, res) => {
  const urlCode = req.params.id
  return URL.findOne({ urlCode })
    .lean()
    .then(url => res.redirect(url.originURL))
    .catch(err => console.error(err))
})

module.exports = router