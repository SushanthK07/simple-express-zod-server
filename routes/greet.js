const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Hello " + req.query.name);
});

module.exports = router;
