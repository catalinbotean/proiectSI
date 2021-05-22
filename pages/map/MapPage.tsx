import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import {ScrollView, Text, TouchableOpacity, View, Image} from "react-native";
import MapView, {AnimatedRegion, Marker, Polyline} from "react-native-maps";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {
  getData,
  refetchData,
  selectDaysWithWalks,
  selectLastGPSData,
} from "../../store/data";

import {styles, MapStyle} from "./MapPage.style";

export function MapPage() {
  const dataInfo = useSelector((state: ApplicationState) =>
    selectLastGPSData(state.GPS.dataGPS)
  );
  const [region, setRegion] = useState({
    latitude: dataInfo.location.latitude,
    longitude: dataInfo.location.longitude,
    latitudeDelta: 0.006,
    longitudeDelta: 0.006,
  });

  const dispatch = useDispatch();

  const informatii = useSelector((state: ApplicationState) =>
    selectDaysWithWalks(state.GPS.dataGPS)
  );

  console.log(informatii);

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
      <View style={styles.header}>
        <Image source={require("./logo.png")} style={styles.logo} />
        <Text style={styles.text}>
          <Text style={styles.orangeText}>BLIND</Text>Helper
        </Text>
      </View>
      <View style={styles.orangeView}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChange={setRegion}
          customMapStyle={MapStyle}
          zoomEnabled
          mapType="mutedStandard"
        >
          <Marker coordinate={region} />
        </MapView>
      </View>
      {/* <ScrollView contentContainerStyle={styles.scrollContent}> */}
      {/* {dataInfo.map((value, index) => ( */}
      <View style={styles.lowerView}>
        <View style={styles.boxView}>
          <Text style={styles.item}>
            Last seen on:
            {/* {dataInfo.location.latitude},{dataInfo.location.longitude},{" "}
            {dataInfo.hour} */}
          </Text>
          <View style={styles.infoView}>
            <Text style={styles.infoText}>
              Latitude: {dataInfo.location.latitude}
            </Text>
            <Text style={styles.infoText}>
              Longitude: {dataInfo.location.longitude}
            </Text>
            <Text style={styles.infoText}>Hour: {dataInfo.hour}</Text>
          </View>
        </View>
      </View>
      {/* ))} */}
      {/* </ScrollView> */}
      <StatusBar style="auto" />
    </View>
  );
}
