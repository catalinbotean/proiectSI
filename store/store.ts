import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";

import {apiFactory} from "../api/api";

import reducers from "./root";

const api = apiFactory();
const middlewares = [thunk.withExtraArgument({api})];
let enhancer = applyMiddleware(...middlewares);

const store = createStore(reducers, enhancer);

export {api, store};
