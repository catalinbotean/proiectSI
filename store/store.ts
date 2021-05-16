import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import { apiFactory } from "../api/api";

import reducers from "./root";
import { ThunkDispatch } from "./types";

const api = apiFactory();
const middlewares = [thunk.withExtraArgument({ api })];
let enhancer = applyMiddleware<ThunkDispatch>(...middlewares);

const store = createStore(reducers, enhancer);

export { api, store };
