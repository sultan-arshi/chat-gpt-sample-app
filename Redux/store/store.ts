import { createStore, combineReducers } from 'redux';
import chatReducer from '../reducer/reducer';
import {persistReducer,persistStore} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: "root",
    storage,
    whitelist:['chat']
}

const rootReducer = combineReducers({
    chat: chatReducer,
});

const persistedReducer = persistReducer(persistConfig,rootReducer)

const configureStore = () => {
    return createStore(persistedReducer);
    
}

export const store =configureStore ();
export const persistor = persistStore(store)
export default configureStore;

