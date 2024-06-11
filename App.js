import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// Screen Navigation
import Start from "./components/Start";
import Chat from "./components/Chat";
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Initialize firestore DB
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // Firebase DB settings
  const firebaseConfig = {
    apiKey: "AIzaSyBVBnp9-boZcZikxKC_E--MVrUhmeXInsw",
    authDomain: "chatapp-8d2da.firebaseapp.com",
    projectId: "chatapp-8d2da",
    storageBucket: "chatapp-8d2da.appspot.com",
    messagingSenderId: "127953471873",
    appId: "1:127953471873:web:3efc353fe1694de9788080",
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
