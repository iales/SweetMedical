const express = require('express');
const router = express.Router();

router.route("/healthcheck")
    .get((req, res) => {
    res.status(200);
    res.json({status: "El servidor está funcionando correctamente"});
});



module.exports = router;