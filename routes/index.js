const express = require('express');
const router = express.Router();

const Url = require('../models/url');


router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ shortID: req.params.code });

    if (url) {
      return res.redirect(url.redirectURL);
    } else {
      return res.status(404).json('NO URL FOUND');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('SERVER ERROR');
  }
});

module.exports = router;