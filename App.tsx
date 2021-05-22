import React from "react";
import {Provider} from "react-redux";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {HistoryPage, MapPage} from "./pages";

import {store} from "./store/store";
import {StatusBar} from "expo-status-bar";

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <StatusBar style="auto" /> */}
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
