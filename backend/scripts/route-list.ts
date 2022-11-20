import listEndpoints from 'express-list-endpoints'
import Application from '../src/app'

const app = Application()

console.table(listEndpoints(app))
