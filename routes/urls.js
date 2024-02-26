const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const Url = require('../models/url');


router.post('/generateshortURL', async (req, res) => {
  const { redirectURL } = req.body;
  const baseUrl = config.get('BaseURL');

  
  // ShortID Generation
  const shortID = shortid.generate();

  // Main URL Validation
  if (validUrl.isUri(redirectURL)) {
    try {
      let url = await Url.findOne({ redirectURL});

      if (url) {
        res.json(url);
      } else {
        const shortURL = baseUrl + '/' + shortID;

        url = new Url({
          redirectURL,
          shortURL,
          shortID,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('SERVER ERROR');
    }
  } else {
    res.status(401).json('INVALID URL GIVEN');
  }
});

module.exports = router;
