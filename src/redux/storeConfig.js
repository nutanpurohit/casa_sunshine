import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import {rootReducer} from './reducers'
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
    whitelist:["user"]
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return {store, persistor}
}

