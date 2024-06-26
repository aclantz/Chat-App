import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
// Firebase Auth
import { getAuth, signInAnonymously } from "firebase/auth";

const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState("");
  const [SelectedColor, setSelectedColor] = useState("");

  // Firebase auth sign in
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          name: name,
          bgColor: SelectedColor,
          userID: result.user.uid,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try again later.");
      });
  }

  // Handle background color selection
  const colorPress = (value) => {
    setSelectedColor(value);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./backgroundImg.png")}
        resizeMode="cover"
        style={styles.bgImage}>
        <Text style={styles.heading}>Welcome to Chat!</Text>
        <View style={styles.box}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
          />
          <Text>Choose a background color.</Text>
          <View style={styles.colorButtonContainer}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Background color option"
              accessibilityHint="Let's you choose a background color for the chat screen."
              style={[
                styles.colorButton,
                {
                  backgroundColor: colors[0],
                  width: SelectedColor === colors[0] ? 30 : 20,
                  height: SelectedColor === colors[0] ? 30 : 20,
                },
              ]}
              onPress={() => colorPress(colors[0])}
            />
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Background color option"
              accessibilityHint="Let's you choose a background color for the chat screen."
              style={[
                styles.colorButton,
                {
                  backgroundColor: colors[1],
                  width: SelectedColor === colors[1] ? 30 : 20,
                  height: SelectedColor === colors[1] ? 30 : 20,
                },
              ]}
              onPress={() => colorPress(colors[1])}
            />
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Background color option"
              accessibilityHint="Let's you choose a background color for the chat screen."
              style={[
                styles.colorButton,
                {
                  backgroundColor: colors[2],
                  width: SelectedColor === colors[2] ? 30 : 20,
                  height: SelectedColor === colors[2] ? 30 : 20,
                },
              ]}
              onPress={() => colorPress(colors[2])}
            />
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Background color option"
              accessibilityHint="Let's you choose a background color for the chat screen."
              style={[
                styles.colorButton,
                {
                  backgroundColor: colors[3],
                  width: SelectedColor === colors[3] ? 30 : 20,
                  height: SelectedColor === colors[3] ? 30 : 20,
                },
              ]}
              onPress={() => colorPress(colors[3])}
            />
          </View>
          {/* Start Chat Button*/}
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Button"
            accessibilityHint="Allows you to go to the chat screen."
            title="Start Chatting"
            style={styles.button}
            onPress={signInUser}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
          {Platform.OS === "ios" ? (
            <KeyboardAvoidingView behavior="padding" />
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  // Layer 1
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // Layer 2
  bgImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  heading: {
    fontSize: 45,
    fontWeight: 600,
    color: "#ffffff",
  },
  // Layer 3
  box: {
    width: "88%",
    height: "44%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "10%",
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: "10%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#757083",
    borderRadius: "10%",
    height: "20%",
    justifyContent: "center",
    padding: 10,
    width: "88%",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  // Layer 4
  colorButtonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  colorButton: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: "blue", //placeholder color for tests
    margin: 20,
    flexDirection: "row",
  },
});

export default Start;

