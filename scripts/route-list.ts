import listEndpoints from 'express-list-endpoints'
import app from '../src/app/index'

console.table(listEndpoints(app))
