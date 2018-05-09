# koa_forum
使用koa，typescript搭建一个论坛网站的后端

#### 初始化项目
1. typescript配置：`tsc -init`生成`.tsconfig.json`来配置当前项目。参考:https://segmentfault.com/a/1190000007574276
2. 安装依赖包,使用`yarn install`代替`npm install`

#### 搭建基础服务，连接数据库
1. 利用typeorm映射服务器
2. 利用typeorm实现基础的增删改查 参考:https://github.com/typeorm/typeorm
  ```
    <!-- 新增 -->
    let photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.filename = "photo-with-bears.jpg";
    photo.views = 1;
    photo.isPublished = true;

    let photoRepository = connection.getRepository(Photo);

    await photoRepository.save(photo);
    console.log("Photo has been saved");

    <!-- 查看 -->
    let savedPhotos = await photoRepository.find();
    console.log("All photos from the db: ", savedPhotos);

    <!-- 修改 -->
    let photoToUpdate = await photoRepository.findOne(1);
    photoToUpdate.name = 'me, my friends adn polar bears'
    await photoRepository.save(photoToUpdate)

    <!-- 删除 -->
    let photoToRemove = await photoRepository.findOne(1);
    await photoRepository.remove(photoToRemove);

  ```

  #### 登陆注册
  1. jwt用户认证
    需要用到的包`jsonwebtoken`（用于签发，解析token），`koa-jwt`(路由权限控制)
  2. 跨域`koa2-cors`，只需要这个中间件就可以搞定, 具体干了一件啥事，不是很清除
  3. `ctx.request.body` 为什么是undefined。需要一个中间件 `koa-bodyparser`来将post的数据进行解析。
