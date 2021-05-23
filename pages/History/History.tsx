import {addDays, format, subDays} from "date-fns";
import React, {LegacyRef, useEffect, useRef, useState} from "react";
import {TouchableOpacity, View, Text} from "react-native";
import MapView, {Camera, Marker, Polyline, Region} from "react-native-maps";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {MapInput, selectWalksOfDay} from "../../store/data";
import {MapStyle} from "../map/MapPage.style";

import {styles} from "./History.style";

export function HistoryPage() {
  const [date, setDate] = useState(new Date());
  const walks = useSelector((state: ApplicationState) =>
    selectWalksOfDay(state.GPS.dataGPS, format(date, "dd/MM/Y"))
  ); //array cu obiecte de tip plimbare care are startdate, endDate si coordonatele

  const [region, setRegion] = useState<Region>();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (walks) {
      setRegion({
        latitude: walks[0].walk[0].latitude,
        longitude: walks[0].walk[0].longitude,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
      });
    } else {
      setError(true);
    }
  }, [walks]);

  walks?.forEach((e) => {
    console.log(e.startHour, " ", e.endHour, " ", e.walk.length);
  });

  function goNextDay() {
    setDate(addDays(new Date(date), 1));
  }

  function goPreviousDay() {
    setDate(subDays(new Date(date), 1));
  }

  function zoomIn() {
    setRegion((prevRegion) => {
      if (prevRegion) {
        const latitudeDelta = prevRegion.latitudeDelta - 0.005;
        const longitudeDelta = prevRegion.longitudeDelta - 0.005;
        const longitude = prevRegion.longitude;
        const latitude = prevRegion.latitude;
        if (latitudeDelta > 0 && longitudeDelta > 0)
          return {latitudeDelta, longitudeDelta, longitude, latitude};
        else return prevRegion;
      }
      return undefined;
    });
  }

  function zoomOut() {
    setRegion((prevRegion) => {
      if (prevRegion) {
        const latitudeDelta = prevRegion.latitudeDelta + 0.005;
        const longitudeDelta = prevRegion.longitudeDelta + 0.005;
        const longitude = prevRegion.longitude;
        const latitude = prevRegion.latitude;
        return {latitudeDelta, longitudeDelta, longitude, latitude};
      }
      return undefined;
    });
  }
  console.log(region);
  return (
    <View style={styles.container}>
      <View style={styles.select}>
        <TouchableOpacity onPress={goPreviousDay}>
          <Text>Previous Day</Text>
        </TouchableOpacity>
        <Text>{format(date, "d MMM Y")}</Text>
        {/* asa formatam sa arate data cum am zis ca am zis ca mai bine retin date*/}
        <TouchableOpacity onPress={goNextDay}>
          <Text>Next Day</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        region={region}
        onRegionChange={setRegion}
        customMapStyle={MapStyle}
        zoomEnabled
        mapType="mutedStandard"
      >
        {walks &&
          walks.map((walk, index) => {
            return (
              <>
                <Polyline key={index} coordinates={walk.walk}></Polyline>
                <Marker
                  key={`${index}i`}
                  coordinate={walk.walk[walk.walk.length - 1]}
                />
              </>
            );
          })}
        {/* <Marker coordinate={region} /> */}
      </MapView>
      <View style={styles.select}>
        <TouchableOpacity onPress={zoomIn}>
          <Text>ZoomIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={zoomOut}>
          <Text>ZoomOut</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
