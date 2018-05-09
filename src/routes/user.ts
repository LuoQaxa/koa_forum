import { loginController, regsiterController } from "../controller/user";
import * as Router from "koa-router";
let router = new Router()
router.post('/login', loginController)
router.post('/register', regsiterController)

export default router;

