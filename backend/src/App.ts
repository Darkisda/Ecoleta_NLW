import express from 'express'
import path from 'path'
import cors from 'cors'

import routes from './routes'

class App {
    
    public express: express.Application
    
    constructor(){
        this.express = express()

        this.middlewares()
        this.routes()
    }

    public middlewares() {
        this.express.use(express.json())
        this.express.use(cors())
    }

    private routes() {
        this.express.use(routes)
        this.express.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
    }
}

export default new App().express