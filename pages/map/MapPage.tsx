import axios from "axios";
import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import MapView, {AnimatedRegion, Marker} from "react-native-maps";
import {useSelector} from "react-redux";
import {createSelector} from "reselect";
import {getData} from "../../store/data";

import {styles} from "./MapPage.style";

const data = createSelector(
  (state: any) => state.data,
  (data) => data
);

export function MapPage() {
  const [region, setRegion] = useState({
    latitude: 45.695908,
    longitude: 21.894043,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    console.log("data");
    getData();
  }, []);

  const datele = useSelector((state: any) => data(state.data));
  console.log(datele);
  setInterval(() => {
    getData();
  }, 10000);

  // const data = firebase.default.firestore().collection("data");
  // console.log("data");
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aplicatie Nevazatori</Text>
      <MapView style={styles.map} region={region} onRegionChange={setRegion}>
        <Marker
          ref={(marker) => {
            marker = marker;
          }}
          coordinate={region}
        />
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}
