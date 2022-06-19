import listEndpoints from 'express-list-endpoints'
import app from '../app/index'

console.table(listEndpoints(app))
