import React from "react";
import {Provider} from "react-redux";

import {MapPage} from "./pages";

import {store} from "./store/store";

export default function App() {
  return (
    // <SafeAreaProvide>
    <Provider store={store}>
      <MapPage />
    </Provider>
    // </SafeAreaProvide>
  );
}
