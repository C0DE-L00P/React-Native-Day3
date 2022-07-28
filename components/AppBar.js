import React from "react";
import { Appbar, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { TouchableNativeFeedback } from "react-native";

export default function AppBar({selectMode,setSelectMode}) {
  return (
    <Appbar
      style={{
        backgroundColor: "#fcfdfd",
        alignItems: "center",
        elevation: "0",
        display: "flex",
        justifyContent: "space-between",
        paddingEnd: 16,
        paddingStart: 16,
      }}
    >
      <Ionicons name="ios-grid-outline" size={24} color="#5ca8e0" style={{marginStart: 16}}/>

      <Text style={{ fontSize: 24, color: "#393e46" }}>All Tasks</Text>

      <Appbar.Action
        icon={selectMode?"close" :"select"}
        color="#5ca8e0"
        onPress={() => setSelectMode(!selectMode)}
      />
    </Appbar>
  );
}
