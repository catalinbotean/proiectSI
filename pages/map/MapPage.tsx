import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView, { AnimatedRegion, Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { getData, selectGPSData } from "../../store/data";
import { styles } from "./MapPage.style";

export function MapPage() {
  const [region, setRegion] = useState({
    latitude: 45.695908,
    longitude: 21.894043,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const dataInfo = useSelector((state: ApplicationState) =>
    selectGPSData(state.GPS.dataGPS)
  );

  React.useEffect(() => {
    dispatch(getData());
  }, []);
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
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
