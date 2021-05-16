import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import MapView, {AnimatedRegion, Marker} from "react-native-maps";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {
  getData,
  refetchData,
  selectDays,
  selectGPSData,
} from "../../store/data";
import {styles} from "./MapPage.style";

export function MapPage() {
  const [region, setRegion] = useState({
    latitude: 45.695908,
    longitude: 21.894043,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const dispatch = useDispatch();
  const dataInfo = useSelector((state: ApplicationState) =>
    selectGPSData(state.GPS.dataGPS)
  );

  const informatii = useSelector((state: ApplicationState) =>
    selectDays(state.GPS.dataGPS)
  );

  React.useEffect(() => {
    dispatch(getData());
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      dispatch(refetchData());
    }, 20000);
    return () => clearInterval(interval);
  }, []);

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
      {/* <ScrollView contentContainerStyle={styles.scrollContent}> */}
      {/* {dataInfo.map((value, index) => ( */}
      <Text style={styles.item}>
        {dataInfo.location.latitude},{dataInfo.location.longitude},{" "}
        {dataInfo.hour}
      </Text>
      {/* ))} */}
      {/* </ScrollView> */}
      <StatusBar style="auto" />
    </View>
  );
}
