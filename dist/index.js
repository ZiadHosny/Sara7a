import express from "express";
import path from "path";
import dotenv from 'dotenv';
import flash from 'connect-flash';
import session from 'express-session';
import mongodbSession from 'connect-mongodb-session';
import { getFromEnv } from "./utils/getFromEnv.js";
import userRouter from "./modules/user/user.router.js";
import messageRouter from "./modules/message/message.router.js";
import { connectToMongoDb } from "./database/connectToMongo.js";
import { logBlueMsg, logErrMsg } from "./utils/console/log.js";
import invaildRouter from "./modules/invaildRouter.js";
import { globalError } from "./middleware/globalError.js";
import homeRouter from "./modules/homeRouter.js";
dotenv.config();
const { port, baseUrl, mongoDBUrl } = getFromEnv();
const app = express();
const MongoDBStore = mongodbSession(session);
const store = new MongoDBStore({
    uri: mongoDBUrl,
    collection: 'mySessions'
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store,
}));
app.use(flash());
app.set('view engine', 'ejs');
app.use(express.static(path.resolve() + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use('/', userRouter);
app.use('/messages', messageRouter);
app.get('/', homeRouter);
app.use('*', invaildRouter);
app.use(globalError);
connectToMongoDb();
app.listen(port, baseUrl, () => logBlueMsg(`Sara7a App listening on port ${port}!`));
process.on('unhandledRejection', (err) => {
    logErrMsg("unhandledRejection" + err);
});
