import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  AsyncStorage,
} from "react-native";
import styles from "../../assets/styles/styles";

const home = (props) => {
  const [tasks, setTasks] = useState();
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  // const getDataStorage = async () => {
  //   let data = await AsyncStorage.getItem("data");
  //   data = JSON.parse(data);
  //   setUser(data);
  // };

  getTasks = async () => {
    // console.log("id", user.object.id);
    // console.log("token", user.meta.token);

    return fetch(
      `https://backd0.herokuapp.com/api/users/${user.object.id}/tasks`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,

          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("json", json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect(() => {
  //   getDataStorage();
  // }, []);

  useEffect(() => {
    // getTasks();
  });
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Taks</Text>
      </View>
      <View style={styles.taskView}>
        <View
          style={{
            backgroundColor: "powderblue",
            flexDirection: "row",
            width: 300,
            padding: 10,
            justifyContent: "space-between",
          }}
        >
          <Text>Hello </Text>
          <Text>complete </Text>
          <Text>Delete </Text>
        </View>
        <TextInput style={styles.inputTask} placeholder="New Task" />
        <View style={styles.button}>
          <Text style={styles.textButton}>Valider</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default home;
