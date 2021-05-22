import {addDays, format, subDays} from "date-fns";
import React, {useEffect, useState} from "react";
import {Touchable, TouchableOpacity, View, Text} from "react-native";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {selectWalksOfDay, Walk} from "../../store/data";

import {styles} from "./History.style";

export function HistoryPage() {
  const [date, setDate] = useState(new Date());
  const data = useSelector((state: ApplicationState) =>
    selectWalksOfDay(state.GPS.dataGPS, format(date, "ii/MM/Y"))
  );

  function goNextDay() {
    setDate(addDays(new Date(date), 1));
  }

  function goPreviousDay() {
    setDate(subDays(new Date(date), 1));
  }

  return (
    <View style={styles.container}>
      <View style={styles.select}>
        <TouchableOpacity onPress={goPreviousDay}>
          <Text>Previous Day</Text>
        </TouchableOpacity>
        <Text>{format(date, "d MMM Y")}</Text>
        <TouchableOpacity onPress={goNextDay}>
          <Text>Next Day</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
