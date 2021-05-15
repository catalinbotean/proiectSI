import {combineReducers} from "redux";

import {initialState as Pokemons} from "./data/index";
import data from "./data/reducer";

const appReducer = combineReducers({
  data: combineReducers({
    data,
  }),
});

function rootReducer(state: any, action: any) {
  return appReducer(state, action);
}

export default rootReducer;
