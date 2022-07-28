import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FloatingBtn({
  disabled,
  iconName,
  iconSize,
  iconColor,
  iconPositionLeft,
  customStyle,
  action,
}) {
  return (
    <TouchableOpacity onPress={action} disabled={disabled}>
      <Ionicons
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={{
          position: "absolute",
          bottom: 10,
          left: iconPositionLeft,
          ...customStyle,
        }}
      />
    </TouchableOpacity>
  );
}
