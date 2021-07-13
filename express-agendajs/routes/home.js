const rootPath = require('../util/root-path');
const path = require('path');
const express = require('express');

const router = express.Router();

router.get("/",(req, res , next) =>{
res.sendFile(path.join(rootPath,"views","home.html"));
});

module.exports = router;

