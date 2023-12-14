import express from "express"
import cors from 'cors'
import { getFromEnv } from "./src/utils/getFromEnv.js"
import userRouter from "./src/modules/user/user.router.js"
import messageRouter from "./src/modules/message/message.router.js"
import { connectToMongoDb } from "./src/database/connectToMongo.js"
import { logBlueMsg, logErrMsg } from "./src/utils/console/log.js"
import baseRouter from "./src/modules/baseRouter.js"
import invalidRouter from "./src/modules/invalidRouter.js"
import { globalError } from "./src/middleware/globalError.js"
import * as path from "path"

const { port, mode } = getFromEnv()

connectToMongoDb()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', baseRouter)
app.use('/api/users', userRouter)
app.use('/api/messages', messageRouter)


if (mode === 'prod') {
    const __dirname = path.resolve();

    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}

app.use('*', invalidRouter)

app.use(globalError)

app.listen(port, () => logBlueMsg(`Sara7a Api listening on port ${port}!`))

process.on('unhandledRejection', (err) => {
    logErrMsg("unhandledRejection" + err)
})