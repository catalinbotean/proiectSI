import {addDays, format, subDays} from "date-fns";
import React, {useState} from "react";
import {TouchableOpacity, View, Text} from "react-native";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {selectWalksOfDay} from "../../store/data";

import {styles} from "./History.style";

export function HistoryPage() {
  const [date, setDate] = useState(new Date());
  const walks = useSelector((state: ApplicationState) =>
    selectWalksOfDay(state.GPS.dataGPS, format(date, "dd/MM/Y"))
  ); //array cu obiecte de tip plimbare care are startdate, endDate si coordonatele

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
        {/* asa formatam sa arate data cum am zis ca am zis ca mai bine retin date*/}
        <TouchableOpacity onPress={goNextDay}>
          <Text>Next Day</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
