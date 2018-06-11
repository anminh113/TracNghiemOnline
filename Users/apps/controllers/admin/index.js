var express = require('express');
var router = express.Router();

router.use("/admin/profile", require(__dirname + "/profile"));
router.use("/admin/ketquakythi", require(__dirname + "/ketquakythi"));
router.use("/admin/trangchu", require(__dirname + "/trangchu"));
router.use("/admin/cauhoinhanvien", require(__dirname + "/cauhoinhanvien"));
router.use("/admin/cauhoinhanvienchitiet", require(__dirname + "/cauhoinhanvienchitiet"));
router.use("/admin/ketquakythichitiet", require(__dirname + "/ketquakythichitiet"));
router.use("/admin/nganhangcauhoi", require(__dirname + "/nganhangcauhoi"));
router.use("/admin/nganhangcauhoichude", require(__dirname + "/nganhangcauhoichude"));
router.use("/admin/cauhoinhanvien", require(__dirname + "/cauhoinhanvien"));
router.use("/admin/quanlykythi", require(__dirname + "/quanlykythi"));
router.use("/admin/quanlykythinhanvien", require(__dirname + "/quanlykythinhanvien"));
router.use("/admin/quanlykythichitiet", require(__dirname + "/quanlykythichitiet"));
router.use("/admin/taobodethi", require(__dirname + "/taobodethi"));
router.use("/admin/taobodethichitiet", require(__dirname + "/taobodethichitiet"));
router.use("/admin/taobodethicauhoi", require(__dirname + "/taobodethicauhoi"));
router.use("/admin/capquyen", require(__dirname + "/capquyen"));
router.use("/admin/404", require(__dirname + "/404"));

module.exports = router;
