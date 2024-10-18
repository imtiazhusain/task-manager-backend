import express from 'express'
import morgan from 'morgan'
import connectDB from './config/db'
import globalErrorHandler from './middlewares/errors/errorHandler'
import userRoutes from './routes/user.routes'
import tasksRoutes from './routes/tasks.routes'
import {PORT} from './config/envConfig'
import cors from 'cors'
const app = express()


app.use(express.json())
app.use(morgan('tiny'))
app.disable('x-powered-by')
app.use(cors())
connectDB()




// Routes
app.use('/api/user',userRoutes)
app.use('/api/tasks',tasksRoutes)

// all routes that does not match then this will be called but commented for deployment purpose because of we send index.html file if no path matched
app.use("/api*", (req, res) => {
  res.status(404).json({ status: "ERROR", message: "Invalid api endpoint" });
});
 // Global error handler
 app.use(globalErrorHandler);



app.listen(PORT,()=>{
console.log(`app is listening at http://localhost:${PORT}`)
})