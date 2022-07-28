import React, { useEffect, useState } from "react";
import { Card, Text } from "react-native-paper";
import { View, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function TodoItem({
  obj,
  selectedList,
  setSelectedList,
  selectMode,
  editing,
  setEditing,
  setTodos,
  setDones,
  dones,
}) {
  const [checked, setChecked] = useState(obj.isCompleted);

  useEffect(() => {
    if (checked) {
      setDones((dones) => dones.concat({ ...obj, isCompleted: true }));
      setTodos((todos) => todos.filter((item) => item.key != obj.key));
    } else {
      
      const isDoneAlready = dones.some((item) => item.key === obj.key);
      if (isDoneAlready) {
        setTodos((todos) => todos.concat({ ...obj, isCompleted: false}));
        setDones((dones) => dones.filter((item) => item.key != obj.key));
      }
    }
  }, [checked]);

  function removeSelected(comp) {
    return selectedList?.filter((item) => item != comp);
  }

  return (
    <Card
      onPress={
        selectMode && !editing
          ? () => {
              if (selectedList?.includes(obj.key)) {
                setSelectedList(removeSelected(obj.key));
              } else {
                setSelectedList([obj.key, ...selectedList]);
              }
            }
          : null
      }
      elevation={4}
      style={{
        cursor: selectMode && !editing ? "pointer" : "",
        borderRadius: 30,
        shadowRadius: 24,
        shadowOpacity: 0.1,
        paddingStart: 32,
        paddingEnd: 16,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: !selectedList?.includes(obj.key)
          ? "white"
          : editing
          ? "#fad052"
          : "#5ca8e0",
        marginBottom: 16,
        transitionDuration: ".3s",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: "1",
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 20,
              textDecoration: checked ? "line-through" : "",
              flex: 1,
              color: checked
                ? "#ccd6df"
                : selectedList?.includes(obj.key)
                ? "white"
                : "black",
            }}
          >
            {obj.content}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: selectedList?.includes(obj.key) ? "white" : "grey",
            }}
          >
            {obj.date}
          </Text>
        </View>

        <Pressable onPress={() => setChecked(!checked)}>
          {checked ? (
            <AntDesign
              name="checkcircle"
              size={24}
              color="#03dac4"
              style={{ elevation: 8, shadowColor: "grey" }}
            />
          ) : (
            <FontAwesome name="circle" size={30} color="#f0f0f0" />
          )}
        </Pressable>
      </View>
    </Card>
  );
}
