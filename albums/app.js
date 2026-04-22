import 'dotenv/config'
import express from 'express'
import { MONGODB_URI } from './utils/config.js'
import connectMongoDB from './db/mongodb.js'

const app = express()

import router from './routes/albums.js'

app.use(express.json())

app.use('/api/albums', router)

await connectMongoDB(MONGODB_URI)

export default app