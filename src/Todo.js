import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import TodoItem from "../components/TodoItem";
import AddTodo from "./AddTodo";
import FloatingBtn from "../components/FloatingBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Todo({ setSelectMode, selectMode }) {
  const emptyTodoObject = {
    content: "",
    isCompleted: "",
    date: "",
    key: "",
  };
  const [todos, setTodos] = useState([]);
  const [dones, setDones] = useState([]);
  const [selectedList, setSelectedList] = useState([]); //list of keys of notes
  const [editing, setEditing] = useState(false);
  const [addTodoShown, setAddTodoShown] = useState(false);
  const [todoInitialValue, setTodoInitialValue] = useState(emptyTodoObject);
  const [isListEmpty, setIsListEmpty] = useState(true);

  //   Grapping Stored Data in LocalStorage/SharedPrefs

  useEffect(async () => {
    //To drop the async function if the element still unmounted yet
    let abortController = new AbortController();

    try {
      var storedTodos = await JSON.parse(await AsyncStorage.getItem("todos"));
      var storedDones = await JSON.parse(await AsyncStorage.getItem("dones"));
      setTodos(storedTodos);
      setDones(storedDones);
    } catch (error) {
      console.log("Can't grap data from local storage", error);
    }

    return () => {
      abortController.abort();
    };

  }, []);

  //   Storing Data in LocalStorage/SharedPrefs

  useEffect(async () => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.log("Can't save the data correctly", error);
    }
    setIsListEmpty([...todos, ...dones].length == 0);
  }, [todos]);

  useEffect(async () => {
    try {
      await AsyncStorage.setItem("dones", JSON.stringify(dones));
    } catch (error) {
      console.log("Can't save the data correctly", error);
    }
    setIsListEmpty([...todos, ...dones].length == 0);
  }, [dones]);

  //When close selecting option

  useEffect(() => {
    if (!selectMode) {
      setSelectedList([]);
      setEditing(false);
    }
  }, [selectMode]);

  useEffect(() => {
    if (!editing) setTodoInitialValue(emptyTodoObject);
  }, [editing]);

  function handleSubmit(obj) {
    if (obj.key == "") {
      //Add new task
      setTodos((prevTodo) => {
        const d = new Date();
        let dateInText = d.toDateString();
        return [
          {
            content: obj.content,
            date: dateInText,
            isCompleted: false,
            key: Math.random().toString(),
          },
          ...prevTodo,
        ];
      });
    } else {
      //Edit existing one

      if (obj.isCompleted)
        dones.map((todo) => {
          if (todo.key == obj.key) todo.content = obj.content;
        });
      else
        todos.map((todo) => {
          if (todo.key == obj.key) todo.content = obj.content;
        });

      //reset initialValues

      setTodoInitialValue(emptyTodoObject);
      setSelectMode(false);
      setAddTodoShown(false);
    }
  }

  const deleteItems = (keys) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => !keys?.includes(todo.key));
    });
    setDones((prevDones) => {
      return prevDones.filter((done) => !keys?.includes(done.key));
    });

    //Reset Selected List
    setSelectedList([]);
    setSelectMode(false);
  };

  const grapDataToEdit = () => {
    //get item by key

    setEditing(!editing);
    setAddTodoShown(false);

    var itemToEdit = todos?.find((item) => selectedList[0] == item.key);

    if (itemToEdit == undefined)
      itemToEdit = dones?.find((item) => selectedList[0] == item.key);

    setTodoInitialValue(itemToEdit);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fcfcfd",
        flex: 1,
      }}
    >
      <AddTodo
        handleSubmit={handleSubmit}
        isOpened={addTodoShown || editing}
        selectMode={selectMode}
        prevTodo={todoInitialValue}
        setPrevTodo={setTodoInitialValue}
        editing={editing}
        setEditing={setEditing}
      />

      {!isListEmpty ? (
        <FlatList
          data={[...todos, ...dones]}
          style={{
            paddingTop: 16,
            paddingStart: 16,
            paddingEnd: 16,
            paddingBottom: 48,
            background:
              "linear-gradient(to right, rgba(255,255,255,0) 20%,rgba(255,255,255,1))",
          }}
          renderItem={({ item }) => (
            <TodoItem
              obj={item}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
              selectMode={selectMode}
              editing={editing}
              setEditing={setEditing}
              setDones={setDones}
              setTodos={setTodos}
              dones={dones}
            />
          )}
        />
      ) : (
        <Image
          resizeMode="center"
          style={{ flex: 1, opacity: 0.4 }}
          source={require("../assets/emptyTodoList.png")}
        />
      )}

      {/* Gradient Bottom View */}

      <View
        style={{
          background: "linear-gradient(to top,#ffffff,#ffffff1b)",
          height: 100,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></View>

      <FloatingBtn
        iconName={editing ? "close" : "create"}
        iconSize={24}
        action={grapDataToEdit}
        iconPositionLeft={"34%"}
        iconColor={"white"}
        customStyle={{
          padding: 16,
          borderRadius: "50%",
          backgroundColor: editing ? "grey" : "#fad052",
          transitionDuration: ".4s",
          bottom: selectMode && selectedList.length == 1 ? 20 : -120,
        }}
      />
      {/* addTodoShown ? "#d1d8e0" :  */}

      <FloatingBtn
        iconName={"add-circle-sharp"}
        iconSize={80}
        action={() => {
          setAddTodoShown(!addTodoShown);
          setEditing(false);
        }}
        iconPositionLeft={"47%"}
        iconColor={addTodoShown ? "grey" : "#5ca8e0"}
        customStyle={{
          transitionDuration: ".4s",
          transform: addTodoShown ? "rotate(45deg)" : "rotate(0deg)",
        }}
      />

      <FloatingBtn
        iconName={"trash"}
        iconSize={24}
        iconPositionLeft={"63%"}
        disabled={editing}
        iconColor={"white"}
        action={() => deleteItems(selectedList)}
        customStyle={{
          padding: 16,
          borderRadius: "50%",
          backgroundColor: editing ? "#d1d8e0" : "#f9525a",
          transitionDuration: ".4s",
          bottom: selectMode && selectedList.length >= 1 ? 20 : -120,
        }}
      />

      {/* addTodoShown ? "#d1d8e0" : */}
    </SafeAreaView>
  );
}
