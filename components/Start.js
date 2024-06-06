import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  // const colorPress = async (value) => {
  //   value ? setColor(value) : setColor("");
  //   console.log("colorPress log ->", color);
  // };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./backgroundImg.png")}
        resizeMode="cover"
        style={styles.bgImage}
      >
      <View style={styles.box}>
      <Text>Welcome to Chat!</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder="Type your username here"
      />
      <Text>Choose a background color.</Text>
      <View style={styles.tOContainer}>
        <TouchableOpacity
          style={[styles.tOpacityColors, styles.tO1]}
          value="grey"
          // onPress={colorPress("grey")}
          onPress={() => navigation.navigate("Chat", { color: color })}
        />
        <TouchableOpacity
          style={[styles.tOpacityColors, styles.tO2]}
          value="beige"
          // onPress={colorPress("beige")}
          onPress={() => navigation.navigate("Chat", { color: color })}
        />
        <TouchableOpacity
          style={[styles.tOpacityColors, styles.tO3]}
          value="blue"
          // onPress={colorPress("blue")}
          onPress={() => navigation.navigate("Chat", { color: color })}
        />
      </View>
      <Button
        title="Sign In"
        style={styles.button}
        onPress={() => navigation.navigate("Chat", { name: name })}
      />
      </View>
     </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  //Layer 1
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  //Layer 2
  bgImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  //Layer 3
  box: {
    flex: 1,
    width: '60%',
    // height: "60%",
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
    alignItems: 'center',
    backgroundColor: '#757083',
    borderRadius: 4,
    height: '20%',
    justifyContent: 'center',
    padding: 10,
    width: '88%',
  },
  //Layer 4
  tOContainer: {
    flex: 1,
    flexDirection: "row",
  },
  tOpacityColors: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: "blue",
    margin: 20,
    flexDirection: "row",
  },
  tO1: {
    backgroundColor: "#afb3bc",
  },
  tO2: {
    backgroundColor: "#b89b88",
  },
  tO3: {
    backgroundColor: "#6c8ca4",
  },
});

export default Start;

//gray #59636f beige #b89b88 blue #6c8ca4 light grey #afb3bc
