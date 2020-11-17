const router = require('express').Router()

router.get('/text/:text', async (req, res) => {
    const text = req.params.text
    try {
        const json = require('./texts/' + text + '.json')
        res.send(json.text).status(200)
    } catch (err) {
        res.send(err).status(404)
    }

})


module.exports = router