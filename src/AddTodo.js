import React from "react";
import { View,  Button, TextInput } from "react-native";

import { Formik} from "formik";
import * as Yup from "yup";

export default function AddTodo({ handleSubmit, isOpened, prevTodo, editing}) {

  //TODO: enhance the animation of showing the add inputs
  return (
    <View
      style={{
        marginStart: 24,
        marginEnd: 24,
        transform: isOpened ? "scaleY(1)" : "scaleY(0.8)",
        height: isOpened ? "" : 0,
        opacity: isOpened ? "1" : "0",
        transitionDuration: ".4s",
      }}
    >
      
      <Formik
        enableReinitialize
        initialValues={{ task: prevTodo.content }}
        validationSchema={Yup.object({
          task: Yup.string().required("Required"),
        })}
        onSubmit={async (values, actions) => {
          handleSubmit({ ...prevTodo, content: values.task });
          actions.resetForm({
            values: {
              task: "",
            },
          });
        }}
      >
        {(props) => (
          <View>
            <TextInput
              value={props.values.task}
              onChangeText={props.handleChange("task")}
              placeholder="Add Task ..."
              style={{
                backgroundColor: "#fff",
                elevation: 16,
                shadowColor: "black",
                textAlign: "center",
                minHeight: 40,
                borderColor:
                props.touched.task && props.errors.task ? "red" : "#ccd6df",
                borderWidth: 1,
                borderRadius: 8,
                outlineColor: "grey",
                marginBottom: 8,
              }}
            />
            <Button
              color={editing?'#fad052':"#5ca8e0"}
              onPress={props.handleSubmit}
              title={editing?'Edit':"Add"}
              style={{ marginTop: 16 ,transitionDuration: '.4s'}}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
