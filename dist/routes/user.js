"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../controller/user");
var Router = require("koa-router");
var router = new Router();
router.post('/login', user_1.loginController);
router.post('/register', user_1.regsiterController);
exports.default = router;
//# sourceMappingURL=user.js.map