// Создаем (store) при помощи ф.(createStore) из библ.(Redux) -->
//и передаем в нее закомбайненые редьюсеры

import { applyMiddleware, createStore, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import reducers from "./reducers"

// 2 строки ниже используем при юзании расширения для браузера (Redux DevTools)
// Если расширение не используем, то юзаем закомментированную (const store) ниже.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

//const store = createStore(reducers, applyMiddleware(thunkMiddleware))
window.store = store
export default store
