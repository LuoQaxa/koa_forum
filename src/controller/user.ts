import { getRepository } from "typeorm";
import user_dao from '../dao/user_service'
import * as jwt from 'jsonwebtoken'
// 获取请求头headers.authorization上的token值
// function getJWTPayload(token) {
//   // 验证并解析jwt,返回一个对象
//   return jwt.verify(token.split(' ')[1], secret)
// }
// payload = getJWTPayload(ctx.headers.authorization)

//设置jwt密钥 
const secret = 'forum_secret';

function getToken(payload = {}) {
  return jwt.sign(payload, secret, {expiresIn: '4h'} )
}

const loginController = async (ctx: any, next: object) => {
  let payload = ctx.request.body;
  const result:any = await user_dao.find_user(payload);  
  if (result) {
    if (result.password === payload.password) {
      ctx.status = 200;
      ctx.body = {
        id: result.id,
        name: result.name,
        token: getToken(payload)
      }
    }
  } else {
    ctx.status = 400;
    ctx.body = {
      error: '用户没找到'
    }
  }
}

// 注册成功是否
const regsiterController = async (ctx: any, next: object) => {
  let payload = ctx.request.body;
  const result = await user_dao.add_new_user(payload)
  if (result) {
    ctx.status = 200
  } else {
    ctx.status = 400
  }
}


export {
  loginController,
  regsiterController
}