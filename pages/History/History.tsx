import {addDays, format, subDays} from "date-fns";
import React, {useEffect, useState} from "react";
import {TouchableOpacity, View, Text} from "react-native";
import MapView, {Marker, Polyline, Region} from "react-native-maps";
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
  const [eroare, setEroare] = useState(false);

  const colors = [
    "#800000",
    "#00FFFF",
    "#000080",
    "#800080",
    "#008080",
    "#F08080",
    "#808000",
    "#00FA9A",
    "#FF00FF",
    "#FF6347",
  ];

  useEffect(() => {
    if (walks) {
      setEroare(false);
      setRegion({
        latitude: walks[0].walk[0].latitude,
        longitude: walks[0].walk[0].longitude,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
      });
    } else {
      setEroare(true);
    }
  }, [walks]);

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

  return (
    <View style={styles.container}>
      <View style={styles.select}>
        <TouchableOpacity onPress={goPreviousDay} style={styles.button}>
          <Text>Previous Day</Text>
        </TouchableOpacity>
        <View style={styles.dateView}>
          <Text>{format(date, "d MMM Y")}</Text>
        </View>
        {/* asa formatam sa arate data cum am zis ca am zis ca mai bine retin date*/}
        <TouchableOpacity onPress={goNextDay} style={styles.button}>
          <Text>Next Day</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        region={region}
        customMapStyle={MapStyle}
        zoomEnabled
        mapType="mutedStandard"
      >
        {walks &&
          walks.map((walk, index) => {
            return (
              <>
                <Polyline
                  strokeWidth={2}
                  key={index}
                  coordinates={walk.walk}
                  strokeColor={colors[index % 10]}
                ></Polyline>
                <Marker
                  key={`${index}i`}
                  coordinate={walk.walk[walk.walk.length - 1]}
                />
              </>
            );
          })}
      </MapView>
      <View style={styles.select}>
        <TouchableOpacity style={styles.button} onPress={zoomIn}>
          <Text>ZoomIn</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={zoomOut} style={styles.button}>
          <Text>ZoomOut</Text>
        </TouchableOpacity>
      </View>

      {eroare && (
        <View style={styles.error}>
          <Text style={styles.text}>There are no walks for this day</Text>
        </View>
      )}
    </View>
  );
}
