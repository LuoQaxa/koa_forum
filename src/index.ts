import "reflect-metadata";
import { createConnection } from "typeorm";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as cors from 'koa2-cors';
import * as jwtKoa from 'koa-jwt';
// import { AppRoutes } from "./routes";
import userRoutes from "./routes/user";


// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
createConnection({
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
}).then(async connection => {

  // create koa app
  const app = new Koa();
  // const router = new Router();

  // register all application routes
  // AppRoutes.forEach(route => router[route.method](route.path, route.action));


  // run app
  app.use(bodyParser());  

  // 1.token验证异常时候处理
  app.use((ctx, next) => {
    return next().catch( err => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          ok: false,
          msg: 'token失效'
        }
      } else {
        throw err;
      }
    })
  })

  // 2.路由权限控制,设置哪些路由不需要token认证访问
  app.use(jwtKoa({ secret: secret }).unless({
    path: [
      '/login',
      '/register'
    ]
  }))

  app.use(cors())
  app.use(userRoutes.routes());
  
  app.listen(3000);

  console.log("Koa application is up and running on port 3000");

}).catch(error => console.log("TypeORM connection error: ", error));