import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";

import { styles } from "./MapPage.style";

export function MapPage() {
  const [region, setRegion] = useState({
    latitude: 45.695908,
    longitude: 21.894043,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0021,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aplicatie Nevazatori</Text>
      <MapView style={styles.map} region={region} onRegionChange={setRegion}>
        <Polyline
          coordinates={[
            { latitude: 45.695632, longitude: 21.893906 },
            { latitude: 45.695719, longitude: 21.894042 },
            { latitude: 45.695774, longitude: 21.894148 },
            { latitude: 45.695842, longitude: 21.894071 },
            { latitude: 45.695908, longitude: 21.894043 },
          ]}
          strokeWidth={3}
          strokeColor="#f00"
        />
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
