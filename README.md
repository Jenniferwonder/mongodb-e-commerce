## 项目介绍 Project Brief

This is an e-commerce website using MongoDB, Next.js and TailwindCSS, following along [MongoDB Jumpstart Series](https://github.com/mongodb-developer/jumpstart-series) for learning the following skills.

- Use MongoDB with MongoDB Atlas
- Run MongoDB locally and connect it to front-end project

Fix deprecated function problems in the original project:

- Fix error in using async function in `useEffect`
- Replace deprecated attributes in `next/image`
- Fix infinite loop and routing error in implementing search and autocomplete functions with `next/router`

## 效果展示 Demo

[MongoDB-e-commerce-site](https://cdn.nlark.com/yuque/0/2023/png/29677165/1679381919689-16977b88-5fe7-4f04-bbd8-bd95c569a42e.png?x-oss-process=image%2Fresize%2Cw_750%2Climit_0)

## 如何使用 How to use

### e-commerce-atlas

1. Sign up and create a database in MongoDB Atlas
   [Log in | MongoDB](https://cloud.mongodb.com/v2/6417bb52bfb15d1d8f3fe4e3#/clusters)
2. run `npm i`
3. create `env.local` file in the project root folder and fill in your database app id `NEXT_PUBLIC_REALM_APP_ID=<Your Realm App ID>`
4. Download sample data from [GitHub - mongodb-developer/jumpstart-series at compass](https://github.com/mongodb-developer/jumpstart-series/tree/compass) and import to your cluster database
5. run `npm run dev` to start developing the project with your remote MongoDB database

## 待办 TODO

### e-commerce-local

- [] Connect Frontend App with local MongoDB Database

## 参考资料 Reference

[MongoDB Jumpstart Series](https://github.com/mongodb-developer/jumpstart-series)
[MongoDB: The Developer Data Platform | MongoDB](https://www.mongodb.com/)
