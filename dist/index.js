"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Koa = require("koa");
var bodyParser = require("koa-bodyparser");
var cors = require("koa2-cors");
// import { AppRoutes } from "./routes";
var user_1 = require("./routes/user");
// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
typeorm_1.createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "koa_forum",
    entities: [
        __dirname + '/entity/*.js'
    ],
    synchronize: true
}).then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
    var app, secret;
    return __generator(this, function (_a) {
        app = new Koa();
        secret = 'forum_secret';
        // register all application routes
        // AppRoutes.forEach(route => router[route.method](route.path, route.action));
        // run app
        app.use(bodyParser());
        // 1.token验证异常时候处理
        // app.use((ctx, next) => {
        //   return next().catch( err => {
        //     if (err.status === 401) {
        //       ctx.status = 401;
        //       ctx.body = {
        //         ok: false,
        //         msg: 'token失效'
        //       }
        //     } else {
        //       throw err;
        //     }
        //   })
        // })
        // // 2.路由权限控制,设置哪些路由不需要token认证访问
        // app.use(jwtKoa({ secret: secret }).unless({
        //   path: [
        //     '/login',
        //     '/register'
        //   ]
        // }))
        app.use(cors());
        app.use(user_1.default.routes());
        app.listen(3000);
        console.log("Koa application is up and running on port 3000");
        return [2 /*return*/];
    });
}); }).catch(function (error) { return console.log("TypeORM connection error: ", error); });
//# sourceMappingURL=index.js.map