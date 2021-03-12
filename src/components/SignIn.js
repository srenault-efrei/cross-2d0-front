import React, { Component, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  AsyncStorage,
} from "react-native";
import styles from "../../assets/styles/styles";

const SignIn = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const signin = async () => {
    const req = await fetch(
      "https://backd0.herokuapp.com/api/authenticate/signin",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      }
    );
    try {
      const json = await req.json();
      console.log(json);
      if (json.err) {
        setError("Sorry error authenticate");
      } else {
        // console.log(json.data);
        await _storeData(json.data);
        props.navigation.navigate("Home");
      }
    } catch (error) {
      setError("Sorry error authenticate");
    }
  };

  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem("data", JSON.stringify(data));
    } catch (error) {
      console.log("Local storage data Error : ", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.titleView}>
        <Text style={styles.title}>2D0</Text>
      </View>
      <View style={styles.loginView}>
        <View style={styles.inputView}>
          <TextInput
            name="email"
            autoCapitalize="none"
            style={styles.input}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Mot de passe"
            onChangeText={(password) => setPassword(password)}
          />

          <View style={styles.button}>
            <Text style={styles.textButton} onPress={() => signin()}>
              Connexion
            </Text>
          </View>
          <Text style={styles.error}>{error}</Text>
        </View>
      </View>
      <View style={styles.bottomView}>
        <Text onPress={() => props.navigation.navigate("SignUpIndividual")}>
          Pas encore inscrit ? Clique ici !
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
