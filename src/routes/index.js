const userRouter = require('./UserRoute')

const routes = (app) => {
    app.use('/user', userRouter)
}
module.exports = routes
