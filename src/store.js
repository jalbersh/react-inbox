// src/store.js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './Reducers'
import logger from 'redux-logger'

const initialState = {}
const middleware = [
  logger,
  thunk,
]

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
)

export default store