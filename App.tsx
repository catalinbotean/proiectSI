import React from "react";
import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {HistoryPage, MapPage} from "./pages";

import {store} from "./store/store";

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "#342D73",
            inactiveTintColor: "black",
          }}
        >
          <Tab.Screen name="Home" component={MapPage} />
          <Tab.Screen name="History" component={HistoryPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
