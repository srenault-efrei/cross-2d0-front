import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  AsyncStorage,
} from "react-native";
import styles from "../../assets/styles/styles";

const SignUpIndividual = (props) => {
  const [email, setEmail] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [birthdate, setBirthdate] = useState(new Date());
  const [gender, setGender] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [error, setError] = useState();

  const { navigation } = props.navigation;

  const signUp = async () => {
    if (isSamePasswords(password, passwordConfirmation)) {
      const req = await fetch(
        "https://backd0.herokuapp.com/api/authenticate/signup",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            gender: "MALE",
            birthdate: birthdate,
            email: email.trim(),
            password: password.trim(),
            passwordConfirmation: passwordConfirmation.trim(),
          }),
        }
      );
      try {
        const json = await req.json();
        if (json.err) {
          console.log(json.err);
          //   setError({ error: json.err.description });
          setError("Sorry error authenticate");
        } else {
          // console.log(json.data);
          await _storeData(json.data);
          props.navigation.navigate("SignIn");
        }
      } catch (error) {
        setError("Sorry error inscription");
      }
    } else {
      setError("Attention,\nLes mots de passe saisis ne correspondent pas");
    }
  };

  const isSamePasswords = (password, passwordConfirmation) => {
    return password.trim() === passwordConfirmation.trim() ? true : false;
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
            autoCapitalize="none"
            style={styles.input}
            placeholder="Prénom"
            onChangeText={(firstname) => setFirstname(firstname)}
          />
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="Nom"
            onChangeText={(lastname) => setLastname(lastname)}
          />
          {/* 
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="gender"
            onChangeText={(gender) => setGender(gender)}
          /> */}

          <TextInput
            caretHidden
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
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Confirmation du mot de passe"
            onChangeText={(passwordConfirmation) =>
              setPasswordConfirmation(passwordConfirmation)
            }
          />
          <View style={styles.button}>
            <Text style={styles.textButton} onPress={() => signUp()}>
              S'inscrire
            </Text>
          </View>
        </View>
        <Text style={styles.error}>{error}</Text>
      </View>
      <View style={styles.bottomView}>
        <Text onPress={() => props.navigation.navigate("SignIn")}>
          Déjà inscrit ? Clique ici !
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUpIndividual;
