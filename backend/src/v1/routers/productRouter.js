const express = require("express");


const router = express.Router();

router.route("/product/:params").post(
    (req, res) => {
        console.log(req.query);
        res.json({test: req.paramss});
    }
)
module.exports = router;