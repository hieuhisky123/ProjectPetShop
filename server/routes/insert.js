const router = require("express").Router();
const ctrls = require("../controllers/insertData");

router.post("/", ctrls.insertProduct);

module.exports = router;
